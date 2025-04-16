'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useCommunity } from '@/components/community/context/CommunityContext';
import { useTranslations } from 'next-intl';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const { setSearchQuery } = useCommunity();
  const searchRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('CommunityPage');
  const [isFocused, setIsFocused] = useState(false);
  
  // Debounce search input to avoid excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchInput, setSearchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <motion.div 
      className="relative w-[350px] md:w-[450px] lg:w-[500px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <input
          ref={searchRef}
          type="text"
          value={searchInput}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t('SearchBar.text')}
          className="w-full p-4 pl-12 pr-10 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        
        <AnimatePresence>
          {searchInput && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FaTimes className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      
      <AnimatePresence>
        {searchInput && (
          <motion.div 
            className="absolute mt-2 text-sm text-gray-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {t('SearchBar.searching')}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
