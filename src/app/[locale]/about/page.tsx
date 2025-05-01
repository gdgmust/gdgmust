'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import TextParallax from '@/components/aboutpage/TextParallax';
import DoYouWannaJoinUs from '@/components/aboutpage/DoYouWannaJoinUs';

import ScrollTextBlurReveal from '@/components/utils/animations/ScrollTextBlurReveal';
import ScrollFloat from '@/components/utils/animations/ScrollFloat'

import MainFrameCard from '@/components/aboutpage/MainFrameCard';
import Cards from '@/components/aboutpage/Card';

import BlurText from "@/components/aboutpage/BlurText";

export default function AboutPage() {
  const t = useTranslations();
  const ref = useRef(null);

  return (
    <div className="">
      <section>
        <MainFrameCard />
      </section>

{/* <div className='relative'>
      <div className="sticky h-screen">
                <BlurText
                text="About Us"
                delay={450}
                animateBy="words"
                direction="top"
                className="text-8xl mb-8 text-black"
                />
            </div>
            </div> */}

      <div className="flex items-center justify-center h-screen py-10 "> 
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=60%'
          stagger={0.03}
        >
          Who are we?
        </ScrollFloat>
      </div>

        <div className="flex items-center justify-center h-screen py-40">
        <ScrollTextBlurReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={6}
        >
          {t('HomePage.about.answer1')}
        </ScrollTextBlurReveal>
      </div>

      <Cards />

      <motion.div>
        <DoYouWannaJoinUs />
      </motion.div>
    </div>
  );
}