'use client';

import BlurText from "@/components/aboutpage/BlurText";
import { Cabin_Sketch } from "next/font/google";

const cabinsketch = Cabin_Sketch ({
    subsets: ['latin'],
    weight: '700',
    variable: '--font-Cabin_Sketch',
});

export default function FirstLandingPage() {
    return (
        <div className="w-full h-screen select-none" draggable="false">
            <div className="bg-gray-400 w-full h-full" draggable="false">

            </div>            
            <div className="absolute bottom-[40px] left-[56px]">
                <BlurText
                text="About Us"
                delay={450}
                animateBy="words"
                direction="top"
                className={`text-8xl mb-8 text-black ${cabinsketch.className}`}
                />
            </div>

        </div>
    );
}