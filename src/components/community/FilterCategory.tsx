'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from "next-intl";
import { useCommunity } from "@/components/community/context/CommunityContext";

export default function FilterCategory() {
    const t = useTranslations();
    const locale = useLocale();
    const { activeRoleFilter, setActiveRoleFilter } = useCommunity();

    // Predefined roles for translation keys
    const roles = [
        { key: 'all', translationKey: 'CommunityPage.filter.seeAll' },
        { key: 'Leader', translationKey: 'CommunityPage.filter.1' },
        { key: 'Creative', translationKey: 'CommunityPage.filter.2' },
        { key: 'Development', translationKey: 'CommunityPage.filter.3' },
        { key: 'MemberEngagement', translationKey: 'CommunityPage.filter.4' },
        { key: 'Outreach', translationKey: 'CommunityPage.filter.5' },
        { key: 'Volunteer', translationKey: 'CommunityPage.filter.6' }
      ];
  
      return(
          <div className='flex justify-center items-center mt-8 flex-wrap gap-2 md:gap-3 lg:gap-4 px-4' draggable="false">
              {roles.map((role) => (
                  <motion.button
                      key={role.key}
                      className={`flex justify-center items-center select-none rounded-full px-4 h-[42px] transition-all duration-300 ${
                          activeRoleFilter === role.key 
                              ? role.translationKey === 'CommunityPage.filter.seeAll' 
                                  ? 'bg-blue-600 text-white shadow-md'
                                  : role.translationKey === 'CommunityPage.filter.1'
                                      ? 'bg-red-500 text-white shadow-md'
                                      : role.translationKey === 'CommunityPage.filter.2'
                                          ? 'bg-green-400 text-white shadow-md'
                                          : role.translationKey === 'CommunityPage.filter.3'
                                              ? 'bg-blue-600 text-white shadow-md'
                                              : role.translationKey === 'CommunityPage.filter.4'
                                                  ? 'bg-orange-400 text-white shadow-md'
                                                  : role.translationKey === 'CommunityPage.filter.5'
                                                      ? 'bg-[#fc03c6] text-white shadow-md'
                                                      : role.translationKey === 'CommunityPage.filter.6' 
                                                          ? 'bg-zinc-400 text-white shadow-md'
                                                          : 'bg-zinc-400 text-white shadow-md'
                              : 'bg-[#EDEDED] text-gray-800 ' + (
                                  role.translationKey === 'CommunityPage.filter.seeAll' 
                                      ? 'hover:bg-blue-300'
                                      : role.translationKey === 'CommunityPage.filter.1'
                                          ? 'hover:bg-red-200'
                                          : role.translationKey === 'CommunityPage.filter.2'
                                              ? 'hover:bg-green-200'
                                              : role.translationKey === 'CommunityPage.filter.3'
                                                  ? 'hover:bg-blue-300'
                                                  : role.translationKey === 'CommunityPage.filter.4'
                                                      ? 'hover:bg-orange-200'
                                                      : role.translationKey === 'CommunityPage.filter.5'
                                                          ? 'hover:bg-pink-200'
                                                          : role.translationKey === 'CommunityPage.filter.6' 
                                                              ? 'hover:bg-zinc-200'
                                                              : ''
                              )
                      }`}
                    onClick={() => setActiveRoleFilter(role.key)}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className='text-[17px]'>{t(role.translationKey)}</span>
                </motion.button>
            ))}
        </div>
    );
}