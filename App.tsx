import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Leaderboard from './pages/Leaderboard';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Rules from './pages/Rules';
import Partners from './pages/Partners';
import { USERS } from './constants';
import { User } from './types';

const App: React.FC = () => {
  // Simple router state
  const [currentPage, setCurrentPage] = useState('home');
  // Mock Auth state
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {
    // Simulate Strava Auth Delay
    setTimeout(() => {
       setUser(USERS[0]); // Log in as "Minh Nguyen"
       alert("Logged in successfully via Strava Mock!");
    }, 500);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onJoin={handleLogin} onNavigate={setCurrentPage} />;
      case 'activities':
        return <Activities onJoin={handleLogin} onNavigate={setCurrentPage} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'events':
        return <Events />;
      case 'profile':
        return user ? <Profile user={user} /> : <div className="text-center py-20">Please login to view profile</div>;
      case 'blog':
        return <Blog />;
      case 'gallery':
        return <Gallery />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'rules':
        return <Rules />;
      case 'partners':
        return <Partners />;
      default:
        return <Home onJoin={handleLogin} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage}
      user={user}
      onLogin={handleLogin}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;