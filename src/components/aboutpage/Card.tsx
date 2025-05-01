'use client'
import Image from 'next/image';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

interface Project {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
}

// Move projects data here
const projects: Project[] = [
  {
    title: "DevFest",
    description: "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: "aboutpage/card/1.jpg",
    link: "",
    color: "#8fdcfb"
  },
  {
    title: "Build with AI",
    description: "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: "aboutpage/card/2.jpg",
    link: "",
    color: "#8ffb97"
  },
  {
    title: "Workshop",
    description: "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: "aboutpage/card/3.png",
    link: "",
    color: "#fbca8f"
  },
  {
    title: "Hackathon",
    description: "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: "aboutpage/card/4.jpg",
    link: "",
    color: "#acfb8f"
  },
  {
    title: "Voluntary",
    description: "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, 'all over again'—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote. Titled 'Beginnings', the mesmerizing collection of images is a visual and meditative journey into the origins of regrets and the uncertainty of stepping into new unknowns.",
    src: "aboutpage/card/5.png",
    link: "",
    color: "#fbf88f"
  }
];

// Individual card component
interface ProjectCardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
  progress: any; // Replace 'any' with the appropriate type if known
  range: [number, number];
  targetScale: number;
}

const ProjectCard = ({i, title, description, src, link, color, progress, range, targetScale}: ProjectCardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  // Transform values based on scroll position
  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Modified darkening logic - creates stepped darkening effect
  // Each card will only start darkening when it's about to be replaced by the next card
  const stepStart = i * 0.25; // Start of this card's range
  const stepEnd = (i + 1) * 0.25; // Start of next card's range
  
  // Card stays clear until next card begins to appear, then darkens
  const darkOverlayOpacity = useTransform(
    progress, 
    [stepStart, stepEnd - 0.05, stepEnd], // Transition near the end of this card's focus
    [0, 0, 0.4] // Remains clear, then rapidly darkens
  );
 
  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{
          scale, 
          top: `calc(-5vh + ${i * 25}px)`
        }} 
        className="flex flex-col relative h-[750px] w-[1400px] rounded-[45px] origin-top overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-[-2]">
          <Image
            fill
            src={`/images/${src}`}
            alt="background"
            className="object-cover"
          />
        </div>
        
        {/* Darkening overlay with card-specific timing */}
        <motion.div 
          className="absolute inset-0 z-[-1] bg-black"
          style={{ 
            opacity: darkOverlayOpacity,
            transition: 'opacity 0.1s ease-out'
          }}
        />
        <div className="absolute bottom-0 w-screen h-[180px] blur-[4px] bg-gradient-to-b from-transparent to-black/70 " />
        <div className='absolute bottom-[30px] pl-12'>
          <h2 className="text-left font-bold text-[69px] text-white">{title}</h2>
        </div>
        <div className="absolute bottom-0 right-0 p-[42px]">
          <div className="w-[250px] relative text-white">
            <p className="text-[16px]">
              {description}
            </p>
            {/* <span className="flex items-center gap-[5px]">
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-[12px] underline cursor-pointer">See more</a>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="black"/>
              </svg>
            </span> */}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Main component that manages all cards
const Cards = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    const lenis = new Lenis();
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    let frameId = requestAnimationFrame(raf);
    
    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    }
  }, []);

  return (
    <main ref={container} className="relative w-full">
      {
        projects.map((project, i) => {
          const targetScale = 1 - ((projects.length - i) * 0.05);
          return <ProjectCard 
            key={`p_${i}`} 
            i={i} 
            {...project} 
            progress={scrollYProgress} 
            range={[i * .25, 1]} 
            targetScale={targetScale}
          />
        })
      }
    </main>
  );
}

export default Cards;