import React from 'react';
import { Calendar, MapPin, Clock, Users, User, ArrowLeft, Trash } from 'lucide-react';
import { Event } from '../types';
import { useEventContext } from '../context/EventContext';

interface EventDetailsProps {
  eventId: string;
  onBack: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId, onBack }) => {
  const { getEventById, currentUser, joinEvent, leaveEvent, deleteEvent, users } = useEventContext();
  
  const event = getEventById(eventId);
  
  if (!event) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">Event not found</p>
        <button 
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }
  
  const isOrganizer = event.organizer === currentUser.id;
  const isAttending = event.attendees.includes(currentUser.id);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getOrganizerName = () => {
    const organizer = users.find(user => user.id === event.organizer);
    return organizer ? organizer.name : 'Unknown';
  };
  
  const getAttendeeNames = () => {
    return event.attendees.map(attendeeId => {
      const attendee = users.find(user => user.id === attendeeId);
      return attendee ? attendee.name : 'Unknown';
    });
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(event.id);
      onBack();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-64 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <button 
            onClick={onBack}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to events
          </button>
          
          {isOrganizer && (
            <button 
              onClick={handleDelete}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <Trash className="h-4 w-4 mr-1" />
              Delete Event
            </button>
          )}
        </div>
        
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h1>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-semibold rounded">
            {event.category}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About this event</h2>
            <p className="text-gray-600 mb-6 whitespace-pre-line">{event.description}</p>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-3 text-indigo-600" />
                <span>{formatDate(event.date)}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-3 text-indigo-600" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-3 text-indigo-600" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-3 text-indigo-600" />
                <span>Organized by {getOrganizerName()}</span>
              </div>
            </div>
            
            {!isOrganizer && (
              <div className="mt-8">
                <button
                  onClick={() => isAttending ? leaveEvent(event.id) : joinEvent(event.id)}
                  className={`px-6 py-3 rounded-md transition-colors ${
                    isAttending 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isAttending ? 'Leave Event' : 'Join Event'}
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-indigo-600" />
              Attendees ({event.attendees.length})
            </h3>
            
            {event.attendees.length > 0 ? (
              <ul className="space-y-2">
                {getAttendeeNames().map((name, index) => (
                  <li key={index} className="flex items-center">
                    <div className="bg-indigo-100 rounded-full p-2 mr-2">
                      <User className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No attendees yet. Be the first to join!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;