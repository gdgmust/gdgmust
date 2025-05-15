'use client';

import { Zen_Tokyo_Zoo } from 'next/font/google';
import { Yarndings_20 } from 'next/font/google';
import { Jersey_10 } from 'next/font/google';
import { Libre_Barcode_128 } from 'next/font/google';
import { Tinos } from 'next/font/google';
import { FaAngleDoubleDown } from "react-icons/fa";
import { memo, useCallback } from 'react';
import Image from 'next/image';

import CircularText from './CircularText';
import Logo from './Logo';
import Iridescence from './iridescence';

const zenTokyoZoo = Zen_Tokyo_Zoo({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-zen-tokyo-zoo',
    display: 'swap',
});

const yarndings = Yarndings_20({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-yarndings-20',
    display: 'swap',
});

const jersey10 = Jersey_10({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-jersey-10',
    display: 'swap',
});

const libreBarcode128 = Libre_Barcode_128({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-libre-barcode-128',
    display: 'swap',
});

const tinos = Tinos({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-tinos',
    display: 'swap',
});

const MemoizedCircularText = memo(CircularText);

export default function FirstLandingPage() {
    const scrollToNextSection = useCallback(() => {
        const nextSection = document.getElementById('next-section') || 
                            document.querySelector('section:nth-of-type(2)');
        
        if (nextSection) {
            nextSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            window.scrollTo({
                top: window.innerHeight / 1.3,
                behavior: 'smooth'
            });
        }
    }, []);

    return (
        <div className="w-full h-screen select-none bg-[#D9D9D9]" draggable="false">
            <Iridescence
                color={[1, 1, 1]}
                mouseReact={false}
                amplitude={0.1}
                speed={1.0}
            />
            <div className='absolute top-0 right-0 mr-[40px] mt-[40px] hidden md:block lg:block'>
                {/* <Image src="/images/qr.png" alt="qr" width={100} height={100} className='rounded-2xl w-[100px] h-[100px]' /> */}
            </div>
            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                <Logo />
            </div>
            <div className="absolute top-[67px] ml-[28px] md:ml-[52px] lg:ml-[52px]  select-none">
                <p className="text-[14px] -mt-3 md:-mt-10 lg:-mt-10">
                    *cool landing page btw
                </p>
            </div>
            <div className="absolute top-[300px] -ml-[20px] md:-ml-[2px] lg:-ml-[2px] select-none">
                <p className={`text-[11px] mt-20 -rotate-90 ${tinos.className}`}>
                    * google geveloper group
                </p>
            </div>
            <div className="absolute bottom-[135px] md:bottom-[165px] lg:bottom-[165px] ml-[28px] md:ml-[52px] lg:ml-[52px]  select-none">
                <p className={`text-[18px] md:text-[35px] lg:text-[35px] -mt-10 ${yarndings.className}`}>
                    GDG
                </p>
            </div>
            <div className="absolute bottom-[38px] md:bottom-0 lg:bottom-0 ml-[28px] md:ml-[52px] lg:ml-[52px] select-none">
                <p className={`text-[80px] md:text-[128px] lg:text-[128px] ${zenTokyoZoo.className}`}>
                    MUST
                </p>
            </div>
            
            <div className="absolute bottom-0 right-0 mb-1 mr-[90px] hidden md:block lg:block select-none">
                <p className={`text-[69px] ${libreBarcode128.className}`}>
                    roaziy
                </p>
            </div>

            <div className='absolute bottom-0 right-0 mb-[103px] mr-[92px] select-none hidden md:block lg:block'>
                <div className='w-[135px] h-[211px] bg-white border border-1 border-black'>
                    <span className='w-full flex flex-col items-end pr-[10px] pt-[6px] leading-8'>
                        <p className={`text-[24px] font-black tracking-[-2px] ${tinos.className}`}>
                            scroll
                        </p>
                        <p className={`text-[24px] font-black ${tinos.className}`}>
                            down
                        </p>
                    </span>
                    <div 
                        className='w-full mt-5 flex justify-center items-center cursor-pointer relative z-10'
                        onClick={() => {
                            const scrollTo = () => {
                                const start = window.scrollY;
                                const end = window.innerHeight / 1.3;
                                const duration = 1200;
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
                        <FaAngleDoubleDown className='absolute size-[40px] bottom-[30px] transition-transform duration-700 ease-in-out hover:scale-110' />
                        <div className="absolute inset-0 w-full h-full cursor-pointer" aria-hidden="true"></div>
                        <MemoizedCircularText
                            text="SCROLL*DOWN*SCROLL"
                            onHover="speedUp"
                            spinDuration={25}
                            className="custom-class pointer-events-none"
                        />
                    </div>
                </div>
            </div>

            <div className='absolute bottom-[170px] right-[95px]'>
                <div 
                    className='w-full mt-5 flex justify-center items-center cursor-pointer relative z-10 md:hidden lg:hidden'
                    onClick={() => {
                        const scrollTo = () => {
                            const start = window.scrollY;
                            const end = window.innerHeight / 1.1;
                            const duration = 1200;
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
                    <FaAngleDoubleDown className='absolute size-[40px] bottom-[30px] transition-transform duration-700 ease-in-out hover:scale-110' />
                    <div className="absolute inset-0 w-full h-full cursor-pointer" aria-hidden="true"></div>
                    <MemoizedCircularText
                        text="SCROLL*DOWN*SCROLL"
                        onHover="speedUp"
                        spinDuration={25}
                        className="custom-class pointer-events-none"
                    />
                </div>
            </div>

            <div className='absolute bottom-0 right-0 mb-[147px] md:mb-[132px] lg:mb-[132px] select-none'>
                <p className={`text-[60px] md:text-[64px] lg:text-[64px] rotate-90 -mt-16 -mr-20 ${jersey10.className}`}>
                    ISN’T IT COOL
                </p>
            </div>
        </div>
    );
}