import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

import TextParallax from '@/components/aboutpage/TextParallax';
import StartSection from '@/components/aboutpage/StartSection'; 
import DoYouWannaJoinUs from '@/components/aboutpage/DoYouWannaJoinUs';

import ScrollReveal from '@/components/utils/animations/ScrollReveal';

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
      <div>
        {/* <h1>{t('title')}</h1>
        <Link href="/about">{t('about')}</Link> */}
        <StartSection />
      </div>
      <div className="select-none">
        <TextParallax />          
      </div>
      <div className="flex items-center justify-center pt-40 pb-10">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={10}
        >
          {t('HomePage.about.description')}
        </ScrollReveal>
      </div>
      <div className="select-none">
        <DoYouWannaJoinUs />
      </div>
    </div>
  );
}