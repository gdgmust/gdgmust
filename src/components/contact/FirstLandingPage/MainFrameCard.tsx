'use client';

import React, { ReactNode, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FirstLandingPage from './FirstLandingPage';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import {Link} from '@/i18n/routing';

import "@/styles/globals.css";

const IMG_PADDING = 12;

export const TextMainFrameCard = ({
  // subheading,
  // heading,
  children,
}: {
  // subheading: string;
  // heading: string;
  children: ReactNode;
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[100vh]">
        <Background />
        {/* <OverlayCopy heading={heading} subheading={subheading} /> */}
      </div>
      {children}
    </div>
  );
};


const Background = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const opacity = useTransform(scrollYProgress, [1, 0.5], [1, 0]);

  return (
    <motion.div
      style={{
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <FirstLandingPage />
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

// const OverlayCopy = ({
//   subheading,
//   heading,
// }: {
//   subheading: string;
//   heading: string;
// }) => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
//   const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

//   return (
//     <motion.div
//       style={{
//         y,
//         opacity,
//       }}
//       ref={targetRef}
//       className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white z-10"
//     >
//       <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
//         {subheading}
//       </p>
//       <p className="sm:w-[300px] md:w-[850px] lg:w-[1000px] text-center text-4xl font-bold leading-[50px] md:text-[50px] lg:text-[50px]">{heading}</p>
//     </motion.div>
//   );
// };

export const MainFrameCard = () => {
    const t = useTranslations(); 
    
    // useEffect(() => {
    //   window.scrollTo(0, 0);
    // }, []);
  
    return (
      <div className="bg-white select-none" draggable="false">    
        <TextMainFrameCard
        >
          <MainFrameCardSectionContent />
        </TextMainFrameCard>
      </div>
    );
  };

const MainFrameCardSectionContent = () => {
  // const locale = useLocale();
  const t = useTranslations();

  return (
    <div className="" draggable="false">

    </div>
  );
};

export default MainFrameCard;