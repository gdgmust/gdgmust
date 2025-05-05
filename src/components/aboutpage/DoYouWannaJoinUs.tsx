import Image from 'next/image';
import discord from '../../../public/images/community/discord.svg';

import { useTranslations } from 'next-intl';


export default function DoYouWannaJoinUs() {
  const t = useTranslations();
  
  return (
    <div>
      {/* Do you want to join our community? */}
      <div className=''>
        {/* texts */}
        <div className='flex justify-center items-center flex-col mt-10 text-center max-w-2xl mx-auto px-4 pb-10'>
          <p className='text-[22px] font-semi md:text-[34px] lg:text-[36px] mb-[10px]'>{t('CommunityPage.JoinUs.title')}</p>
          <p className='text-[16px] max-w-[600px] md:text-[18px] lg:text-[18px] leading-4 md:leading-5 lg:leading-5'>{t('CommunityPage.JoinUs.description')}</p>
        </div>

        {/* Buttons */}
        <nav 
        className='flex flex-col lg:flex-row justify-center items-center select-none -mt-2 md:mt-3 lg:mt-3'
        draggable="false"
        >
          <a
            className='bg-[#00AAFF] w-[220px] lg:w-[213px] h-[38px] lg:h-[42px] flex items-center justify-center rounded-full m-1 hover:scale-100 lg:hover:scale-105 transition-all duration-300 cursor-not-allowed disabled'
            href="https://docs.google.com/forms/d/e/1FAIpQLSdZgt6RQUF06YgprYDJY65eeljhJdJPVyGijF7P-vAKvoTu8A/closedform"
            draggable="false"
            target="_blank" 
            rel="noopener noreferrer"
            
          >
            <p className='text-white text-[16px] md:text-[17px] lg:text-[17px]'>{t('CommunityPage.JoinUs.buttonJoin')}</p>
          </a>

          <a
            className='bg-[#5865F2] w-[220px] lg:w-[239px] h-[38px] lg:h-[42px] rounded-full flex items-center justify-center m-1 mt-1 hover:scale-100 lg:hover:scale-105 transition-all duration-300 '
            href="https://discord.gg/YNyzd5D9"
            draggable="false"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <p className='text-white text-[16px] md:text-[17px] lg:text-[17px]'>{t('CommunityPage.JoinUs.buttonDiscord')}</p>
          </a>
        </nav>

        {/* Discord image */}
        <div className='justify-center flex mt-7 md:mt-10 lg:mt-10 mb-12'>
          <Image
            src={discord}
            alt="Discord"
            width={512}
            height={512}
            className="w-[280px] md:w-auto lg:w-auto"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
