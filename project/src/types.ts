export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: string[];
  imageUrl: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  eventsCreated: string[];
  eventsJoined: string[];
}