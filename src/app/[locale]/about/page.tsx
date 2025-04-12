import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

import TextParallax from '@/components/aboutpage/TextParallax';
import StartSection from '@/components/aboutpage/StartSection'; 

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

export default function HomePage() {
  const t = useTranslations('HomePage');
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
    </div>
  );
}