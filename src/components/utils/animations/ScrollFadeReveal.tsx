'use client';
 
 import { useRef, ReactNode } from 'react';
 import { motion, useInView } from 'framer-motion';
 import { Animations } from '../../../app/[locale]/events/[slug]/utils';
 
 interface ScrollFadeRevealProps {
   children: ReactNode;
   variant?: keyof typeof Animations;
   threshold?: number;
   delay?: number;
   className?: string;
 }
 
 export default function ScrollFadeReveal({ 
   children, 
   variant = 'fadeReveal', 
   threshold = 0.3,
   delay = 0,
   className = ''
 }: ScrollFadeRevealProps) {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, amount: threshold });
   
   // Get the animation variant by name
   const animation = Animations[variant];
   
   // Add delay if specified
   const variantWithDelay = delay 
     ? {
         ...animation,
         visible: {
           ...animation.visible,
           transition: {
             ...animation.visible.transition,
             delay
           }
         }
       }
     : animation;
 
   return (
     <motion.div
       ref={ref}
       initial="hidden"
       animate={isInView ? "visible" : "hidden"}
       variants={variantWithDelay}
       className={className}
     >
       {children}
     </motion.div>
   );
 }