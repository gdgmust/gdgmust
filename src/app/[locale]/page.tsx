'use client';

import FAQ from '@/components/homepage/faq';
import MainFrameCard from '@/components/homepage/FirstLandingPage/MainFrameCard';
import { Example } from '@/components/homepage/SupportSection';

import ScrollFloat from "@/components/utils/animations/ScrollFloat";
import ScrollReveal from "@/components/utils/animations/ScrollReveal";

import { useTranslations } from 'use-intl';

export default function HomePage() {
  const t = useTranslations();
  return (
    <div className="overflow-x-hidden">
      {/* Main Frame */}
      <section>
        <MainFrameCard />
      </section>

      {/* <section className="relative w-full flex items-center justify-center bg-white h-[150vh]">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=70%'
          stagger={0.03}
        >
          {t('HomePage.about.1')}
        </ScrollFloat>
      </section>

      <section className="relative w-full flex items-center justify-center bg-white h-[150vh]">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
        >
          {t('HomePage.about.2')}
        </ScrollFloat>
      </section>

      <section className="relative w-full flex items-center justify-center bg-white h-[150vh]">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
        >
          {t('HomePage.about.3')}
        </ScrollFloat>
      </section>

      <section className="relative w-full flex items-center justify-center bg-white h-[150vh]">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
        >
          {t('HomePage.about.4')}
        </ScrollFloat>
      </section>

      <section className="relative w-full flex items-center justify-center bg-white h-[150vh]">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
        >
          {t('HomePage.about.5')}
        </ScrollFloat>
      </section> */}

      {/* FAQ Section */}
      <section className="relative z-10 bg-white pt-16 pb-24">
        <div className="flex items-center justify-center text-[40px] font-bold select-none">
          <p>F</p><p>A</p><p>Q</p>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <FAQ />
        </div>
      </section>

      {/* Support Section
      <section className="flex items-center justify-center pt-[150px] pb-50 relative z-10 bg-white">
        <Example />
      </section> */}
    </div>
  );
}
