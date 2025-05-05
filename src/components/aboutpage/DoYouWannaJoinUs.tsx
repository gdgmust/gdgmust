import MagnetLines from "@/components/utils/animations/MagnetLines";
import Image from 'next/image';

import { useTranslations } from 'next-intl';

export default function StatusSection() {
  const t = useTranslations();

  return (
    // <MagnetLines
    // rows={5}
    // columns={10}
    // containerSize="50vmin"
    // lineColor="black"
    // lineWidth="0.3vmin"
    // lineHeight="3.5vmin"
    // baseAngle={0}
    // style={{ margin: "1rem auto" }}
    <div className="relative flex items-center justify-center w-full px-4 mb-20 sm:px-6 md:px-8 py-8 md:py-16">
        <div className="relative w-full max-w-[1400px] min-h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-3xl shadow-black bg-gray-200/70 px-6 sm:px-10 md:px-32 py-6 sm:py-10">
            {/* Gradient Glow */}
            <div className="absolute -bottom-[700px] left-1/2 w-[80%] h-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sky-500 to-blue-400 opacity-40 blur-[120px] pointer-events-none"></div>

            <div className="relative flex flex-col md:flex-row items-center justify-between h-full gap-8 md:gap-4">
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold mt-10 md:-mt-4 lg:-mt-4 flex justify-center md:justify-start lg:justify-start">{t('CommunityPage.JoinUs.title')}</h2>
                    <p className="max-w-xs min-w-[280px] flex text-justify md:text-start lg:text-start justify-center md:justify-start lg:justify-start">{t('CommunityPage.JoinUs.description')}</p>
                      <div 
                      className='flex flex-col lg:flex-row justify-start gap-3 items-center md:items-start lg:items-start select-none mt-4 md:mt-3 lg:mt-2'
                      draggable="false"
                      >
                        <a
                            className='bg-[#0284c7] w-[220px] lg:w-[230px] h-[38px] lg:h-[40px] flex items-center justify-center rounded-lg transition-all duration-300 cursor-not-allowed disabled'
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdZgt6RQUF06YgprYDJY65eeljhJdJPVyGijF7P-vAKvoTu8A/closedform"
                            draggable="false"
                            target="_blank" 
                            rel="noopener noreferrer"
                            
                        >
                            <p className='text-white text-[16px] md:text-[16px] lg:text-[16px]'>{t('CommunityPage.JoinUs.buttonJoin')}</p>
                        </a>

                        <a
                            className='bg-[#5865F2] w-[220px] lg:w-[220px] h-[38px] lg:h-[40px] rounded-lg flex items-center justify-center transition-all duration-300 '
                            href="https://discord.gg/YNyzd5D9"
                            draggable="false"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <p className='text-white text-[16px] md:text-[16px] lg:text-[16px]'>{t('CommunityPage.JoinUs.buttonDiscord')}</p>
                        </a>
                      </div>
                </div>

                <div className='flex justify-center md:justify-end'>
                    <Image
                        src="/images/aboutpage/discord.svg"
                        alt="Discord"
                        width={512}
                        height={512}
                        className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[330px] lg:h-[330px] brightness-105"
                        draggable="false"
                    />
                </div>
            </div>
        </div>
    </div>
  );
}