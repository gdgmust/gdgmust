import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Image from 'next/image';
import FAQ from '@/components/homepage/faq';

import MainFrameCard from '@/components/homepage/FirstLandingPage/MainFrameCard';
import { Example } from '@/components/homepage/SupportSection';

 
export default function HomePage() {
  const t = useTranslations();
  return (
    <div>

      {/* Opening */}
      <section className="">
        <MainFrameCard />
      </section>


      {/* FAQ */}
      <div className='my-10 mb-5'>
        <nav className='flex items-center justify-center text-[40px] font-bold select-none'>
          <p className=''>F</p>
          <p className=''>A</p>
          <p className=''>Q</p>
        </nav>
        
        <nav className='mt-3 flex items-center justify-center'>
          <FAQ />
        </nav>
      </div>


      {/* Support */}
      <div className='flex items-center justify-center pt-24 pb-24'>
        <Example />
      </div>

    </div>
  );
}