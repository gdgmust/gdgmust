'use client';

import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";
import { useCommunity } from "@/components/community/context/CommunityContext";

export default function FilterCategory() {
    const t = useTranslations();
    const { activeRoleFilter, setActiveRoleFilter } = useCommunity();

    // Predefined roles for translation keys
    const roles = [
      { key: 'all', translationKey: 'CommunityPage.filter.seeAll' },
      { key: 'GDG Lead', translationKey: 'CommunityPage.filter.1' },
      { key: 'Core Team', translationKey: 'CommunityPage.filter.2' },
      { key: 'Developer', translationKey: 'CommunityPage.filter.3' },
      { key: 'Designer', translationKey: 'CommunityPage.filter.4' },
      { key: 'Member', translationKey: 'CommunityPage.filter.5' }
    ];

    return(
        <div className='flex justify-center items-center mt-4 flex-wrap gap-2 md:gap-3 lg:gap-4 px-4' draggable="false">
            {roles.map((role) => (
                <motion.button
                    key={role.key}
                    className={`flex justify-center items-center select-none rounded-full px-4 h-[42px] transition-all duration-300 ${
                        activeRoleFilter === role.key ? 
                        'bg-blue-600 text-white shadow-md' : 
                        'bg-[#EDEDED] text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveRoleFilter(role.key)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className='text-[17px]'>{t(role.translationKey)}</span>
                </motion.button>
            ))}
        </div>
    );
}