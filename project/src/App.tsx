import React, { useState } from 'react';
import { EventProvider } from './context/EventContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MyEventsPage from './pages/MyEventsPage';
import CreateEventPage from './pages/CreateEventPage';

function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'myEvents':
        return <MyEventsPage />;
      case 'create':
        return <CreateEventPage onSuccess={() => setActivePage('myEvents')} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <EventProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar setActivePage={setActivePage} activePage={activePage} />
        <main className="pt-6 pb-12">
          {renderPage()}
        </main>
        <footer className="bg-indigo-800 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">Event Router</h3>
                <p className="text-indigo-200">Create, manage, and join events</p>
              </div>
              <div className="text-indigo-200 text-sm">
                &copy; {new Date().getFullYear()} Event Router. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </EventProvider>
  );
}

export default App;