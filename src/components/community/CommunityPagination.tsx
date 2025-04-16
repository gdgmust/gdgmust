'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useCommunity } from '@/components/community/context/CommunityContext';

export default function CommunityPagination() {
  const { currentPage, totalPages, setCurrentPage } = useCommunity();
  const t = useTranslations('Pagination');

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [1];
    if (currentPage > 3) pages.push('...');
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    
    if (currentPage < totalPages - 2) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    
    return pages;
  };

  return (
    <motion.nav 
      className="flex justify-center items-center gap-2 my-8" 
      aria-label="pagination"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {currentPage > 1 && (
        <motion.button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('prev')}
        </motion.button>
      )}
      
      {getPageNumbers().map((pageNum, index) => (
        pageNum === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
        ) : (
          <motion.button
            key={`page-${pageNum}`}
            onClick={() => setCurrentPage(pageNum as number)}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              currentPage === pageNum 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {pageNum}
          </motion.button>
        )
      ))}
      
      {currentPage < totalPages && (
        <motion.button 
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('next')}
        </motion.button>
      )}
    </motion.nav>
  );
}
