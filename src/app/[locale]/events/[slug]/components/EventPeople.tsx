'use client';

import { motion } from 'framer-motion';
import { default as ImageComponent } from '@/components/eventspage/ImageWrapper';
import { BsPeopleFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { groupPeopleByType, fadeInUp, staggerContainer, generateStaggered } from '../utils';

import ScrollReveal from '../../../../../components/utils/animations/ScrollReveal';

interface EventPeopleProps {
  event: any;
}

export default function EventPeople({ event }: EventPeopleProps) {
  const people = event.people || [];
  const hasPeople = Array.isArray(people) && people.length > 0;
  
  if (!hasPeople) return null;
  
  const { peopleByType, typeDisplayNames } = groupPeopleByType(people);
  const itemAnimation = generateStaggered(fadeInUp, 0.1);
  
  return (
    <>
      {Object.keys(peopleByType).map(type => (
        <ScrollReveal key={`scroll-reveal-${type}`} variant="fadeReveal" delay={0.1}>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          key={`people-section-${type}`} 
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 flex items-center justify-center"
          >
            <BsPeopleFill className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 text-blue-600"/>
            {typeDisplayNames[type]}
          </motion.h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 md:gap-6"> 
            {peopleByType[type].map((person: any, index: number) => (
              <motion.div
                variants={itemAnimation(index)}
                key={`person-${type}-${index}`} 
                className="flex flex-col sm:flex-row p-3 sm:p-4 bg-gray-50 rounded-xl md:hover:shadow-md transition-all transform md:hover:-translate-y-1"
              >
                <div className="relative h-48 sm:h-48 md:h-48 w-48 sm:w-48 md:w-48 flex-shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-md select-none mx-auto sm:mx-0" draggable="false">
                  {person.image ? (
                    <ImageComponent
                      src={person.image}
                      alt={person.name || "Person image"}
                      fill
                      style={{objectFit: 'cover'}}
                      draggable="false"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <FaQuestion className="h-10 w-10 text-blue-400"/>
                    </div>
                  )}
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-4 text-center sm:text-left">
                  <motion.p 
                    variants={fadeInUp}
                    className="font-bold text-[20px] mb-2 text-gray-800"
                  >
                    {person.name}
                  </motion.p>
                  {person.role && (
                    <motion.p 
                      variants={fadeInUp}
                      className="text-blue-600 font-medium mb-2 text-sm sm:text-base"
                    >
                      {person.role}
                    </motion.p>
                  )}
                  {person.bio && (
                    <motion.p 
                      variants={fadeInUp}
                      className="text-sm text-gray-600 mt-2 line-clamp-3"
                    >
                      {person.bio}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </ScrollReveal>
      ))}
    </>
  );
}
