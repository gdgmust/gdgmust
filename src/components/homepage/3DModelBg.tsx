import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ThreeElements } from '@react-three/fiber';
import { useGLTF, Bounds, Edges } from '@react-three/drei';
import { LayerMaterial, Depth, Fresnel } from 'lamina';
import * as THREE from 'three';
import { useMemo } from 'react';
import { useThree } from '@react-three/fiber';

type GDGProps = ThreeElements['mesh'];

export const ModelBackground = () => (
  <Canvas orthographic dpr={[1, 2]} camera={{ position: [0, 0, 10], zoom: 200 }}>
    {/* Add Lighting */}
    <ambientLight intensity={0.7} />
    <directionalLight position={[10, 10, 5]} intensity={0.5} />
    <directionalLight position={[-10, -10, -5]} intensity={0.3} />

    <Suspense fallback={<FallbackBox />}>
      <group rotation={[Math.PI / 5, -Math.PI / 5, Math.PI / 2]}>
        <Bounds fit clip observe margin={2}>
          <GDG scale={[20, 30, 21]} rotation={[0, 0, Math.PI / 2]}/>
        </Bounds>
        <gridHelper args={[10, 60, '#101010', '#050505']} position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
      </group>
    </Suspense>
  </Canvas>
);

function SimpleIridescentMaterial() {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        cameraPosition: { value: new THREE.Vector3() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying vec3 vViewDir;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          vViewDir = normalize(cameraPosition - vWorldPosition);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying vec3 vViewDir;

        // Iridescent aurora gradient
        vec3 auroraGradient(float f) {
          vec3 colorA = vec3(0.1, 1.0, 0.8); // Aqua
          vec3 colorB = vec3(0.2, 0.8, 1.0); // Sky blue
          vec3 colorC = vec3(0.4, 0.6, 1.0); // Indigo

          return mix(mix(colorA, colorB, smoothstep(0.0, 0.5, f)),
                     colorC, smoothstep(0.5, 1.0, f));
        }

        void main() {
          float fresnel = dot(vNormal, vViewDir);
          fresnel = pow(1.0 - fresnel, 2.5); // Stronger glow

          float depthMod = length(vWorldPosition) * 0.15;
          float blend = clamp(fresnel + depthMod, 0.0, 1.0);

          vec3 color = auroraGradient(blend);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
  }, []);

  const { camera } = useThree();
  useFrame((state) => {
    material.uniforms.time.value = state.clock.elapsedTime;
    material.uniforms.cameraPosition.value.copy(camera.position);
  });

  return <primitive object={material} attach="material" />;
}

// Fallback component to show while loading
function FallbackBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

function GDG(props: GDGProps) {
  const ref = useRef<THREE.Mesh>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const gradient = 0.7;
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  
  // Always call hooks at the top level - use cursor.glb since it's confirmed working
  const { nodes } = useGLTF('/gdg.glb') as any;
  
  // Use useEffect unconditionally with better error handling
  useEffect(() => {
    // Check if nodes exists
    if (!nodes) {
      console.error('GLTF model not loaded correctly: nodes is undefined');
      return;
    }
    
    // Try to find Cube mesh first
    if (nodes.Cube) {
      setGeometry(nodes.Cube.geometry);
      setModelLoaded(true);
      return;
    }
    
    // If Cube mesh isn't found, look for any available mesh
    const availableMeshes = Object.keys(nodes).filter(key => 
      nodes[key] && nodes[key].geometry instanceof THREE.BufferGeometry
    );
    
    if (availableMeshes.length > 0) {
      const firstMesh = availableMeshes[0];
      console.warn(`Cube mesh not found, using ${firstMesh} instead`);
      setGeometry(nodes[firstMesh].geometry);
      setModelLoaded(true);
    } else {
      console.error('GLTF model not loaded correctly: No usable meshes found');
    }
  }, [nodes]);

  // Instead of manipulating the LayerMaterial directly in useFrame,
  // we'll use component state and update the origin values through props
  const [origins, setOrigins] = useState({
    origin1: [0, 0, 0],
    origin2: [0, 1, 1],
    origin3: [0, 1, -1],
    origin4: [1, -1, -1]
  });
  
  // Animation frame
  useFrame((state) => {
    if (!modelLoaded || !ref.current) return;
    
    const sin = Math.sin(state.clock.elapsedTime / 2);
    const cos = Math.cos(state.clock.elapsedTime / 2);
    
    // Update origins through state instead of direct manipulation
    setOrigins({
      origin1: [cos / 2, 0, 0],
      origin2: [cos, sin, cos],
      origin3: [sin, cos, sin],
      origin4: [cos, sin, cos]
    });
  });

  // Return null if model isn't ready yet
  if (!modelLoaded || !geometry) {
    return null;
  }

  return (
    <mesh {...props} geometry={geometry} ref={ref} castShadow receiveShadow>
      <SimpleIridescentMaterial />
      <Edges color="white" />
    </mesh>
  );
}

// Preload model to improve performance - use cursor.glb
useGLTF.preload('/gdg.glb');
