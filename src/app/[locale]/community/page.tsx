'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import background from '../../../../public/images/community/background.png';
import logo from '../../../../public/images/community/logo.svg';

import SearchBar from '@/components/community/searchbar1';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import CommunityMembersPage from '@/components/community/CommunityMembersPage';
import FilterCategory from '@/components/community/FilterCategory';
import { CommunityProvider, useCommunity } from '@/components/community/context/CommunityContext';

import "@/styles/globals.css";

// export async function generateMetadata(props: any) {
//   return {
//     title: "Community",
//     description: "Join our community and connect with like-minded individuals",
//     openGraph: {
//       title: "Community",
//       description: "Join our community and connect with like-minded individuals",
//     },
//   };
// }

export default function CommunityPage() {
  const t = useTranslations();
  const [yearMenuOpen, setYearMenuOpen] = useState(false);

  // Year selector component - will be implemented inside the provider
  const YearSelector = () => {
    const { activeYearFilter, setActiveYearFilter, availableYears } = useCommunity();
    
    return (
      <div className="relative">
        <motion.button 
          className="flex justify-center items-center select-none bg-white border border-black rounded-full px-5 h-[42px]"
          onClick={() => setYearMenuOpen(!yearMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mt-[7px] text-[17px]">
            {activeYearFilter === 'all' ? t('CommunityPage.selectyear') : activeYearFilter}
          </span>
          {yearMenuOpen ? 
            <IoClose className="ml-[10px] mt-[10px] size-5" /> :
            <IoMenu className="ml-[10px] mt-[10px] size-5" />
          }
        </motion.button>

        {yearMenuOpen && (
          <motion.div 
            className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {availableYears.map(year => (
              <button
                key={year}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  year === activeYearFilter ? 'font-bold bg-gray-50' : ''
                }`}
                onClick={() => {
                  setActiveYearFilter(year);
                  setYearMenuOpen(false);
                }}
              >
                {year === 'all' ? t('CommunityPage.filter.seeAll') : year}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    );
  };
  
  return (
    <CommunityProvider>
      <div className="">
        {/* Background */}
        <div className="flex justify-center overflow-hidden select-none">
          <motion.div 
            style={{ position: 'relative', height: '692px', width: '1562px', maxWidth: '100vw' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={background}
              alt="Background"
              fill
              sizes="100vw"
              className="object-cover"
              draggable="false"
              priority
            />
          </motion.div>
        </div>

        {/* Logo */}
        <motion.div 
          className="absolute top-[116px] left-1/2 transform -translate-x-1/2 flex items-center justify-center select-none md:size-max lg:size-max size-[300px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Image
            src={logo}
            alt="Logo"
            className=""
            draggable="false"
          />
        </motion.div>

        {/* Search Bar */}
        <div className="absolute top-[116px] left-1/2 transform -translate-x-1/2 flex items-center justify-center lg:mt-[438px] md:mt-[438px] mt-[388px]">
          <SearchBar />
        </div>

        {/* The member's section */}
        {/* Title */}
        <motion.div 
          className="flex justify-center items-center flex-col mt-10 text-center max-w-2xl mx-auto px-4 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h1 className="text-[25px] font-bold md:text-[34px] lg:text-[36px] mb-[10px]">{t('CommunityPage.header.title')}</h1>
          <p className="text-[16px] max-w-[600px] md:text-[18px] lg:text-[18px] leading-4 md:leading-5 lg:leading-5">{t('CommunityPage.header.description')}</p>
        </motion.div>

        {/* Select a year FILTER */}
        <div className="flex justify-center items-center mt-1" draggable="false">
          <YearSelector />
        </div>

        {/* Role of Member FILTER */}
        <FilterCategory />

        {/* Members */}
        <div className="">
          <CommunityMembersPage />
        </div>
      </div>
    </CommunityProvider>
  );
}