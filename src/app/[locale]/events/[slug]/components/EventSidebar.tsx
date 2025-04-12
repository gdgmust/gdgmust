import { FaRegCalendar } from 'react-icons/fa';
import { BsCircleFill } from 'react-icons/bs';
import { BsFacebook } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

import Image from "next/image";

interface EventSidebarProps {
  event: any;
  registerText: string;
}

export default function EventSidebar({ event, registerText }: EventSidebarProps) {
  return (
    <div className="md:col-span-1">
      <div className="sticky top-8 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <h3 className="text-xl font-bold mb-4 text-blue-900">Event Summary</h3>

          <div className="space-y-4 mb-6">
            {/* Status badge */}
            <div className="flex justify-between items-center select-none" draggable="false">
              <span className="text-gray-600">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.status === 'upcoming' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-center">
                  <BsCircleFill className="h-2 w-2 mr-1" />
                  {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
                </div>
              </span>
            </div>
            
            {/* Date with icon */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium flex items-center">
                <FaRegCalendar className="h-4 w-4 mr-2 text-blue-500" />
                {new Date(event.date).toLocaleDateString()}
              </span>
            </div>
            
            {/* Time with icon */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            
            {/* Tickets */}
            {typeof event.ticketsAvailable !== 'undefined' && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tickets:</span>
                {event.ticketsAvailable ? (
                  <span className="text-green-600 font-medium">Available</span>
                ) : (
                  <span className="text-red-600 font-medium">Not available</span>
                )}
              </div>
            )}
            
            {/* Price */}
            {event.ticketPrice && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="text-blue-600 font-bold">
                  {event.ticketPrice.toLocaleString()} {event.ticketCurrency}
                </span>
              </div>
            )}
            
            {/* Capacity */}
            {event.maxAttendees && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Capacity:</span>
                <span className="font-medium">{event.maxAttendees} attendees</span>
              </div>
            )}
          </div>
          
          {/* Registration button for upcoming events with available tickets */}
          {event.status === 'upcoming' && event.ticketsAvailable && (
            <span className='flex justify-center select-none' draggable="false">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium h-[48px] py-3 px-6 rounded-full transition-all hover:shadow-lg transform hover:-translate-y-0.5">
                <a href={event.ticketLink} target="_blank" rel="noopener noreferrer">
                  {registerText}
                </a>
              </button>
            </span>
          )}
          
          {/* Share event buttons */}
          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3 select-none">Share this event</p>
            <div className="flex space-x-3">
              {/* Social share buttons */}
              <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 select-none" draggable="false">
                <a href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noreferrer">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
                </a>
              </button>
              <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 select-none" draggable="false">
                <a href="https://x.com/intent/post" target="_blank" rel="noreferrer">
                  <FaXTwitter className="w-5 h-5"/>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
