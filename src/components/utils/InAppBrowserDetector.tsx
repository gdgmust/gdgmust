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
    
    // Get current URL
    let url = window.location.href;
    
    // Add special parameters that might help trigger external browser
    if (!url.includes('?')) {
      url += '?external=true';
    } else {
      url += '&external=true';
    }
    
    // Create an invisible anchor element for more reliable external opening
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank'; // Try to open in new tab/window
    a.rel = 'noopener noreferrer';
    
    // Add special attributes that might help open in external browser
    a.setAttribute('data-browser', 'external');
    a.setAttribute('data-external-browser', 'true');
    
    // Try browser-specific schemes based on detected browser type
    if (browserType === 'Facebook' || browserType === 'Instagram' || browserType === 'Messenger') {
      // For iOS
      if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        // Try Safari-specific URL scheme
        setTimeout(() => {
          window.location.href = `x-web-search://?${encodeURIComponent(url)}`;
        }, 100);
        
        // Try Chrome on iOS
        setTimeout(() => {
          window.location.href = `googlechrome://${url.replace(/^https?:\/\//, '')}`;
        }, 200);
      }
      
      // For Android
      if (navigator.userAgent.match(/Android/i)) {
        // Try Intent URL format for Chrome
        setTimeout(() => {
          window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        }, 100);
      }
    }
    
    // Try simulating direct user interaction by adding to DOM and clicking
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Try direct window methods with different targets
    setTimeout(() => window.open(url, '_system'), 100);
    setTimeout(() => window.open(url, '_blank'), 200);
    
    // Also try to use location directly with fallbacks
    setTimeout(() => {
      if (window.location.href === url) {
        // If we're still on the same page, try forcing a refresh with "external" flag
        window.location.href = url + "&forceExternal=true";
      }
    }, 500);
    
    // Try to use navigator.share API if available (gives share sheet on mobile)
    if (navigator.share) {
      try {
        navigator.share({
          title: document.title,
          url: url
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
    
    // Don't dismiss the UI immediately to give methods time to work
    setTimeout(() => setDismissed(true), 1500);
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
          
          {/* Browser specific instructions - Updated with clearer guidance */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
            <p className="font-medium text-blue-800 mb-1">How to open in your browser:</p>
            <ol className="list-decimal pl-5 text-blue-800">
              <li>Tap the "Copy Link" button below</li>
              <li>Open your device's browser app</li>
              <li>Paste the link in the address bar</li>
            </ol>
            <p className="mt-2 text-blue-800">
              {browserType === 'Facebook' ? (
                <span>Facebook blocks external links. Try the three dots menu (⋯) in the top right and select "Open in browser"</span>
              ) : browserType === 'Instagram' ? (
                <span>Instagram blocks external links. Try the three dots menu (⋯) at the bottom and select "Open in browser"</span>
              ) : (
                <span>You can also try the "Open in browser" button below</span>
              )}
            </p>
          </div>
          
          {/* Share button if supported by the browser */}
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
            {navigator.share ? (
              <button
                onClick={() => {
                  navigator.share({
                    title: document.title,
                    url: window.location.href
                  }).catch(err => console.error('Error sharing:', err));
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-500 transition-all flex items-center justify-center"
              >
                Share
              </button>
            ) : null}
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
