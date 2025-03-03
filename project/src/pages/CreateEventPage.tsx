import React from 'react';
import EventForm from '../components/EventForm';

interface CreateEventPageProps {
  onSuccess: () => void;
}

const CreateEventPage: React.FC<CreateEventPageProps> = ({ onSuccess }) => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Event</h1>
      <EventForm onSuccess={onSuccess} />
    </div>
  );
};

export default CreateEventPage;