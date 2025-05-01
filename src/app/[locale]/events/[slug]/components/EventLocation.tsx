import { HiOutlineLocationMarker, HiLocationMarker } from "react-icons/hi";

interface EventLocationProps {
  event: any;
}

export default function EventLocation({ event }: EventLocationProps) {
  if (!event.location) return null;

  const hasExactLocation = !!event.exactLocation;
  const hasMapsLinkButton = !!event.mapsLinkButton;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <HiOutlineLocationMarker className="h-6 w-6 mr-3 text-blue-600" />
        Location
      </h2>
      <p className="text-xl font-medium text-gray-800 mb-2">{event.location}</p>
      {hasExactLocation && (
        <div className="mb-4">
          <p className="text-gray-600">• {event.exactLocation}</p>
        </div>
      )}
      <div className="bg-gray-100 rounded-xl p-4 mb-6 flex items-center justify-center h-[350px] overflow-hidden select-none" draggable="false">
        {event.mapsLink ? (
          <iframe 
            src={event.mapsLink}
            className="w-full h-full"
            title="Event Location"
            loading="lazy"
            draggable="false"
            allowFullScreen
          />
        ) : (
          <p className="text-gray-500">Map preview placeholder</p>
        )}
      </div>
      <nav className="flex justify-center">
        <a 
          href={(hasMapsLinkButton ? event.mapsLinkButton : event.mapsLink)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white font-medium h-[48px] py-3 px-6 rounded-full transition-all hover:shadow-lg transform hover:-translate-y-0.5 select-none" draggable="false"
        >
          <HiLocationMarker className="h-5 w-5 mr-2" />
          Open in Google Maps
        </a>
      </nav>
    </div>
  );
}
