'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IoIosInformationCircle } from "react-icons/io";
import { Animations } from '../utils';

interface EventDetailsProps {
  event: any;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl"
    >
      <motion.div variants={Animations.staggerContainer}>
        <div
          className="flex items-center mb-6"
        >
          <IoIosInformationCircle className="h-[28px] w-[28px] mr-3 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">About the event</h2>
        </div>
        
        {event.description ? (
          <div
            className="text-gray-700 whitespace-pre-line text-lg leading-relaxed"
          >
            {event.description}
          </div>
        ) : (
          <div
            className="text-gray-500 italic"
          >
            No description available
          </div>
        )}
      </motion.div>
    </div>
  );
}
