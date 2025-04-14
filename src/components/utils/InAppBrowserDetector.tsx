'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function InAppBrowserDetector() {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [browserType, setBrowserType] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  useEffect(() => {
    // Helper function to detect Facebook, Instagram, and Messenger in-app browsers
    const detectInAppBrowser = () => {
      const userAgent = navigator.userAgent || '';
      
      // More comprehensive detection for Facebook apps
      const isFacebookWebview = 
        userAgent.includes('FBAN') || 
        userAgent.includes('FBAV') || 
        userAgent.includes('FB_IAB');
      
      const isInstagramWebview = userAgent.includes('Instagram');
      const isMessengerWebview = userAgent.includes('Messenger');
      
      // Set the type for customized instructions
      if (isFacebookWebview) {
        setBrowserType('Facebook');
        return true;
      } else if (isInstagramWebview) {
        setBrowserType('Instagram');
        return true;
      } else if (isMessengerWebview) {
        setBrowserType('Messenger');
        return true;
      }
      
      return false;
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
    
    // Generate the URL to open in default browser
    let url = window.location.href;
    
    // Add special parameters that might help trigger external browser
    if (!url.includes('?')) {
      url += '?external=true';
    } else {
      url += '&external=true';
    }
    
    // Try multiple methods to open in external browser
    
    // Method 1: Try standard window.open with _system target (might work in some cases)
    window.open(url, '_system');
    
    // Method 2: Try regular _blank target
    setTimeout(() => {
      window.open(url, '_blank');
    }, 100);
    
    // Method 3: Location change with the target top
    setTimeout(() => {
      if (window.top) {
        window.top.location.href = url;
      }
    }, 200);
    
    // Don't dismiss immediately to allow multiple methods to try
    setTimeout(() => {
      setDismissed(true);
    }, 1000);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 3000);
      })
      .catch(err => console.error('Could not copy text: ', err));
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
          <h3 className="text-lg font-bold mb-2">
            You're browsing in {browserType || 'an in-app browser'}
          </h3>
          <p className="text-gray-700 mb-4">
            For the best experience, please open this site in your device's default browser (Safari, Chrome, etc.)
          </p>
          
          {/* Browser specific instructions */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
            <p className="font-medium text-blue-800 mb-1">How to open in your browser:</p>
            <ol className="list-decimal pl-5 text-blue-800">
              <li>Tap the "Copy Link" button below</li>
              <li>Open your device's browser (Safari/Chrome)</li>
              <li>Paste the link in the address bar</li>
            </ol>
            <p className="mt-2 text-blue-800">
              You can also try the "Open in browser" button, but it might not work in all in-app browsers.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              Continue anyway
            </button>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-all flex items-center justify-center"
            >
              {showCopyNotification ? 'Link copied!' : 'Copy Link'}
            </button>
            <button
              onClick={handleOpenInBrowser}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all flex items-center justify-center"
            >
              <FaExternalLinkAlt className="mr-2 h-3 w-3" />
              Open in browser
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
