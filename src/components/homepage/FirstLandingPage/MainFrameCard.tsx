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
    <div className="mx-auto max-w-5xl gap-8 px-4 pb-24 pt-16 md:grid-cols-12 select-text" draggable="false">
      <div className="text-center md:text-left lg:text-left md:col-span-4 pb-16 leading-[34px]">
        <p className="flex justify-center text-[48px] font-bold">{t('HomePage.about.title')}</p>
        <p className="flex justify-center text-[18px] font-regular">{t('HomePage.about.title2')}</p>
      </div>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-justify text-neutral-600 md:text-2xl pb-5">
          {t('HomePage.about.description')}
        </p>
        {/* <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        <a className="" href={`/${router.locale}/events`}>
        </p> */}
        <span className="flex items-center justify-end">
          <Link href={`/about`} className="" draggable="false">
            <button className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-bold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none select-none">
              {t('HomePage.about.button-gotoabout')}
            </button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default MainFrameCard;