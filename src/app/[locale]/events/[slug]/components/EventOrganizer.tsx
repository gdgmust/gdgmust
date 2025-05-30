import { default as ImageComponent } from '@/components/eventspage/ImageWrapper';
import { FaHandshake } from "react-icons/fa6";

interface EventOrganizerProps {
  event: any;
}

export default function EventOrganizer({ event }: EventOrganizerProps) {
  if (!event.organizer || !Array.isArray(event.organizer) || !event.organizer.length) return null;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <p className="text-2xl font-bold mb-6 text-gray-800 flex justify-center items-center">
        <FaHandshake className="h-6 w-6 ml-[2px] mr-[10px] text-blue-600"/>
        Organizer
      </p>
      <div className="gap-4 flex flex-wrap justify-center select-none" draggable="false">
        {event.organizer.map((organizer: { name: string; logo: string; url: string }, index: number) => (
          <span key={index} className='w-[250px]'>
            <a 
              href={organizer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"
              draggable="false"
            >
              <div className="relative h-20 w-full">
                <ImageComponent
                  src={organizer.logo}
                  alt={organizer.name}
                  fill
                  style={{objectFit: 'contain'}}
                  sizes="200px"
                  className='py-3 px-2'
                  draggable="false"
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">{organizer.name}</p>
            </a>
          </span>
        ))}
      </div>
    </div>
  );
}
