import React from 'react';
import { Calendar, User, PlusCircle } from 'lucide-react';
import { useEventContext } from '../context/EventContext';

interface NavbarProps {
  setActivePage: (page: string) => void;
  activePage: string;
}

const Navbar: React.FC<NavbarProps> = ({ setActivePage, activePage }) => {
  const { currentUser } = useEventContext();

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 mr-2" />
            <span className="font-bold text-xl">Event Router</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setActivePage('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activePage === 'home' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
              }`}
            >
              Events
            </button>
            
            <button 
              onClick={() => setActivePage('myEvents')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activePage === 'myEvents' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
              }`}
            >
              My Events
            </button>
            
            <button 
              onClick={() => setActivePage('create')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                activePage === 'create' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
              }`}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Create Event
            </button>
            
            <div className="flex items-center ml-4">
              <User className="h-6 w-6 mr-1" />
              <span>{currentUser.name}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;