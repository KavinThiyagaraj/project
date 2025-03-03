import { Event, User } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year featuring keynotes from industry leaders and workshops on cutting-edge technologies.',
    date: '2025-06-15',
    time: '09:00 AM',
    location: 'Codissia Trade Fair Center',
    organizer: 'user1',
    attendees: ['user2', 'user3'],
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    description: 'A three-day music festival featuring top artists from around the world. Food, camping, and good vibes included!',
    date: '2025-07-20',
    time: '06:00 PM',
    location: 'Hindusthan Arts College',
    organizer: 'user2',
    attendees: ['user1', 'user4'],
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Music'
  },
  {
    id: '3',
    title: 'Charity Run',
    description: 'Annual 5K run to raise funds for local children\'s hospital. All fitness levels welcome!',
    date: '2025-05-10',
    time: '08:00 AM',
    location: 'GD Road,RS Puram',
    organizer: 'user3',
    attendees: ['user2', 'user4'],
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Sports'
  },
  {
    id: '4',
    title: 'Art Exhibition Opening',
    description: 'Opening night for the new contemporary art exhibition featuring works from emerging local artists.',
    date: '2025-04-25',
    time: '05:00 PM',
    location: 'GD Auditorium ',
    organizer: 'user4',
    attendees: ['user1', 'user3'],
    imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Art'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Kavin',
    email: 'tkavin05@gmail.com',
    eventsCreated: ['1'],
    eventsJoined: ['2', '4']
  },
  {
    id: 'user2',
    name: 'Kaviyarasan',
    email: 'kavi09@gmail.com',
    eventsCreated: ['2'],
    eventsJoined: ['1', '3']
  },
  {
    id: 'user3',
    name: 'Lokanth',
    email: 'lokanth06@gmail.com',
    eventsCreated: ['3'],
    eventsJoined: ['1', '4']
  },
  {
    id: 'user4',
    name: 'Niggesh',
    email: 'niggesh02@gmail.com',
    eventsCreated: ['4'],
    eventsJoined: ['2', '3']
  }
];

// Current logged in user (for demo purposes)
export const currentUser: User = mockUsers[0];