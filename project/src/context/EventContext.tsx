import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event, User } from '../types';
import { mockEvents, mockUsers, currentUser } from '../data/mockData';

interface EventContextType {
  events: Event[];
  users: User[];
  currentUser: User;
  addEvent: (event: Omit<Event, 'id' | 'organizer' | 'attendees'>) => void;
  joinEvent: (eventId: string) => void;
  leaveEvent: (eventId: string) => void;
  deleteEvent: (eventId: string) => void;
  getEventById: (eventId: string) => Event | undefined;
  getUserEvents: () => Event[];
  getJoinedEvents: () => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [loggedInUser, setLoggedInUser] = useState<User>(currentUser);

  const addEvent = (eventData: Omit<Event, 'id' | 'organizer' | 'attendees'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      organizer: loggedInUser.id,
      attendees: []
    };

    setEvents([...events, newEvent]);
    
    // Update user's created events
    const updatedUser = {
      ...loggedInUser,
      eventsCreated: [...loggedInUser.eventsCreated, newEvent.id]
    };
    
    setLoggedInUser(updatedUser);
    setUsers(users.map(user => user.id === loggedInUser.id ? updatedUser : user));
  };

  const joinEvent = (eventId: string) => {
    // Check if user is already attending
    if (loggedInUser.eventsJoined.includes(eventId)) return;

    // Update event attendees
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          attendees: [...event.attendees, loggedInUser.id]
        };
      }
      return event;
    }));

    // Update user's joined events
    const updatedUser = {
      ...loggedInUser,
      eventsJoined: [...loggedInUser.eventsJoined, eventId]
    };
    
    setLoggedInUser(updatedUser);
    setUsers(users.map(user => user.id === loggedInUser.id ? updatedUser : user));
  };

  const leaveEvent = (eventId: string) => {
    // Check if user is attending
    if (!loggedInUser.eventsJoined.includes(eventId)) return;

    // Update event attendees
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          attendees: event.attendees.filter(id => id !== loggedInUser.id)
        };
      }
      return event;
    }));

    // Update user's joined events
    const updatedUser = {
      ...loggedInUser,
      eventsJoined: loggedInUser.eventsJoined.filter(id => id !== eventId)
    };
    
    setLoggedInUser(updatedUser);
    setUsers(users.map(user => user.id === loggedInUser.id ? updatedUser : user));
  };

  const deleteEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    
    // Only allow deletion if user is the organizer
    if (!event || event.organizer !== loggedInUser.id) return;

    // Remove event
    setEvents(events.filter(e => e.id !== eventId));

    // Update user's created events
    const updatedUser = {
      ...loggedInUser,
      eventsCreated: loggedInUser.eventsCreated.filter(id => id !== eventId)
    };
    
    setLoggedInUser(updatedUser);
    setUsers(users.map(user => user.id === loggedInUser.id ? updatedUser : user));

    // Remove event from all users' joined events
    setUsers(users.map(user => ({
      ...user,
      eventsJoined: user.eventsJoined.filter(id => id !== eventId)
    })));
  };

  const getEventById = (eventId: string) => {
    return events.find(event => event.id === eventId);
  };

  const getUserEvents = () => {
    return events.filter(event => event.organizer === loggedInUser.id);
  };

  const getJoinedEvents = () => {
    return events.filter(event => loggedInUser.eventsJoined.includes(event.id));
  };

  return (
    <EventContext.Provider
      value={{
        events,
        users,
        currentUser: loggedInUser,
        addEvent,
        joinEvent,
        leaveEvent,
        deleteEvent,
        getEventById,
        getUserEvents,
        getJoinedEvents
      }}
    >
      {children}
    </EventContext.Provider>
  );
};