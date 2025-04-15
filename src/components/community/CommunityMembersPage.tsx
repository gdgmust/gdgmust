'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { useCommunity } from '@/components/community/context/CommunityContext';

interface Member {
  id: string;
  name: string;
  role: string;
  year: string;
  image?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

function MemberCard({ member, index }: { member: Member, index: number }) {
  const t = useTranslations();
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      {member.image ? (
        <div className="relative h-64 w-full">
          <Image 
            src={member.image} 
            alt={member.name}
            fill
            style={{objectFit: 'cover'}}
            className="transition-all duration-500 hover:scale-105"
          />
        </div>
      ) : (
        <div className="bg-blue-100 h-64 flex items-center justify-center">
          <div className="bg-blue-200 rounded-full p-8">
            <span className="text-4xl font-bold text-blue-500">
              {member.name.charAt(0)}
            </span>
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
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
        <p className='text-zinc-600 mb-3 text-[15px]'>Member of {member.year} </p>
        {member.bio && <p className="text-gray-600 mb-4 line-clamp-3">{member.bio}</p>}
            
        
        {member.socialLinks && (
          <div className="flex space-x-4 pt-3 border-t border-gray-100">
            {member.socialLinks.twitter && (
              <motion.a 
                href={member.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
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
                whileHover={{ scale: 1.2, rotate: 5 }}
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
                whileHover={{ scale: 1.2, rotate: 5 }}
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

function MemberGrid({ members, title, description }: { 
  members: Member[], 
  title: string,
  description: string
}) {
  if (!members || members.length === 0) {
    return <p className="text-center text-gray-500 py-10">No team members match your filters.</p>;
  }

  return (
    <div className="my-10">
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl font-bold mb-4 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {members.map((member, index) => (
            <MemberCard key={member.id} member={member} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CommunityMembersPage() {
  const t = useTranslations('CommunityPage');
  const { filteredMembers, isLoading } = useCommunity();
  
  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="spinner"></div>
            </div>
          ) : (
            <MemberGrid 
              members={filteredMembers} 
              title={t('team.title')}
              description={t('team.description')}
            />
          )}
        </div>
      </div>
    </>
  );
}