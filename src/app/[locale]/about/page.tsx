'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { motion, useScroll, useTransform } from 'framer-motion';

import TextParallax from '@/components/aboutpage/TextParallax';
import DoYouWannaJoinUs from '@/components/aboutpage/DoYouWannaJoinUs';

import ScrollTextBlurReveal from '@/components/utils/animations/ScrollTextBlurReveal';
import ScrollFloat from '@/components/utils/animations/ScrollFloat'

import MainFrameCard from '@/components/aboutpage/MainFrameCard';
import Cards from '@/components/aboutpage/Card';

import StatusSection from "@/components/aboutpage/StatusSection";

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div className="">
      <section>
        <MainFrameCard />
      </section>

      <div className="flex items-center justify-center h-screen py-10 "> 
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=60%'
          stagger={0.03}
        >
          {t('HomePage.about.title')}
        </ScrollFloat>
      </div>

      <div className="flex items-center justify-center h-screen mx-auto max-w-[1600px] px-8 py-40">
        <ScrollTextBlurReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={6}
        >
          {t('HomePage.about.answer1')}
        </ScrollTextBlurReveal>
      </div>

      <div className="flex items-center justify-center h-screen py-10 rotate-0">
        <TextParallax />
      </div>

      <div className="flex items-center justify-center h-screen pt-24 pb-24 "> 
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=60%'
          stagger={0.03}
        >
          {t('HomePage.about.wedo')}
        </ScrollFloat>
      </div>

      <div className='w-full px-4'>
        <Cards />
      </div>

      <div className="flex items-center justify-center h-screen mx-auto max-w-[1600px] px-8 py-40 mt-16 mb-10">
        <ScrollTextBlurReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={6}
        >
          {t('HomePage.about.wedoanswer')}
        </ScrollTextBlurReveal>
      </div>


      {/* <div className="flex items-center justify-center h-screen py-10 snap-start">
      We're a club which assembled by 4 teams: Creative, Development, Member Engagement, and Outreach.
      </div> */}
{/*       
      <div className='flex items-center justify-center py-10'>
        <StatusSection />
      </div> */}

      <motion.div className='mb-16'>
        <DoYouWannaJoinUs />
      </motion.div>
    </div>
  );
}