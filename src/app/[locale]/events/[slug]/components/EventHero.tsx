'use client';

import { motion } from 'framer-motion';
import { default as ImageComponent } from '@/components/eventspage/ImageWrapper';
import { FaCalendarDays } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import { fadeInUp, fadeIn } from '../utils';

interface EventHeroProps {
  event: any;
}

export default function EventHero({ event }: EventHeroProps) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative h-[500px] w-full mb-12 rounded-2xl overflow-hidden shadow-2xl select-none"
      draggable="false"
    >
      {event.image ? (
        <ImageComponent
          src={event.image}
          alt={event.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <p className="text-white text-xl font-medium">No image available</p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-10">
        <motion.div 
          variants={fadeInUp}
          className="max-w-3xl"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]"
          >
            {event.title}
          </motion.h1>
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap gap-3 md:gap-4 lg:gap-5 text-white"
          >
            {event.date && (
              <motion.div 
                variants={fadeInUp}
                className="flex items-center bg-black/30 backdrop-blur-sm py-2 px-4 rounded-full"
              >
                <FaCalendarDays className="h-[18px] w-[18px] mr-2 text-blue-400"/>
                <span>{new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </motion.div>
            )}
            {event.location && (
              <motion.div 
                variants={fadeInUp}
                className="flex items-center bg-black/30 backdrop-blur-sm py-2 px-4 rounded-full"
              >
                <HiLocationMarker className="h-5 w-5 mr-2 text-blue-400"/>
                <span>{event.location}</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
