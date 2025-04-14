'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InAppBrowserDetector() {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Helper function to detect Facebook, Instagram, and Messenger in-app browsers
    const detectInAppBrowser = () => {
      const userAgent = navigator.userAgent || '';
      
      // Check for Facebook, Instagram, or Messenger in-app browsers
      const isFacebookWebview = userAgent.includes('FBAN') || userAgent.includes('FBAV');
      const isInstagramWebview = userAgent.includes('Instagram');
      const isMessengerWebview = userAgent.includes('Messenger');
      
      return isFacebookWebview || isInstagramWebview || isMessengerWebview;
    };

    // Skip detection if this is server-side
    if (typeof window !== 'undefined') {
      // Check if user has already dismissed the prompt in this session
      const hasInteracted = sessionStorage.getItem('bypassInAppBrowser');
      
      if (!hasInteracted) {
        setIsInAppBrowser(detectInAppBrowser());
      } else {
        setDismissed(true);
      }
    }
  }, []);

  const handleOpenInBrowser = () => {
    // Store that user has interacted with the prompt
    sessionStorage.setItem('bypassInAppBrowser', 'true');
    setDismissed(true);
    
    // Generate the URL to open in default browser
    const url = window.location.href;
    
    // Open current URL in default browser
    window.open(url, '_system') || window.open(url, '_blank');
  };

  const handleDismiss = () => {
    // Store that user has dismissed the prompt
    sessionStorage.setItem('bypassInAppBrowser', 'true');
    setDismissed(true);
  };

  // Don't render anything if not in an in-app browser or if dismissed
  if (!isInAppBrowser || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-[200] p-4 bg-white shadow-lg border-t border-gray-200"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-semibold mb-2">You're using an in-app browser</h3>
          <p className="text-gray-700 mb-4">
            For the best experience with our website, we recommend opening it in your device's default browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              Continue anyway
            </button>
            <button
              onClick={handleOpenInBrowser}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all"
            >
              Open in browser
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
