import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Event } from '../types';
import { useEventContext } from '../context/EventContext';

interface EventCardProps {
  event: Event;
  onViewDetails: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  const { currentUser, joinEvent, leaveEvent } = useEventContext();
  
  const isOrganizer = event.organizer === currentUser.id;
  const isAttending = event.attendees.includes(currentUser.id);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded">
            {event.category}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center text-gray-500 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formatDate(event.date)}</span>
        </div>
        
        <div className="flex items-center text-gray-500 mb-2">
          <Clock className="h-4 w-4 mr-2" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center text-gray-500 mb-4">
          <Users className="h-4 w-4 mr-2" />
          <span>{event.attendees.length} attending</span>
        </div>
        
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onViewDetails(event.id)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            View Details
          </button>
          
          {!isOrganizer && (
            <button
              onClick={() => isAttending ? leaveEvent(event.id) : joinEvent(event.id)}
              className={`px-4 py-2 rounded transition-colors ${
                isAttending 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
            >
              {isAttending ? 'Leave Event' : 'Join Event'}
            </button>
          )}
          
          {isOrganizer && (
            <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded">
              You're the organizer
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;