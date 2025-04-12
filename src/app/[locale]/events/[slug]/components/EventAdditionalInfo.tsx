import { IoDocuments } from "react-icons/io5";

interface EventAdditionalInfoProps {
  event: any;
}

export default function EventAdditionalInfo({ event }: EventAdditionalInfoProps) {
  const hasAdditionalInfo = event.additionalInfo || event.agenda || event.requirements;
  
  if (!hasAdditionalInfo) return null;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl">
      <h2 className="text-2xl justify-center font-bold mb-6 text-gray-800 flex items-center">
        <IoDocuments className="h-6 w-6 mr-3 text-blue-600"/>
        Event Details
      </h2>
      <div className="space-y-6">
        {event.agenda && (
          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Agenda</h3>
            <div className="whitespace-pre-line text-gray-700 leading-10">{event.agenda}</div>
          </div>
        )}
        
        {event.requirements && (
          <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Requirements</h3>
            <div className="whitespace-pre-line text-gray-700">{event.requirements}</div>
          </div>
        )}
        
        {event.additionalInfo && (
          <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Additional Information</h3>
            <div className="whitespace-pre-line text-gray-700">{event.additionalInfo}</div>
          </div>
        )}
      </div>
    </div>
  );
}
