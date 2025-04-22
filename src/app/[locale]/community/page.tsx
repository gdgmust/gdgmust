'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import background from '../../../../public/images/community/background.png';
import logo from '../../../../public/images/community/logo.svg';

import SearchBar from '@/components/community/searchbar1';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import CommunityMembersPage from '@/components/community/CommunityMembersPage';
import FilterCategory from '@/components/community/FilterCategory';
import { CommunityProvider, useCommunity } from '@/components/community/context/CommunityContext';

import "@/styles/globals.css";

// Year selector component
const YearSelector = () => {
  const [yearMenuOpen, setYearMenuOpen] = useState(false);
  const t = useTranslations();
  const { activeYearFilter, setActiveYearFilter, availableYears } = useCommunity();
  
  // Close the year dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (yearMenuOpen && !(e.target as Element).closest('.year-selector')) {
        setYearMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [yearMenuOpen]);

  // Format the year display
  const getYearDisplay = (year: string) => {
    if (year === 'all') return t('CommunityPage.filter.seeAll');
    if (year === new Date().getFullYear().toString()) return `${year} (${t('CommunityPage.filter.thisYear')})`;
    return year;
  };
  
  return (
    <div className="relative year-selector">
      <motion.button 
        draggable="false"
        className="flex justify-center items-center select-none bg-white border border-black rounded-full px-5 h-[42px]"
        onClick={() => setYearMenuOpen(!yearMenuOpen)}
        whileTap={{ scale: 0.95 }}
      >
        <span className="mt-[2px] text-[17px] select-none" draggable="false">
          {getYearDisplay(activeYearFilter)}
        </span>
        {yearMenuOpen ? 
          <IoClose className="ml-[10px] mt-[2px] size-5" /> :
          <IoMenu className="ml-[10px] size-5" />
        }
      </motion.button>

      <AnimatePresence>
        {yearMenuOpen && (
          <motion.div 
            className="absolute z-10 mt-3 w-full bg-white outline-1 outline-none outline-offset-0 outline-black rounded-[20px] shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >            
            {availableYears.filter(year => year !== 'all').map(year => (
              <motion.button
                key={year}
                className={`block w-full text-left px-4 py-2 border-1 rounded-[20px] hover:text-blue-800 ${
                  year === activeYearFilter ? 'font-bold bg-gray-50 text-blue-600' : ''
                }`}
                onClick={() => {
                  setActiveYearFilter(year);
                  setYearMenuOpen(false);
                }}
              >
                {getYearDisplay(year)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main community page with provider
export default function CommunityPage() {
  const t = useTranslations();
  
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
        <div className="absolute w-full top-[116px] left-0 right-0 flex justify-center">
          <motion.div 
            className="select-none flex justify-center items-center"
            // initial={{ opacity: 0, scale: 0.8 }}
            // // animate={{ opacity: 1, scale: 1 }}
            // transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Image
              src={logo}
              alt="Logo"
              className="mx-auto max-w-[300px] md:max-w-full"
              draggable="false"
              priority
            />
          </motion.div>
        </div>

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