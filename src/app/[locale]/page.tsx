'use client';

import FAQ from '@/components/homepage/faq';
import MainFrameCard from '@/components/homepage/FirstLandingPage/MainFrameCard';
import { Example } from '@/components/homepage/SupportSection';

import ScrollFloat from "@/components/utils/animations/ScrollFloat";
import ScrollTextBlurReveal from "@/components/utils/animations/ScrollTextBlurReveal";

import InfoOfCommunity from '@/components/homepage/section3/InfoOfCommunity';

import { useTranslations } from 'use-intl';

export default function HomePage() {
  const t = useTranslations();
  return (
    <div className="overflow-x-hidden">
      {/* Main Frame */}
      <section>
        <MainFrameCard />
      </section>

      {/* section3 */}
      <div className="pt-24 pb-20">
        <InfoOfCommunity />
      </div>

      {/* FAQ Section */}
      <section className="relative z-10 bg-white pt-32 pb-4">
        <div className="flex items-center justify-center text-[40px] font-bold select-none">
          <p>F</p><p>A</p><p>Q</p>
        </div>
        <div className="mt-8 flex h-[500px] items-start justify-center">
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
