'use client';

import MetallicPaint, { parseLogoImage } from "./MetallicPaint";
import { useState, useEffect, useMemo, useCallback } from 'react';

const logoPath = '/images/homepage/gdg.svg';

const Logo = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState<string>("Initializing");
  const [frame, setFrame] = useState(0);

  // Optimize animation by reducing frame updates (every other frame)
  useEffect(() => {
    let id: number;
    let skipFrame = false;
    
    const loop = (t: number) => {
      if (!skipFrame) {
        setFrame(t);
      }
      skipFrame = !skipFrame;
      id = requestAnimationFrame(loop);
    };
    
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  // Memoize animation parameters to prevent unnecessary rerenders
  const animatedParams = useMemo(() => ({
    patternScale: 4,
    refraction: 0.01,
    edge: 0,
    patternBlur: 0.005,
    liquid: 0.07,
    speed: 0.3,
  }), []);

  // Optimize image loading with caching
  const loadImage = useCallback(async () => {
    // Check if image is cached in sessionStorage
    let useCache = true;
    setLoadingStage("Checking cache");
    
    try {
      const cachedImageData = sessionStorage.getItem('gdgLogoImageData');
      
      if (cachedImageData) {
        try {
          setLoadingStage("Restoring from cache");
          // Parse the cached data and use it
          const parsedData = JSON.parse(cachedImageData);
          
          // Handle both compressed and uncompressed formats
          if (parsedData.isCompressed) {
            setLoadingStage("Decompressing image");
            // Reconstructing from compressed format
            const width = parsedData.originalWidth || parsedData.width;
            const height = parsedData.originalHeight || parsedData.height;
            const imgData = new ImageData(width, height);
            
            // First, set everything to white with full alpha
            for (let i = 0; i < width * height * 4; i += 4) {
              imgData.data[i] = 255;
              imgData.data[i + 1] = 255;
              imgData.data[i + 2] = 255;
              imgData.data[i + 3] = 255;
            }
            
            // Allow UI to update
            await new Promise(resolve => setTimeout(resolve, 0));
            
            const scaleFactor = parsedData.width / width;
            
            // Now fill in the actual image data
            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                const targetIdx = (y * width + x) * 4;
                const srcX = Math.floor(x * scaleFactor);
                const srcY = Math.floor(y * scaleFactor);
                const srcIdx = srcY * parsedData.width + srcX;
                const gray = parsedData.data[srcIdx];
                
                imgData.data[targetIdx] = gray;
                imgData.data[targetIdx + 1] = gray;
                imgData.data[targetIdx + 2] = gray;
                imgData.data[targetIdx + 3] = 255;
              }
              
              // Allow UI to update every few rows
              if (y % 50 === 0) {
                await new Promise(resolve => setTimeout(resolve, 0));
              }
            }
            
            setImageData(imgData);
          } else {
            // Original uncompressed format
            const uint8Array = new Uint8ClampedArray(parsedData.data);
            const reconstructedImageData = new ImageData(
              uint8Array, 
              parsedData.width, 
              parsedData.height
            );
            
            setImageData(reconstructedImageData);
          }
          
          setLoading(false);
          return;
        } catch (err) {
          console.warn("Failed to use cached image data, fetching fresh");
          // Continue to fetch if cache parsing fails
        }
      }
    } catch (err) {
      // If we can't read from sessionStorage, disable caching
      useCache = false;
      console.warn("SessionStorage read failed:", err);
    }
    
    try {
      setLoadingStage("Fetching image");
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
      
      const response = await fetch(logoPath, { 
        signal: controller.signal,
        cache: 'force-cache' // Use browser's HTTP cache
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const file = new File([blob], "default.svg", { type: blob.type });
      
      setLoadingStage("Processing image");
      const parsedData = await parseLogoImage(file);
      
      if (parsedData?.imageData) {
        setImageData(parsedData.imageData);
        setLoadingStage("Finalizing");
        
        // Cache the imageData in sessionStorage if enabled
        if (useCache) {
          try {
            // Create a more size-efficient representation by only storing grayscale data
            // since our image processing results in a grayscale image with alpha
            const imgData = parsedData.imageData;
            const width = imgData.width;
            const height = imgData.height;
            
            // Sample down the image for storage if it's large
            const scaleFactor = Math.max(width, height) > 500 ? 0.5 : 1;
            const sampledWidth = Math.floor(width * scaleFactor);
            const sampledHeight = Math.floor(height * scaleFactor);
            
            // Create a smaller array with just grayscale values
            const compressedData = new Uint8Array(sampledWidth * sampledHeight);
            
            for (let y = 0; y < sampledHeight; y++) {
              for (let x = 0; x < sampledWidth; x++) {
                const srcX = Math.floor(x / scaleFactor);
                const srcY = Math.floor(y / scaleFactor);
                const srcIdx = (srcY * width + srcX) * 4;
                // Just store the red channel (grayscale)
                compressedData[y * sampledWidth + x] = imgData.data[srcIdx];
              }
            }
            
            const serialized = {
              data: Array.from(compressedData),
              width: sampledWidth,
              height: sampledHeight,
              originalWidth: width,
              originalHeight: height,
              isCompressed: true
            };
            
            const jsonString = JSON.stringify(serialized);
            
            // Check the size before trying to store it
            const estimatedSize = jsonString.length * 2; // Rough estimate in bytes
            if (estimatedSize > 2 * 1024 * 1024) { // If over 2MB, don't try to cache
              console.warn(`Cache data too large (${Math.round(estimatedSize/1024/1024)}MB), skipping cache`);
              return;
            }
            
            sessionStorage.setItem('gdgLogoImageData', jsonString);
          } catch (e) {
            // Just log the error but don't break the app flow
            console.warn("Failed to cache image data:", e);
          }
        }
      }
      
      setError(null);
    } catch (err) {
      setError(`Failed to load image: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-red-500">
        <h2 className="text-xl font-bold mb-4">Image Loading Error</h2>
        <p>{error}</p>
        <p className="mt-4 text-gray-600 text-sm">
          Make sure the image file exists at: {logoPath}
        </p>
      </div>
    );
  }

  return (
    <div className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] flex items-center justify-center">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-pulse flex space-x-4 mb-4">
            <div className="rounded-full bg-gray-300 h-32 w-32"></div>
          </div>
          <div className="text-center">
            {/* <p className="text-sm text-gray-600">{loadingStage}</p> */}
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>
      ) : imageData ? (
        <MetallicPaint imageData={imageData} params={animatedParams} />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {/* <p>Loading failed. Please refresh.</p> */}
        </div>
      )}
    </div>
  );
};

// Add progress animation
const styles = `
@keyframes progress {
  0% { width: 0%; }
  50% { width: 75%; }
  100% { width: 100%; }
}
`;

export default Logo;
