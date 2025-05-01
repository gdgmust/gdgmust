'use client';

import BlurText from "@/components/aboutpage/BlurText";
import { Cabin_Sketch } from "next/font/google";

import Image from "next/image";

const cabinsketch = Cabin_Sketch ({
    subsets: ['latin'],
    weight: '700',
    variable: '--font-Cabin_Sketch',
});

export default function FirstLandingPage() {
    return (
        <div className="w-full h-screen select-none" draggable="false">
            <div className="bg-white w-full h-full" draggable="false">
                <Image
                    src="/images/aboutpage/first.jpg"
                    alt="image" 
                    className="object-cover"
                    draggable="false"
                    width={2500}
                    height={2000}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
            </div>            
            <div className="absolute bottom-[40px] left-[56px]">
                <BlurText
                text="About Us"
                delay={450}
                animateBy="words"
                direction="top"
                className={`text-8xl mb-8 text-white ${cabinsketch.className}`}
                />
            </div>

        </div>
    );
}