import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create middleware for internationalization
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  
  if (response) {
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    
    response.headers.set('Content-Security-Policy', 
      "frame-ancestors 'self'; default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src 'self' https:; font-src 'self' data:; frame-src 'self' https:;");
  }
  
  return response;
}
 
export const config = {
  // Match all routes except for:
  // - API routes
  // - Static files (e.g. /favicon.ico, /images/*)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
