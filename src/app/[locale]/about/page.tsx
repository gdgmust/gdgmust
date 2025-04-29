import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

import TextParallax from '@/components/aboutpage/TextParallax';
import DoYouWannaJoinUs from '@/components/aboutpage/DoYouWannaJoinUs';

import ScrollTextBlurReveal from '@/components/utils/animations/ScrollTextBlurReveal';
import ScrollFloat from '@/components/utils/animations/ScrollFloat'

import MainFrameCard from '@/components/aboutpage/MainFrameCard';
import { Main } from 'next/document';

export async function generateMetadata(props: any) {
  return {
    title: "About",
    description: "Learn more about us",
    openGraph: {
      title: "About",
      description: "Learn more about us",
      // images: event.image ? [event.image] : [],
    },
  };
}

export default function AboutPage() {
  const t = useTranslations();
  return (
    <div>
      {/* <div>
        <StartSection />
      </div> */}

      <section>
        <MainFrameCard />
      </section>

      {/* <div className="select-none">
        <TextParallax />          
      </div> */}

      <section className="relative w-full flex items-center justify-center bg-white h-[150vh]">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=70%'
          stagger={0.03}
        >
          {t('HomePage.about.who')}
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
          {t('HomePage.about.are')}
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
          {t('HomePage.about.we')}
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
          {t('HomePage.about.?')}
        </ScrollFloat>
      </section>


      <div className="flex items-center justify-center pt-40 pb-10">
        <ScrollTextBlurReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={10}
        >
          {t('HomePage.about.answer1')}
        </ScrollTextBlurReveal>
      </div>
      <div className="select-none">
        <DoYouWannaJoinUs />
      </div>
    </div>
  );
}