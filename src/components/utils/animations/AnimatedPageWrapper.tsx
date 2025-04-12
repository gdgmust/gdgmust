'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AnimatedPageWrapperProps {
  children: React.ReactNode;
  staggerDelay?: number; // Delay between child animations
  initialDelay?: number; // Initial delay before animations start
  animationDuration?: number; // Total animation duration
  className?: string;
}

const AnimatedPageWrapper = ({
  children,
  staggerDelay = 0.15,
  initialDelay = 0.1,
  animationDuration = 1500,
  className = "",
}: AnimatedPageWrapperProps) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    // Set animation as complete after it plays once
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, animationDuration);
    
    return () => clearTimeout(timer);
  }, [animationDuration]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div 
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={`animated-item-${index}`} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedPageWrapper;