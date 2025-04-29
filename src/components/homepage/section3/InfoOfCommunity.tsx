'use client';

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";
import communityData from '@/data/community.json';
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

// icons
import { LuMessageCircleHeart } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";




interface Member {
  id: string;
  image?: string;
  nameEN?: string;
  nameMN?: string;
  role: string;
  bioEN?: string;
  bioMN?: string;
  year?: string;
  sinceYear?: string;
  exitYear?: string | boolean;
  activeStatus: boolean;
  featured?: boolean;
  specialties?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    x?: string;
    google?: string;
  };
} 

// Format the role for display (e.g., "leaderof-gdg" -> "GDG Lead")
const formatRole = (role: string) => {
  if (!role.startsWith('leaderof-')) return role;
  
  const roleName = role.replace('leaderof-', '');
  
  const roleMap: Record<string, string> = {
    'gdg': 'GDG Community Lead',
    'development': 'Development Lead',
    'creative': 'Creative Lead',
    'engagement': 'Community Engagement Lead',
    'outreach': 'Outreach Lead'
  };
  
  return roleMap[roleName] || roleName.charAt(0).toUpperCase() + roleName.slice(1) + ' Lead';
};

export default function InfoOfCommunity() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLeaders, setCurrentLeaders] = useState<Member[]>([]);
  const t = useTranslations();
  
  // Get the current locale to display the right language
  const locale = useLocale();
  
  useEffect(() => {
    // Filter for active leaders (role starts with "leaderof-" and activeStatus is true)
    const leaders = communityData.filter(
      (member: Member) => member.role.startsWith('leaderof-') && 
                         member.activeStatus === true
    );
    setCurrentLeaders(leaders);
  }, []);
  
  const nextLeader = () => {
    if (currentLeaders.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentLeaders.length);
  };
  
  const prevLeader = () => {
    if (currentLeaders.length === 0) return;
    setCurrentIndex((prevIndex) => prevIndex === 0 ? currentLeaders.length - 1 : prevIndex - 1);
  };
  
  const getName = (member: Member) => {
    if (locale === 'mn' && member.nameMN) return member.nameMN;
    return member.nameEN || "";
  };
  
  const getBio = (member: Member) => {
    if (locale === 'mn' && member.bioMN) return member.bioMN;
    return member.bioEN || "";
  };

  if (currentLeaders.length === 0) {
    return null; // Don't render anything if there are no leaders
  }

  const fadeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {locale === 'mn' ? 'Бидний Удирдагчид' : 'Our Community Leaders'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {locale === 'mn' 
              ? 'Манай нийгэмлэгийг урагшлуулж буй хүмүүс' 
              : 'The passionate individuals who drive our community forward'}
          </p>
        </div>
        
        <div className="max-w-[1004px] mx-auto select-none" draggable="false">
          {/* Testimonial/Review card */}
          {/* <motion.div
            key={currentIndex}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="bg-white p-10 rounded-xl shadow-lg relative"
          > */}
          {/* <div className="p-[1px] rounded-[35px] bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800">
          <div className="bg-white p-10 rounded-[35px] relative"> */}
          <div className="bg-white px-10 pt-10 pb-8 rounded-[40px] shadow-[0px_1px_7px] shadow-gray-300/80 relative">
            <div className="absolute top-0 -left-4 transform -translate-y-1/2 bg-blue-500 p-[10px] rounded-full">
              <LuMessageCircleHeart className="text-white text-[25px]" />
            </div>
            
            <motion.div
              key={currentIndex}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-8 select-none"
              draggable="false"
            >
              <div className="w-52 h-52 relative flex-shrink-0 select-none" draggable="false">
                {currentLeaders[currentIndex]?.image ? (
                  <Image
                    src={currentLeaders[currentIndex].image}
                    alt={getName(currentLeaders[currentIndex])}
                    className={`rounded-full border-2 ${
                      currentLeaders[currentIndex].role === "leaderof-gdg"
                        ? "border-red-600"
                        : currentLeaders[currentIndex].role === "leaderof-development"
                        ? "border-blue-400"
                        : currentLeaders[currentIndex].role === "leaderof-creative"
                        ? "border-green-400"
                        : currentLeaders[currentIndex].role === "leaderof-engagement"
                        ? "border-orange-400"
                        : currentLeaders[currentIndex].role === "leaderof-outreach"
                        ? "border-[#fc03c6]"
                        : "border-gray-300"
                    }`}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    width={512}
                    height={512}
                  />
                ) : (
                  <div
                    className={`w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-2 ${
                      currentLeaders[currentIndex].role === "leaderof-gdg"
                        ? "border-red-600"
                        : currentLeaders[currentIndex].role === "leaderof-development"
                        ? "border-blue-400"
                        : currentLeaders[currentIndex].role === "leaderof-creative"
                        ? "border-green-400"
                        : currentLeaders[currentIndex].role === "leaderof-engagement"
                        ? "border-orange-400"
                        : currentLeaders[currentIndex].role === "leaderof-outreach"
                        ? "border-[#fc03c6]"
                        : "border-gray-300"
                    }`}
                  >
                    <span className="text-2xl text-gray-500">{getName(currentLeaders[currentIndex])?.charAt(0)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 select-text">
                <motion.p
                  key={`name-${currentIndex}`}
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="font-bold text-xl"
                >
                  {getName(currentLeaders[currentIndex])}
                </motion.p>
                {currentLeaders[currentIndex]?.role && (
                  <motion.div
                    key={`role-${currentIndex}`}
                    variants={fadeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                  >
                    {currentLeaders[currentIndex].role === "leaderof-gdg" ? (
                      <p className="text-red-600">{t('CommunityPage.catogorylist-leader.1')}</p>
                    ) : currentLeaders[currentIndex].role === "leaderof-development" ? (
                      <p className="text-blue-400">{t('CommunityPage.catogorylist-leader.2')}</p>
                    ) : currentLeaders[currentIndex].role === "leaderof-creative" ? (
                      <p className="text-green-400">{t('CommunityPage.catogorylist-leader.3')}</p>
                    ) : currentLeaders[currentIndex].role === "leaderof-engagement" ? (
                      <p className="text-orange-400">{t('CommunityPage.catogorylist-leader.4')}</p>
                    ) : currentLeaders[currentIndex].role === "leaderof-outreach" ? (
                      <p className="text-[#fc03c6]">{t('CommunityPage.catogorylist-leader.5')}</p>
                    ) : (
                      <p className="text-gray-600">{formatRole(currentLeaders[currentIndex].role)}</p>
                    )}
                  </motion.div>
                )}
                {currentLeaders[currentIndex].specialties && (
                  <motion.div
                    key={`specialties-${currentIndex}`}
                    variants={fadeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="mt-2 flex flex-wrap gap-2"
                  >
                    {currentLeaders[currentIndex].specialties.map((specialty, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {specialty}
                      </span>
                    ))}
                  </motion.div>
                )}
                <motion.blockquote
                  key={`bio-${currentIndex}`}
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="text-[20px] italic mt-6 mb-4 h-[80px]"
                >
                  "{getBio(currentLeaders[currentIndex])}"
                </motion.blockquote>
              </div>
            </motion.div>

            <div className="flex justify-center mt-12">
                {currentLeaders.map((_, idx) => (
                    <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 mx-1 rounded-full ${idx === currentIndex ? 'bg-neutral-500' : 'bg-gray-300'}`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    />
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
                <div>
                    <div className="flex justify-start gap-4">
                    <button 
                        onClick={prevLeader}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        aria-label="Previous leader"
                    >
                        <IoIosArrowBack className="text-black" size={24} />
                    </button>
                    <button 
                        onClick={nextLeader}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        aria-label="Next leader"
                    >
                        <IoIosArrowForward className="text-black" size={24} />
                    </button>
                    </div>
                </div>
                <div className="flex justify-end content-center">
                    <Link href={`/about`} className="" draggable="false">
                        <button className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-bold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none select-none">
                            {t('HomePage.about.button-gotocommuntiy')}
                        </button>
                    </Link>
                </div>
            </div>
          {/* </motion.div> */}
          </div>
          </div>
        </div>
      {/* </div> */}
    </section>
  );
}