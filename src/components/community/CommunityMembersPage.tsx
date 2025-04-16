'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { useCommunity } from '@/components/community/context/CommunityContext';
import CommunityPagination from './CommunityPagination';

interface Member {
  id: string;
  name?: string;         // Legacy field
  nameEN?: string;       // English name
  nameMN?: string;       // Mongolian name
  role: string;
  oldRole?: string;      // Previous role if applicable
  image?: string;
  bio?: string;
  bioEN?: string;        // English bio
  bioMN?: string;        // Mongolian bio
  year?: string;
  sinceYear?: string;
  wasOnClub?: boolean;
  exitYear?: string | boolean;
  activeStatus?: boolean;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
    website?: string;
    kaggle?: string;
    medium?: string;
    youtube?: string;
    playstore?: string;
  };
}

function MemberCard({ member, index }: { member: Member, index: number }) {
  const t = useTranslations();
  const locale = useLocale();
  const { activeYearFilter } = useCommunity();
  const currentYear = new Date().getFullYear().toString();
  
  // Get the appropriate name based on locale
  const getMemberName = () => {
    if (locale === 'mn' && member.nameMN) {
      return member.nameMN;
    } else if (member.nameEN) {
      return member.nameEN;
    }
    
    // Fallback to the generic name field if specific locale names aren't available
    return member.name || '';
  };
  
  // Get the appropriate bio based on locale
  const getMemberBio = () => {
    if (locale === 'mn' && member.bioMN) {
      return member.bioMN;
    } else if (member.bioEN) {
      return member.bioEN;
    }
    
    // Fallback to the generic bio field
    return member.bio || '';
  };
  
  // Determine the member's status based on year, exitYear, and activeStatus
  let memberStatus = '';
  const isFormerMember = member.exitYear !== undefined && member.exitYear !== false;
  // Use either sinceYear or year field
  const joinYear = member.sinceYear || member.year || '';
  
  if (isFormerMember) {
    // If they've left the club
    memberStatus = `Member ${joinYear}-${member.exitYear}`;
  } else if (joinYear === activeYearFilter) {
    // If they joined this year
    memberStatus = `New member (${joinYear})`;
  } else if (joinYear && parseInt(joinYear) < parseInt(activeYearFilter || '0')) {
    // If they joined before this year and are still active
    memberStatus = `Member since ${joinYear}`;
  } else {
    // Default
    memberStatus = `Joined ${joinYear}`;
  }
  
  // Special case for "all" filter
  if (activeYearFilter === 'all') {
    if (isFormerMember) {
      memberStatus = `Former member (${joinYear}-${member.exitYear})`;
    } else if (member.activeStatus === false) {
      memberStatus = `Inactive since ${currentYear}`;
    } else {
      memberStatus = `Active member since ${joinYear}`;
    }
  }
  
  return (
    <motion.div 
      layout
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform w-[325px] h-[550px]
        ${(isFormerMember || member.activeStatus === false) ? 'opacity-75' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      key={member.id}
    >
      {member.image ? (
        <div className="relative h-[280px] w-full">
          <Image 
            src={member.image} 
            alt={getMemberName()}
            fill
            draggable="false"
            style={{objectFit: 'cover'}}
            className="transition-all duration-500 rounded-xl hover:scale-105 select-none"
          />
        </div>
      ) : (
        <div className="bg-blue-100 h-64 flex items-center justify-center">
          <div className="bg-blue-200 rounded-full p-8">
            <span className="text-4xl font-bold text-blue-500">
              {getMemberName().charAt(0)}
            </span>
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{getMemberName()}</h3>
        {member.role === "leaderof-gdg" ? (
          <p className="text-red-600">{t('CommunityPage.catogorylist.1')}</p>
        ) : 
        member.role === "leaderof-development" ? (
          <p className="text-blue-400">{t('CommunityPage.catogorylist.2')}</p>
        ) : 
        member.role === "leaderof-creative" ? (
          <p className="text-green-400">{t('CommunityPage.catogorylist.3')}</p>
        ) : 
        member.role === "leaderof-engagement" ? (
          <p className="text-orange-400">{t('CommunityPage.catogorylist.4')}</p>
        ) : 
        member.role === "leaderof-outreach" ? (
          <p className="text-[#fc03c6]">{t('CommunityPage.catogorylist.5')}</p>
        ) : (
          <p className="text-blue-600">{member.role}</p>
        )}
        
        {/* Display previous role if available */}
        {member.oldRole && (
          <p className="text-gray-500 text-sm">
            Previously: {member.oldRole}
          </p>
        )}
        
        <p className='text-zinc-600 mb-3 text-[15px]'>
          {memberStatus}
        </p>
        {getMemberBio() && <p className="text-gray-600 mb-4 line-clamp-3">{getMemberBio()}</p>}
        
        {member.socialLinks && (
          <div className="flex space-x-4 pt-3 border-t border-gray-100">
            {member.socialLinks.twitter && (
              <motion.a 
                href={member.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2}}
                draggable="false"
              >
                <FaTwitter size={20} />
              </motion.a>
            )}
            {member.socialLinks.linkedin && (
              <motion.a 
                href={member.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700 transition-colors"
                whileHover={{ scale: 1.2}}
                draggable="false"
              >
                <FaLinkedin size={20} />
              </motion.a>
            )}
            {member.socialLinks.github && (
              <motion.a 
                href={member.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition-colors"
                whileHover={{ scale: 1.2}}
                draggable="false"
              >
                <FaGithub size={20} />
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function CommunityMembersPage() {
  const t = useTranslations('CommunityPage');
  const { 
    paginatedMembers, 
    isLoading, 
    filteredMembers, 
    searchQuery,
    activeYearFilter
  } = useCommunity();

  // Get the appropriate title based on search status
  const getTitle = () => {
    if (searchQuery) {
      return `${t('team.searchResults')} "${searchQuery}"`;
    } 
    return t('team.title');
  };

  // Get the appropriate description based on search status
  const getDescription = () => {
    if (searchQuery) {
      return `${filteredMembers.length} ${t('team.membersFound')} ${activeYearFilter !== 'all' ? t('team.searchingAllYears') : ''}`;
    }
    return t('team.description');
  };
  
  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="spinner"></div>
            </div>
          ) : filteredMembers.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <motion.h2 
                  className="text-3xl font-bold mb-4 text-gray-900"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {getTitle()}
                </motion.h2>
                <motion.p 
                  className="text-gray-600 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {getDescription()}
                </motion.p>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  className="flex flex-row justify-center items-center flex-wrap gap-4 md:gap-8 lg:gap-10 gap-y-12"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { staggerChildren: 0.05 }
                    },
                    exit: {
                      opacity: 0,
                      transition: { staggerChildren: 0.05 }
                    }
                  }}
                >
                  {paginatedMembers.map((member, index) => (
                    <MemberCard 
                      key={`${member.id}-${index}`}
                      member={member} 
                      index={index} 
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
              
              <CommunityPagination />
            </>
          ) : (
            <div className="text-center py-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-gray-500 text-xl"
              >
                {t('team.noResults')}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}