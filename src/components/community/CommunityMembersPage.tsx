'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";
import { IoLogoGoogle } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { motion, AnimatePresence } from 'framer-motion';
import { useCommunity } from '@/components/community/context/CommunityContext';
import CommunityPagination from './CommunityPagination';

interface Member {
  id: string;
  name?: string;         // Legacy field
    nameEN?: string;       // English name
    nameMN?: string;       // Mongolian name
  surname?: string | boolean;    // Legacy field
    surnameEN?: string | boolean;     // English surname
    surnameMN?: string | boolean;     // Mongolian surname
  role: string;
  oldRole?: string;      // Previous role if applicable
  image?: string | boolean; // Image URL or false if no image
  bio?: string;
    bioEN?: string;        // English bio
    bioMN?: string;        // Mongolian bio
  year?: string;
  sinceYear?: string;
  wasOnClub?: boolean;
  exitYear?: string | boolean;
  activeStatus?: boolean;
  socialLinks?: {
    x?: string;
    linkedin?: string;
    github?: string;
    google?: string;
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

  if (member.image === false) {
    member.image = '/images/community/members/default.png';
  }

  const getMemberFullName = () => {
    if (locale === 'mn') {
      // For Mongolian locale
      if (member.surnameMN === false && member.nameMN) {
        return [member.nameMN];
      } else if (member.surnameMN && member.nameMN) {
        return [member.surnameMN, ' ', member.nameMN];
      }
    } else {
      // For English locale
      if (member.surnameEN === false && member.nameEN) {
        return [member.nameEN];
      } else if (member.nameEN && member.surnameEN) {
        return [member.nameEN, ' ', member.surnameEN];
      }
    }
    
    // Fallback to legacy fields
    if (member.surname === false && member.name) {
      return [member.name];
    }
    return [member.name || '', member.surname || ''];
  };
  
  // // Get the appropriate name based on locale
  // const getMemberName = () => {
  //   if (locale === 'mn' && member.nameMN) {
  //     return member.nameMN;
  //   } else if (member.nameEN) {
  //     return member.nameEN;
  //   }
    
  //   // Fallback to the generic name field if specific locale names aren't available
  //   return member.name || '';
  // };

  // const getMemberSurname = () => {
  //   if (locale === 'mn' && member.surnameMN) {
  //     return member.surnameMN;
  //   } else if (member.surnameEN) {
  //     return member.surnameEN;
  //   }

  //   return member.surname || '';
  // };
  
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
    memberStatus = `${t('CommunityPage.formermember.member')} ${joinYear}-${member.exitYear}`;
  } else if (joinYear === activeYearFilter) {
    // If they joined this year
    memberStatus = `${t('CommunityPage.formermember.new')} (${joinYear})`;
  } else if (joinYear && parseInt(joinYear) < parseInt(activeYearFilter || '0')) {
    // If they joined before this year and are still active
    memberStatus = `${t('CommunityPage.formermember.since')} (${joinYear})`;
  } else {
    // Default
    memberStatus = `${t('CommunityPage.formermember.joined')} ${joinYear}`;
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
  
  let roleClass = "border-blue-600"; // Default border color

  if (member.role === "leaderof-gdg") {
    roleClass = "border-red-600";
  } else if (["leaderof-development", "memberof-development"].includes(member.role)) {
    roleClass = "border-blue-400";
  } else if (["leaderof-creative", "memberof-creative"].includes(member.role)) {
    roleClass = "border-green-400";
  } else if (["leaderof-engagement", "memberof-engagement"].includes(member.role)) { 
    roleClass = "border-orange-400";
  } else if (["leaderof-outreach", "memberof-outreach"].includes(member.role)) {
    roleClass = "border-[#fc03c6]";
  }

  return (
    <motion.div 
      layout
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform w-[325px] h-[570px] ${roleClass} border-[1.2px]
      md:hover:w-[380px] md:hover:shadow-lg flex flex-col
      ${(isFormerMember || member.activeStatus === false) ? 'opacity-75' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      key={member.id}
    >
      <div className='cursor-pointer'>
        {member.image ? (
        <div className="relative h-[280px] w-full">
          <Image 
          src={member.image.toString()}  
          alt={getMemberFullName().join(' ')}
          fill
          draggable="false"
          style={{objectFit: 'cover'}}
          className="transition-all duration-500 select-none"
          />
        </div>
        ) : (
        <div className="bg-blue-100 h-64 flex items-center justify-center">
          <div className="bg-blue-200 rounded-full p-8">
          <span className="text-4xl font-bold text-blue-500">
            {getMemberFullName().join(' ').charAt(0)}
          </span>
          </div>
        </div>
        )}
      </div>
      <div className="px-6 pt-6 cursor-pointer flex-grow">
        <h3 className="text-xl -mt-1 font-bold text-gray-900">{getMemberFullName()}</h3>
        
        {/* Display the role with appropriate color */}
        <div className='mt-[6px]'>
          {member.role === "leaderof-gdg" ? (
            <p className="text-red-600">{t('CommunityPage.catogorylist-leader.1')}</p>
          ) : 
          member.role === "leaderof-development" ? (
            <p className="text-blue-400">{t('CommunityPage.catogorylist-leader.2')}</p>
          ) : 
          member.role === "leaderof-creative" ? (
            <p className="text-green-400">{t('CommunityPage.catogorylist-leader.3')}</p>
          ) : 
          member.role === "leaderof-engagement" ? (
            <p className="text-orange-400">{t('CommunityPage.catogorylist-leader.4')}</p>
          ) : 
          member.role === "leaderof-outreach" ? (
            <p className="text-[#fc03c6]">{t('CommunityPage.catogorylist-leader.5')}</p>
          ) : 
          member.role === "memberof-development" ? (
            <p className="text-blue-400">{t('CommunityPage.catogorylist-member.1')}</p>
          ) : 
          member.role === "memberof-creative" ? (
            <p className="text-green-400">{t('CommunityPage.catogorylist-member.2')}</p>
          ) : 
          member.role === "memberof-engagement" ? (
            <p className="text-orange-400">{t('CommunityPage.catogorylist-member.3')}</p>
          ) : 
          member.role === "memberof-outreach" ? (
            <p className="text-[#fc03c6]">{t('CommunityPage.catogorylist-member.4')}</p>
          ) : 
          member.role === "volunteer" ? (
            <p className="text-neutral-600">{t('CommunityPage.catogorylist-member.5')}</p>
          ) : (
            <p className="text-neutral-600">{member.role}</p>
          )}
        </div>


        {/* Display previous role if available */}
        {member.oldRole && (
          <p className="text-gray-500 text-sm">
          {t('CommunityPage.previously.1')} {member.oldRole} {t('CommunityPage.previously.2')} 
          </p>
        )}
        
        <p className='text-zinc-600 mb-3 text-[15px]'>
          {memberStatus}
        </p>
        <div className='mt-4'>
          {getMemberBio() && <p className="text-gray-600 w-[275px] mb-4 line-clamp-3">{getMemberBio()}</p>}
        </div>
      </div>
      
      {/* Social links at the bottom */}
      <div className="mt-auto px-6 pb-5">
        {member.socialLinks && Object.keys(member.socialLinks).length > 0 && (
          <div className="flex space-x-4 pt-3 border-t border-gray-100">
            {member.socialLinks.x && (
              <motion.a 
              href={member.socialLinks.x} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition-colors"
              whileHover={{ scale: 1.2}}
              draggable="false"
              >
              <FaXTwitter size={20} />
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
            {member.socialLinks.facebook && (
              <motion.a 
              href={member.socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-700 transition-colors"
              whileHover={{ scale: 1.2}}
              draggable="false"
              >
              <FaFacebook size={20} />
              </motion.a>
            )}
            {member.socialLinks.instagram && (
              <motion.a 
              href={member.socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-400 transition-colors"
              whileHover={{ scale: 1.2}}
              draggable="false"
              >
              <FaInstagram size={20} />
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
            {member.socialLinks.google && (
              <motion.a 
              href={member.socialLinks.google} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition-colors"
              whileHover={{ scale: 1.2}}
              draggable="false"
              >
              <IoLogoGoogle size={20} />
              </motion.a>
            )}
            {member.socialLinks.website && (
              <motion.a 
              href={member.socialLinks.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-700 transition-colors"
              whileHover={{ scale: 1.2}}
              draggable="false"
              >
              <TbWorld size={20} />
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