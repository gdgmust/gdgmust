'use client';

import { Zen_Tokyo_Zoo } from 'next/font/google';
import { Yarndings_20 } from 'next/font/google';
import { Jersey_10 } from 'next/font/google';
import { Libre_Barcode_128 } from 'next/font/google';
import { Tinos } from 'next/font/google';
import { FaAngleDoubleDown } from "react-icons/fa";

import CircularText from './CircularText';

const zenTokyoZoo = Zen_Tokyo_Zoo({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-zen-tokyo-zoo',
});

const yarndings = Yarndings_20({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-yarndings-20',
});

const jersey10 = Jersey_10({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-jersey-10',
});

const libreBarcode128 = Libre_Barcode_128({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-libre-barcode-128',
});

const tinos = Tinos({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-tinos',
});



export default function FirstLandingPage() {
    return (
        <div className="w-full h-screen select-none bg-[#D9D9D9]" draggable="false">
            <div className="absolute top-[67px] ml-[52px] select-none">
                <p className="text-[14px] -mt-10">
                    *cool landing page btw
                </p>
            </div>
            <div className="absolute top-[300px] -ml-[2px] select-none">
                <p className={`text-[11px] mt-20 -rotate-90 ${tinos.className}`}>
                    * google geveloper group
                </p>
            </div>
            <div className="absolute bottom-[165px] ml-[52px] select-none">
                <p className={`text-[35px] -mt-10 ${yarndings.className}`}>
                    GDG
                </p>
            </div>
            <div className="absolute bottom-0 ml-[52px] select-none">
                <p className={`text-[128px] ${zenTokyoZoo.className}`}>
                    MUST
                </p>
            </div>
            
            <div className="absolute bottom-0 right-0 mb-1 mr-[90px] select-none">
                <p className={`text-[69px] ${libreBarcode128.className}`}>
                    roaziy
                </p>
            </div>

            <div className='absolute bottom-0 right-0 mb-[103px] mr-[92px] select-none'>
                <div className='w-[135px] h-[211px] bg-white border border-1 border-black'>
                    <span className='w-full flex flex-col items-end pr-[10px] pt-[6px] leading-8'>
                        <p className={`text-[24px] font-black tracking-[-2px] ${tinos.className}`}>
                            scroll
                        </p>
                        <p className={`text-[24px] font-black ${tinos.className}`}>
                            down
                        </p>
                    </span>
                    <span 
                        className='w-full mt-5 flex justify-center items-center cursor-pointer'
                        onClick={() => {
                            const scrollTo = () => {
                                const start = window.scrollY;
                                const end = window.innerHeight;
                                const duration = 1000;
                                let startTime: number | null = null;

                                const easeInOutCubic = (t: number) =>
                                    t < 0.5
                                        ? 4 * t * t * t
                                        : 1 - Math.pow(-2 * t + 2, 3) / 2;

                                const step = (timestamp: number) => {
                                    if (!startTime) startTime = timestamp;
                                    const elapsed = timestamp - startTime;
                                    const progress = Math.min(elapsed / duration, 1);
                                    const easedProgress = easeInOutCubic(progress);

                                    window.scrollTo(0, start + (end - start) * easedProgress);

                                    if (progress < 1) {
                                        requestAnimationFrame(step);
                                    }
                                };

                                requestAnimationFrame(step);
                            };

                            scrollTo();
                        }}
                    >
                        <FaAngleDoubleDown className='absolute size-[40px] bottom-[49px] transition-transform duration-700 ease-in-out' />
                        {/* <div className='rounded-full transition-all duration-700 ease-in-out border border-1 border-black border-dashed w-[97px] h-[97px] flex justify-center items-center hover:animate-[spin_10s_linear_infinite]' /> */}
                        <CircularText
                            text="SCROLL*DOWN*SCROLL"
                            onHover="speedUp"
                            spinDuration={25}
                            className="custom-class"
                        />
                    </span>
                </div>
            </div>

            <div className='absolute bottom-0 right-0 mb-[132px] select-none'>
                <p className={`text-[64px] rotate-90 -mt-16 -mr-20 ${jersey10.className}`}>
                    ISN’T IT COOL
                </p>
            </div>
        </div>
    );
}