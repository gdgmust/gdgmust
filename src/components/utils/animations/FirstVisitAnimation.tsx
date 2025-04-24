'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import logo from '../../../../public/logos/logo.png';

import RotatingText from './RotatingText';

export default function FirstVisitAnimation() {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      setShow(false);
      return;
    }
    
    // Set the flag after 3.5 seconds (animation duration)
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('hasVisited', 'true');
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-white z-[200]"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1]
              }
            }}
            exit={{ 
              scale: 1.2, 
              opacity: 0,
              transition: { 
                duration: 0.5, 
                ease: [0.22, 1, 0.36, 1]
              }
            }}
          >
            <div className="flex flex-col items-center">
              {/* <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { 
                    delay: 0.3, 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
              >
                <Image 
                  src={logo} 
                  alt="GDG Logo" 
                  width={40} 
                  height={24}
                  style={{ width: 'auto', height: 'auto' }}
                  className="mb-2"
                />
              </motion.div> */}
{/*               
              <motion.h1
                className="text-2xl text-center mb-2 select-none"
                initial={{ y: 20, opacity: 0 }}
                draggable={false}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { 
                    delay: 0.5, 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
              >
                Grow with Google
              </motion.h1> */}

              <motion.div
                className="mb-2 select-none flex flex-row items-center"
                initial={{ y: 20, opacity: 0 }}
                draggable={false}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { 
                    delay: 0.5, 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
              >
                <div>
                <h1 className="text-2xl md:text-3xl lg:text-3xl text-center mb-1 pr-3">Grow with</h1>
                </div>
                <div className="flex justify-end">
                <RotatingText
                  texts={['Google', 'us <3']}
                  mainClassName="bg-black text-white overflow-hidden -mt-1 pt-2 pb-[10px] lg:pb-[10px] justify-center rounded-full text-2xl md:text-3xl lg:text-3xl w-[100px] md:w-[130px] lg:w-[140px]"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
                </div>
              </motion.div>
              
              <motion.div
                // className="w-[40px] h-[4px] bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 rounded-full mt-4"
                className="w-[40px] h-[2px] bg-zinc-700 rounded-full mt-4"
                initial={{ width: 0 }}
                animate={{ 
                  width: 100,
                  transition: { 
                    delay: 0.2, 
                    duration: 1.5, 
                    ease: [0.22, 0.5, 0.32, 0.6]
                  }
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}