'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from "next-intl";
import { useCommunity } from "@/components/community/context/CommunityContext";

export default function FilterCategory() {
    const t = useTranslations();
    const { activeRoleFilter, setActiveRoleFilter } = useCommunity();

    // Predefined roles for translation keys
    const roles = [
        { key: 'all', translationKey: 'CommunityPage.filter.seeAll' },
        // { key: ['leaderof-gdg', 'leaderof-development', 'leaderof-creative', 'leaderof-engagement', 'leaderof-outreach', ], translationKey: 'CommunityPage.filter.1' },
        { key: ['leaderof-gdg'], translationKey: 'CommunityPage.filter.1' },
        { key: ['leaderof-development', 'memberof-development'], translationKey: 'CommunityPage.filter.2' },
        { key: ['leaderof-creative', 'memberof-creative'], translationKey: 'CommunityPage.filter.3' },
        { key: ['leaderof-engagement', 'memberof-engagement'], translationKey: 'CommunityPage.filter.4' },
        { key: ['leaderof-outreach', 'memberof-outreach'], translationKey: 'CommunityPage.filter.5' },
        { key: 'volunteer', translationKey: 'CommunityPage.filter.6' }
    ];
    
    // Helper function to check if a role or array of roles is active
    const isRoleActive = (roleKey: string | string[]) => {
        if (activeRoleFilter === 'all' && roleKey === 'all') return true;
        
        if (Array.isArray(roleKey) && Array.isArray(activeRoleFilter)) {
            // Compare arrays (both are arrays)
            return JSON.stringify(roleKey.sort()) === JSON.stringify(activeRoleFilter.sort());
        } else if (typeof roleKey === 'string' && typeof activeRoleFilter === 'string') {
            // Compare strings (both are strings)
            return roleKey === activeRoleFilter;
        }
        
        return false;
    };
  
    return(
        <div className='flex justify-center items-center mt-8 flex-wrap gap-2 md:gap-3 lg:gap-4 px-4' draggable="false">
            {roles.map((role) => (
                <motion.button
                    key={Array.isArray(role.key) ? role.key.join('-') : role.key}
                    className={`flex justify-center items-center select-none rounded-full px-4 h-[42px] transition-all duration-300 ${
                        isRoleActive(role.key) 
                            ? role.translationKey === 'CommunityPage.filter.seeAll' 
                                ? 'bg-blue-600 text-white shadow-md'
                                : role.translationKey === 'CommunityPage.filter.1'
                                    ? 'bg-red-500 text-white shadow-md'
                                    : role.translationKey === 'CommunityPage.filter.2'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : role.translationKey === 'CommunityPage.filter.3'
                                            ? 'bg-green-400 text-white shadow-md'
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
                                            ? 'hover:bg-blue-300'
                                            : role.translationKey === 'CommunityPage.filter.3'
                                                ? 'hover:bg-green-200'
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