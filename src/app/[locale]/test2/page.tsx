'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import TextParallax from '@/components/aboutpage/TextParallax';
import DoYouWannaJoinUs from '@/components/aboutpage/DoYouWannaJoinUs';

import ScrollTextBlurReveal from '@/components/utils/animations/ScrollTextBlurReveal';
import ScrollFloat from '@/components/utils/animations/ScrollFloat'

import MainFrameCard from '@/components/aboutpage/MainFrameCard';
import Cards from '@/components/aboutpage/Card';

export default function AboutPage() {
  const t = useTranslations();
  const ref = useRef(null);
  const [bgColor, setBgColor] = useState('white');
  const { ref: soRef, inView: soInView } = useInView({ threshold: 0.5 });
  const { ref: cardsRef, inView: cardsInView } = useInView({ threshold: 0.5 });

  // Effect to update background color based on "So" and "Cards" content
  useEffect(() => {
    if (soInView) {
      setBgColor('#1a1a1a');
    } else if (!cardsInView) {
      setBgColor('white');
    }
  }, [soInView, cardsInView]);

  return (
    <div
      ref={ref}
      className="w-full min-h-screen"
      style={{
        backgroundColor: bgColor, // Dynamically change the whole page's background color
        transition: 'background-color 1.5s ease',
      }}
    >
      <section>
        <MainFrameCard />
      </section>

      <section className="relative w-full flex items-center justify-center h-[120vh]">
        <ScrollFloat
          animationDuration={1.2}
          ease='easeOut'
          scrollStart='center bottom+=60%'
          scrollEnd='bottom bottom-=70%'
          stagger={0.04}
        >
          {t('HomePage.about.who')}
        </ScrollFloat>
      </section>

      <section className="relative w-full flex items-center justify-center h-[120vh]">
        <ScrollFloat
          animationDuration={1.2}
          ease='easeOut'
          scrollStart='center bottom+=60%'
          scrollEnd='bottom bottom-=50%'
          stagger={0.04}
        >
          {t('HomePage.about.are')}
        </ScrollFloat>
      </section>

      <section className="relative w-full flex items-center justify-center h-[120vh]">
        <ScrollFloat
          animationDuration={1.2}
          ease='easeOut'
          scrollStart='center bottom+=60%'
          scrollEnd='bottom bottom-=50%'
          stagger={0.04}
        >
          {t('HomePage.about.we')}
        </ScrollFloat>
      </section>

      <section className="relative w-full flex items-center justify-center h-[120vh]">
        <ScrollFloat
          animationDuration={1.2}
          ease='easeOut'
          scrollStart='center bottom+=60%'
          scrollEnd='bottom bottom-=50%'
          stagger={0.04}
        >
          {t('HomePage.about.?')}
        </ScrollFloat>
      </section>



      <div className="flex items-center justify-center pt-40 pb-40">
        <ScrollTextBlurReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={6}
        >
          {t('HomePage.about.answer1')}
        </ScrollTextBlurReveal>
      </div>

      <motion.div
        className="mt-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          willChange: 'opacity',
          backgroundColor: bgColor, // Ensure background color is dynamic
          transition: 'background-color 1.5s ease',
        }}
      >
        <div
          ref={soRef}
          className="w-full flex items-center justify-center h-[120vh]"
        >
          <ScrollFloat
            textClassName="text-white"
            animationDuration={1.2}
            ease="easeOut"
            scrollStart="center bottom+=60%"
            scrollEnd="bottom bottom-=50%"
            stagger={0.04}
          >
            So
          </ScrollFloat>
        </div>

        <div className="select-none">
          <TextParallax />
        </div>

        <motion.div
          className="w-full flex items-center justify-center mt-[600px] h-[120vh]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ScrollFloat
            textClassName="text-white"
            animationDuration={1.2}
            ease="easeOut"
            scrollStart="center bottom+=60%"
            scrollEnd="bottom bottom-=50%"
            stagger={0.04}
          >
            We do...
          </ScrollFloat>
        </motion.div>
      </motion.div>

      <div ref={cardsRef} className="">
        <Cards />
      </div>

      <motion.div 
        className="select-none"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <DoYouWannaJoinUs />
      </motion.div>
    </div>
  );
}