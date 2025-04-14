import { useTranslations } from "next-intl";

export default function FilterCategory() {
    const t = useTranslations();

    return(
        <nav className='flex justify-center items-center mt-4 flex-col md:flex-row lg:flex-row' draggable="false">
        <nav className='p-1 -pr-1 md:pr-2 lg:pr-2'>
        <button className='flex justify-center item-center select-none bg-[#EDEDED] rounded-full px-4 h-[42px]'>
          <a className='mt-[8px] text-[17px]'>{t('CommunityPage.filter.seeAll')}</a> 
        </button>
        </nav>

        <nav className='p-1'>
        <button className='flex justify-center item-center select-none bg-[#EDEDED] rounded-full px-4 h-[42px]'>
          <a className='mt-[8px] text-[17px]'>{t('CommunityPage.filter.1')}</a> 
        </button>
        </nav>

        <nav className='p-1'>
        <button className='flex justify-center item-center select-none bg-[#EDEDED] rounded-full px-4 h-[42px]'>
          <a className='mt-[8px] text-[17px]'>{t('CommunityPage.filter.2')}</a> 
        </button>
        </nav>
        
        <nav className='p-1'>
        <button className='flex justify-center item-center select-none bg-[#EDEDED] rounded-full px-4 h-[42px]'>
          <a className='mt-[8px] text-[17px]'>{t('CommunityPage.filter.3')}</a> 
        </button>
        </nav>
        
        <nav className='p-1'>
        <button className='flex justify-center item-center select-none bg-[#EDEDED] rounded-full px-4 h-[42px]'>
          <a className='mt-[8px] text-[17px]'>{t('CommunityPage.filter.4')}</a> 
        </button>
        </nav>

        <nav className='p-1'>
        <button className='flex justify-center item-center select-none bg-[#EDEDED] rounded-full px-4 h-[42px]'>
          <a className='mt-[8px] text-[17px]'>{t('CommunityPage.filter.5')}</a> 
        </button>
        </nav>
      </nav>
    );
} 