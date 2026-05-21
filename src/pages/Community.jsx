import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // Uses your configured API
import './Community.css';
// ADD THESE IMPORTS AT TOP OF Community.jsx
import bgmiCommunity from '../assets/Games/bgmi-Community.webp';
import valorantImg from '../assets/Games/valorant-home-featured.jpg';

const imageMap = {
  'bgmi': bgmiCommunity,
  'valorant': valorantImg
};

// --- HOOKS ---
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

// --- COMPONENTS ---
const ProfileModal = ({ user, onClose }) => {
  if (!user) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content profile-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg></button>
        <div className="modal-header-bg"><img src={user.avatar} alt={user.username} className="modal-avatar" /></div>
        <div className="modal-body">
          <div className="user-info-top"><h2 className="modal-username">{user.username}</h2><span className="user-role">{user.role}</span></div>
          <div className="user-stats-row">
            <div className="stat-item"><span className="stat-val">{user.likes?.toLocaleString()}</span><span className="stat-lbl">Followers</span></div>
            <div className="stat-item"><span className="stat-val">{user.games?.length || 0}</span><span className="stat-lbl">Games</span></div>
          </div>
          <div className="modal-section"><h3>Recent Activity</h3><p className="post-preview">"{user.post}"</p></div>
          <div className="modal-section"><h3>Achievements</h3><div className="tags-wrap">{user.achievements?.map((ach, i) => <span key={i} className="tag-badge achievement">{ach}</span>)}</div></div>
          <div className="modal-section"><h3>Active In</h3><div className="tags-wrap">{user.games?.map((g, i) => <span key={i} className="tag-badge game">{g}</span>)}</div></div>
        </div>
      </div>
    </div>
  );
};

const CommunityCard = ({ user, onClick, index }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`community-card ${isVisible ? 'animate-in' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }} onClick={() => onClick(user)} tabIndex={0}>
      <div className="card-header-section"><img src={user.avatar} alt={user.username} className="user-avatar" /><div className="user-info"><h3 className="username">{user.username}</h3><span className="user-role-sm">{user.role}</span></div></div>
      <p className="post-snippet">"{user.post}"</p>
      <div className="card-footer-section">
        <div className="game-tags">{user.games?.slice(0, 2).map((g, i) => <span key={i} className="game-tag">{g}</span>)}</div>
        <div className="social-stats"><span className="stat"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> {user.likes}</span></div>
      </div>
    </div>
  );
};

const DiscussionCard = ({ data, index }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`discussion-card ${isVisible ? 'animate-in' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }} tabIndex={0}>
      <div className="disc-header"><span className="disc-game-tag">{data.game}</span><h4 className="disc-title">{data.title}</h4></div>
      <div className="disc-footer"><span className="disc-author">by @{data.author}</span><div className="disc-stats"><span>{data.comments} 💬</span><span>{data.likes} 🔥</span></div></div>
    </div>
  );
};

const EventCard = ({ event, index, onJoin }) => {
  const [ref, isVisible] = useScrollAnimation();
  const [status, setStatus] = useState('idle');
  const handleJoin = (e) => {
    e.stopPropagation();
    if (status !== 'idle') return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('joined');
      onJoin(event.name);
      try {
        const payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
        const userId = payload?.user?._id || payload?.user?.id;
        if (userId) {
          api.post('/profile/add-activity', { userId, action: `Joined community event: ${event.name}` }).catch(() => {});
        }
      } catch (e) {}
    }, 1200);
  };
  return (
    <div ref={ref} className={`event-card ${isVisible ? 'animate-in' : ''}`} style={{ transitionDelay: `${index * 0.15}s` }}>
      <img
        src={imageMap[event.imageKey]}
        alt={event.name}
        className="event-banner"
      />
      <div className="event-overlay"></div>
      <div className="event-content">
        <span className="event-game">{event.game}</span><h3 className="event-name">{event.name}</h3><span className="event-date">{event.date}</span>
        <button className={`event-join-btn ${status}`} onClick={handleJoin} disabled={status === 'loading' || status === 'joined'}>
          {status === 'loading' && <span className="spinner"></span>}{status === 'idle' && 'Join Event'}{status === 'joined' && '✓ Joined'}
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
const Community = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [highlights, setHighlights] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [events, setEvents] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hRes, dRes, eRes] = await Promise.all([
          api.get('/community/highlights'),
          api.get('/community/discussions'),
          api.get('/community/events')
        ]);
        setHighlights(hRes.data);
        setDiscussions(dRes.data);
        setEvents(eRes.data);
        setIsLoaded(true);
      } catch (err) { console.error("Community Fetch Error:", err); }
    };
    fetchData();
  }, []);

  const showToast = (message) => { setToast({ show: true, message }); setTimeout(() => setToast({ show: false, message: '' }), 3000); };
  const isLoggedIn = false;
  const handleCommunityJoin = () => { if (isLoggedIn) { showToast("Welcome!"); } else { window.open("https://discord.gg/8XVpQm28FH", "_blank", "noopener,noreferrer"); } };

  return (
    <div className="community-page">
      <div className="c-bg-layer"><div className="c-bg-image"></div><div className="c-bg-gradient"></div></div>
      <section className={`c-hero ${isLoaded ? 'visible' : ''}`}>
        <div className="hero-content">
          <span className="hero-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>Community Hub</span>
          <h1 className="hero-title">Join the <span className="gradient-text">Gaming Community</span></h1>
          <p className="hero-subtitle">Connect, share, and compete with fellow Indian gamers</p>
          <div className="hero-actions">
            <button className="hero-join-btn" onClick={handleCommunityJoin}>{isLoggedIn ? "Joined" : "Join Community"}</button>
            <Link to="/tournaments" className="hero-secondary-btn">View Tournaments</Link>
          </div>
        </div>
      </section>

      <section className="c-section highlights-section">
        <div className="section-header"><h2 className="section-title">Featured Creators & Players</h2><div className="section-line"></div></div>
        <div className="highlights-grid">
          {highlights.map((user, i) => <CommunityCard key={user._id} user={user} index={i} onClick={setSelectedUser} />)}
        </div>
      </section>

      <section className="c-section discussions-section">
        <div className="section-header"><h2 className="section-title">Trending Discussions</h2><div className="section-line"></div></div>
        <div className="discussions-scroll">
          {discussions.map((item, i) => <DiscussionCard key={item._id} data={item} index={i} />)}
        </div>
      </section>

      <section className="c-section events-section">
        <div className="section-header"><h2 className="section-title">Community Events & Challenges</h2><div className="section-line"></div></div>
        <div className="events-grid">
          {events.map((event, i) => <EventCard key={event._id} event={event} index={i} onJoin={showToast} />)}
        </div>
      </section>

      <section className="c-cta-section">
        <h2 className="cta-title">Ready to Level Up?</h2>
        <p className="cta-subtitle">Join thousands of gamers already in GameVerse</p>
        <button className="hero-join-btn large" onClick={handleCommunityJoin}>Create Free Account</button>
      </section>

      {toast.show && (<div className="toast-notification"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>{toast.message}</span></div>)}
      {selectedUser && <ProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
};

export default Community;