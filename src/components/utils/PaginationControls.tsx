'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paramName?: string;
  preserveParams?: string[];
  onPageChange?: (page: number) => void;
  useUrlNavigation?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  paramName = 'page',
  preserveParams = [],
  onPageChange,
  useUrlNavigation = true
}: PaginationProps) {
  const searchParams = useSearchParams();
  const t = useTranslations('Pagination');
  
  const createPageUrl = (pageNumber: number) => {
    if (!useUrlNavigation) return '#';
    
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, pageNumber.toString());
    
    preserveParams.forEach(param => {
      const value = searchParams.get(param);
      if (value) {
        params.set(param, value);
      }
    });
    
    return `?${params.toString()}`;
  };

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
  
  if (totalPages <= 1) return null;

  const handlePageClick = (pageNum: number) => {
    if (onPageChange) {
      onPageChange(pageNum);
    }
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
        useUrlNavigation ? (
          <Link 
            href={createPageUrl(currentPage - 1)}
            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {t('prev')}
          </Link>
        ) : (
          <motion.button
            onClick={() => handlePageClick(currentPage - 1)}
            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('prev')}
          </motion.button>
        )
      )}
      
      {getPageNumbers().map((pageNum, index) => (
        pageNum === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
        ) : (
          useUrlNavigation ? (
            <Link
              key={`page-${pageNum}`}
              href={createPageUrl(pageNum as number)}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                currentPage === pageNum 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {pageNum}
            </Link>
          ) : (
            <motion.button
              key={`page-${pageNum}`}
              onClick={() => handlePageClick(pageNum as number)}
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
        )
      ))}
      
      {currentPage < totalPages && (
        useUrlNavigation ? (
          <Link 
            href={createPageUrl(currentPage + 1)}
            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {t('next')}
          </Link>
        ) : (
          <motion.button 
            onClick={() => handlePageClick(currentPage + 1)}
            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('next')}
          </motion.button>
        )
      )}
    </motion.nav>
  );
}
