import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import EventCard from '../components/EventCard';
import EventDetails from '../components/EventDetails';

const MyEventsPage: React.FC = () => {
  const { getUserEvents, getJoinedEvents } = useEventContext();
  const [activeTab, setActiveTab] = useState<'created' | 'joined'>('created');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  
  const createdEvents = getUserEvents();
  const joinedEvents = getJoinedEvents();
  
  if (selectedEventId) {
    return (
      <div className="container mx-auto py-8 px-4">
        <EventDetails 
          eventId={selectedEventId} 
          onBack={() => setSelectedEventId(null)} 
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Events</h1>
      
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('created')}
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'created'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Events I'm Hosting ({createdEvents.length})
        </button>
        
        <button
          onClick={() => setActiveTab('joined')}
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'joined'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Events I'm Attending ({joinedEvents.length})
        </button>
      </div>
      
      {activeTab === 'created' && (
        <>
          {createdEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onViewDetails={setSelectedEventId} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-600">You haven't created any events yet</p>
              <p className="text-gray-500 mt-2">Create your first event to see it here</p>
            </div>
          )}
        </>
      )}
      
      {activeTab === 'joined' && (
        <>
          {joinedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onViewDetails={setSelectedEventId} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-600">You haven't joined any events yet</p>
              <p className="text-gray-500 mt-2">Browse events and join ones you're interested in</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyEventsPage;