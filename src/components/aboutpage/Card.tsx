'use client'
import Image from 'next/image';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

import { useTranslations } from 'next-intl';

interface Project {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
}

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
    <div ref={container} className="mt-[500px] h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{
          scale, 
          top: `calc(-5vh + ${i * 25}px)`
        }} 
        className="flex flex-col relative w-[1400px] h-[500px] md:h-[750px] lg:h-[750px] rounded-[45px] origin-top overflow-hidden"
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
        <div className="absolute bottom-0 w-screen h-[180px] bg-gradient-to-b from-transparent to-black/80 " />

        {/* title */}
          <div className='absolute bottom-[30px] pl-12'>
            <h2 className="text-left font-bold text-[45px] md:text-[69px] lg:text-[69px] text-white">{title}</h2>
          </div>

        {/* Description */}
          <div className="absolute bottom-0 right-0 p-[42px]">
            <div className="md:w-[300px] lg:w-[369px] relative text-white">
              <p className="text-[16px] lg:block md:block hidden ">
                {description}
              </p>
            </div>
          </div>
      </motion.div>
    </div>
  )
}

// Main component that manages all cards and translations
const Cards = () => {
  const t = useTranslations();
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const projects: Project[] = [
    {
      title: "DevFest",
      description: t('AboutPage.Card.devfest'),
      src: "aboutpage/card/1.jpg",
      link: "",
      color: "#8fdcfb"
    },
    {
      title: "Build with AI",
      description: t('AboutPage.Card.buildwithai'),
      src: "aboutpage/card/2.jpg",
      link: "",
      color: "#8ffb97"
    },
    {
      title: "Workshop",
      description: t('AboutPage.Card.workshop'),
      src: "aboutpage/card/3.png",
      link: "",
      color: "#fbca8f"
    },
    {
      title: "Hackathon",
      description: t('AboutPage.Card.hackathon'),
      src: "aboutpage/card/4.jpg",
      link: "",
      color: "#acfb8f"
    },
    {
      title: "Voluntary",
      description: t('AboutPage.Card.voluntary'),
      src: "aboutpage/card/5.png",
      link: "",
      color: "#fbf88f"
    }
  ];

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