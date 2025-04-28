'use client';

import BlurText from "@/components/contact/BlurText";


export default function FirstLandingPage() {
    return (
        <div className="w-full h-screen select-none" draggable="false">
            <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                {/* <Dither
                    waveColor={[0.5, 0.5, 0.5]}
                    disableAnimation={false}
                    enableMouseInteraction={true}
                    mouseRadius={0.3}
                    colorNum={4}
                    waveAmplitude={0.3}
                    waveFrequency={3}
                    waveSpeed={0.05}
                /> */}
            </div>            
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-screen flex items-center justify-center">
                <BlurText
                text="Contact Us"
                delay={450}
                animateBy="words"
                direction="top"
                className="text-8xl mb-8 text-black"
                />
            </div>

        </div>
    );
}