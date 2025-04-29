import { getEvents } from '@/lib/data';

// Helper function to create slug
export const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

// Helper function to safely resolve params whether they're Promises or not
export const resolveParams = async (params: any) => {
  if (params && typeof params.then === 'function') {
    return await params;
  }
  return params;
};

// Get event by slug
export const getEventBySlug = async (params: any) => {
  const resolvedParams = await resolveParams(params);
  const events = await getEvents();
  const slug = resolvedParams.slug;
  return events.find(e => createSlug(e.title) === slug);
};

// Group people by type (case-insensitive) while preserving original capitalization
export const groupPeopleByType = (people: any[]) => {
  const peopleByType: Record<string, any[]> = {};
  const typeDisplayNames: Record<string, string> = {};

  if (Array.isArray(people) && people.length > 0) {
    people.forEach(person => {
      if (person.type) {
        // Normalize type to lowercase for grouping
        const normalizedType = person.type.toLowerCase();
        
        // Store the original capitalization for display
        if (!typeDisplayNames[normalizedType]) {
          typeDisplayNames[normalizedType] = person.type;
        }
        
        // Initialize array if this type hasn't been seen before
        if (!peopleByType[normalizedType]) {
          peopleByType[normalizedType] = [];
        }
        
        // Add person to the appropriate type group
        peopleByType[normalizedType].push(person);
      }
    });
  }

  return { peopleByType, typeDisplayNames };
};

// Animation utility functions
export const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.2,
      ease: "easeOut" 
    } 
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut" 
    } 
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const slideInFromLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const slideInFromRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    } 
  }
};

export const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut" 
    } 
  }
};

// Generate custom staggered animation variants
export const generateStaggered = (baseAnimation: any, delayIncrement = 0.1) => {
  return (index: number) => ({
    hidden: { ...baseAnimation.hidden },
    visible: {
      ...baseAnimation.visible,
      transition: {
        ...baseAnimation.visible.transition,
        delay: index * delayIncrement
      }
    }
  });
};

// Apple-style animation presets
export const Animations = {
  // Smooth fade-in with slight upward movement
  fadeReveal: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0] // cubic-bezier easing for Apple-like smoothness
      }
    }
  },
  
  // Elegant scale animation for hero elements
  heroReveal: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1] // custom easing for premium feel
      }
    }
  },
  
  // Subtle left-to-right reveal for text content
  textReveal: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.7,
        ease: [0.42, 0, 0.58, 1] // ease-in-out cubic
      }
    }
  },
  
  // Delicate right-to-left reveal
  imageReveal: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  },
  
  // Staggered container for child elements
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
        ease: [0.42, 0, 0.58, 1]
      }
    }
  },
  
  // Button animation for CTA elements
  buttonReveal: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1] // custom spring-like easing
      }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    },
    hover: { 
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  }
};

// Parallax scroll effect - simulates Apple's smooth parallax
export const useParallax = (speed = 0.5) => {
  return {
    initial: { y: 0 },
    animate: (scrollY: number) => ({
      y: scrollY * speed,
      transition: { type: "spring", stiffness: 100 }
    })
  };
};

// Scroll-triggered animation factory
export const createScrollAnimation = (threshold = 0.2) => {
  return {
    offscreen: { opacity: 0, y: 50 },
    onscreen: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      } 
    },
    threshold // how much of element needs to be visible to trigger
  };
};

// Re-export the ScrollFadeReveal component for easy access
export { default as ScrollFadeReveal } from '../../../../components/utils/animations/ScrollFadeReveal';
