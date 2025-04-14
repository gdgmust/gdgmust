import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

import Image from 'next/image';
import background from '../../../../public/images/community/background.png';
import logo from '../../../../public/images/community/logo.svg';

import SearchBar from '@/components/utils/searchbar1';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import CommunityMembersPage from '@/components/community/CommunityMembersPage';
import FilterCategory from '@/components/community/FilterCategory';

import "@/styles/globals.css";

export async function generateMetadata(props: any) {
  return {
    title: "Community",
    description: "Join our community and connect with like-minded individuals",
    openGraph: {
      title: "Community",
      description: "Join our community and connect with like-minded individuals",
      // images: event.image ? [event.image] : [],
    },
  };
}
 
export default function CommunityPage() {
  const t = useTranslations();
  
  return (
    <div className="">
      {/* Background */}
      <div className="flex justify-center overflow-hidden select-none">
        <div style={{ position: 'relative', height: '692px', width: '1562px', maxWidth: '100vw' }}>
          <Image
            src={background}
            alt="Background"
            fill
            sizes="100vw"
            className="object-cover"
            draggable="false"
            priority
          />
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-[116px] left-1/2 transform -translate-x-1/2 flex items-center justify-center select-none md:size-max lg:size-max size-[300px]">
        <Image
          src={logo}
          alt="Logo"
          className=''
          draggable="false"
        />
      </div>

      {/* <SearchBar /> */}
        <div className="absolute top-[116px] left-1/2 transform -translate-x-1/2 flex items-center justify-center lg:mt-[438px] md:mt-[438px] mt-[388px]">
          <SearchBar />
        </div>


      {/* The member's section */}
      {/* title */}
      <div className='flex justify-center items-center flex-col mt-10 text-center max-w-2xl mx-auto px-4 pb-8'>
        <p className='text-[25px] font-bold md:text-[34px] lg:text-[36px] mb-[10px]'>{t('CommunityPage.header.title')}</p>
        <p className='text-[16px] max-w-[600px] md:text-[18px] lg:text-[18px] leading-4 md:leading-5 lg:leading-5'>{t('CommunityPage.header.description')}</p>
      </div>


      {/* Select a year FILTER */}
      <nav className='flex justify-center items-center mt-1' draggable="false">
        <button className='flex justify-center item-center select-none bg-white border border-black rounded-full px-5 h-[42px]'>
          <a className='mt-[7px] text-[17px]'>{t('CommunityPage.selectyear')}</a> 
          <IoMenu className='ml-[10px] mt-[10px] size-5' />
        </button>
      </nav>


      {/* Role of Member FILTER */}
      <FilterCategory />

      {/* Members */}
      <div className=''>
        <CommunityMembersPage />
      </div>

    </div>
  );
}