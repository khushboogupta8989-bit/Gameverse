import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import API from './api';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const Games = lazy(() => import('./pages/Games'));
const Tournaments = lazy(() => import('./pages/Tournaments'));
const Community = lazy(() => import('./pages/Community'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));

// Animation Wrapper
const PageWrapper = ({ children }) => (
  <div className="page-motion-wrapper">
    <div className='page-wrapper'>{children}</div>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAppLoading(false);
        return;
      }

      try {
        const res = await API.get('/auth/profile');
        setUser(res.data);
      } catch (err) {
        console.error("Session expired");
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setAppLoading(false);
      }
    };
    initApp();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('gv_profile');
    setUser(null);
  };

  if (appLoading) {
    return (
      <div className="loading-screen-full">
        <div className="loader-spinner"></div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar user={user} onLogout={handleLogout} />

      <main className="main-content">
        <Suspense fallback={<div className="loader-spinner"></div>}>
          <AnimatedRoutes user={user} setUser={setUser} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

const AnimatedRoutes = ({ user, setUser }) => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
      <Route path="/games" element={<PageWrapper><Games /></PageWrapper>} />
      <Route path="/tournaments" element={<PageWrapper><Tournaments /></PageWrapper>} />
      <Route path="/community" element={<PageWrapper><Community /></PageWrapper>} />
      <Route path="/leaderboard" element={<PageWrapper><Leaderboard /></PageWrapper>} />
      <Route path="/quiz" element={<PageWrapper><Quiz /></PageWrapper>} />
      <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
      <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
      <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      
      {/* Auth Routes */}
      <Route 
        path="/login" 
        element={!user ? <PageWrapper><Login setUser={setUser} /></PageWrapper> : <Navigate to="/" />} 
      />
      <Route 
        path="/profile" 
        element={user ? <PageWrapper><Profile user={user} /></PageWrapper> : <Navigate to="/login" />} 
      />
    </Routes>
  );
};

export default App;