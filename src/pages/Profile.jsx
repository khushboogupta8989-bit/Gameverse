import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';
import { getAuthItem, setAuthItem } from '../authStorage';
import './Profile.css';

// ── YOUR LOCAL IMPORTS ──
import avatar1 from '../assets/Games/avatar_1.jpg';
import avatar2 from '../assets/Games/avatar_2.jpg';
import avatar3 from '../assets/Games/avatar_3.jpg';
import avatar4 from '../assets/Games/avatar_4.jpg';
import avatar5 from '../assets/Games/avatar_5.jpg';
import banner1 from '../assets/Games/banner_1.jpg';
import banner2 from '../assets/Games/banner_2.jpg';
import banner3 from '../assets/Games/banner_3.jpg';
import banner4 from '../assets/Games/banner_4.jpg';
import banner5 from '../assets/Games/banner_5.jpg';

const AVATARS = [
  { id: 'avatar1', url: avatar1, label: 'Avatar 1' },
  { id: 'avatar2', url: avatar2, label: 'Avatar 2' },
  { id: 'avatar3', url: avatar3, label: 'Avatar 3' },
  { id: 'avatar4', url: avatar4, label: 'Avatar 4' },
  { id: 'avatar5', url: avatar5, label: 'Avatar 5' }
];

const BANNERS = [
  { id: 'banner1', url: banner1, label: 'Banner 1' },
  { id: 'banner2', url: banner2, label: 'Banner 2' },
  { id: 'banner3', url: banner3, label: 'Banner 3' },
  { id: 'banner4', url: banner4, label: 'Banner 4' },
  { id: 'banner5', url: banner5, label: 'Banner 5' }
];

// ── HELPERS ──
const getBadge = (c) => {
  if (c >= 5) return { l: 'Legend', c: 'badge-legend' };
  if (c >= 3) return { l: 'Pro', c: 'badge-pro' };
  if (c >= 1) return { l: 'Intermediate', c: 'badge-inter' };
  return { l: 'Beginner', c: 'badge-begin' };
};

const ACH = {
  first_game_click: { l: 'First Game Click', d: 'Visited your first game', cl: '#06b6d4' },
  joined_tournament: { l: 'Joined Tournament', d: 'Entered your first tournament', cl: '#8b5cf6' },
  quiz_completed: { l: 'Quiz Completed', d: 'Finished a quiz challenge', cl: '#10b981' },
  five_games: { l: 'Game Explorer', d: 'Visited 5 different games', cl: '#f59e0b' },
  profile_complete: { l: 'Profile Complete', d: 'Set up your gaming profile', cl: '#ec4899' },
};

const timeAgo = (d) => {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return 'Just now';
  const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`;
  const dy = Math.floor(h / 24); if (dy < 30) return `${dy}d ago`;
  return new Date(d).toLocaleDateString();
};

// ── MAIN COMPONENT ──
const Profile = () => {
  const tp = (() => { try { const t = getAuthItem('token'); return t ? JSON.parse(atob(t.split('.')[1])) : null; } catch (e) { return null; } })();
  const localUser = (() => { try { return JSON.parse(getAuthItem('user')); } catch (e) { return null; } })();
  const userId = tp?.user?._id || tp?.user?.id || localUser?._id || localUser?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [setupUsername, setSetupUsername] = useState('');
  const [setupAvatar, setSetupAvatar] = useState('');
  const [setupBanner, setSetupBanner] = useState('');
  const [setupErr, setSetupErr] = useState('');
  const [setupSaving, setSetupSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [eAvatar, setEAvatar] = useState('');
  const [eBanner, setEBanner] = useState('');
  const [eAbout, setEAbout] = useState('');
  const [eWinRate, setEWinRate] = useState(0);
  const [eRank, setERank] = useState(0);
  const [eKdRatio, setEKdRatio] = useState(0);
  const [eSaving, setESaving] = useState(false);

  const [toast, setToast] = useState({ s: false, m: '', t: '' });
  
  const currentUsername = setupUsername || localUser?.username || tp?.user?.username || 'Player';
  const notify = (m, t = 'success') => { setToast({ s: true, m, t }); setTimeout(() => setToast({ s: false, m: '', t: '' }), 3000); };

  const fetchProfile = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await api.get(`/profile/${userId}`);
      const p = res.data;
      if (!p.avatar || !p.banner) {
        setIsNewUser(true);
        setProfile(null);
      } else {
        setProfile(p);
        setIsNewUser(false);
        setAuthItem('gv_profile', JSON.stringify({ username: p.username, avatar: p.avatar }));
      }
    } catch (err) {
      if (err.response?.status === 404) { setIsNewUser(true); setProfile(null); }
      else notify('Failed to load profile', 'error');
    } finally { setLoading(false); }
  }, [userId]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  useEffect(() => {
    if (isNewUser && userId) {
      api.get(`/profile/check/${userId}`).then(r => setSetupUsername(r.data.username)).catch(() => { });
    }
  }, [isNewUser, userId]);

  const handleCreate = async () => {
    if (!setupAvatar || !setupBanner) { setSetupErr('Select both an avatar and a banner.'); return; }
    setSetupErr(''); setSetupSaving(true);
    try {
      await api.post('/profile/create', { userId, username: setupUsername, avatar: setupAvatar, banner: setupBanner, achievements: ['profile_complete'] });
      setAuthItem('gv_profile', JSON.stringify({ username: setupUsername, avatar: setupAvatar }));
      notify('Profile created!');
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      await fetchProfile();
    } catch (err) { notify('Failed to create profile', 'error'); }
    finally { setSetupSaving(false); }
  };

  const handleUpdate = async () => {
    setESaving(true);
    try {
      const u = {};
      if (eAvatar !== profile.avatar) u.avatar = eAvatar;
      if (eBanner !== profile.banner) u.banner = eBanner;
      if (eAbout !== (profile.about || '')) u.about = eAbout;
      
      // Compute stats updates
      const statsObj = {};
      const winRateNum = eWinRate !== '' ? Number(eWinRate) : 0;
      const rankNum = eRank !== '' ? Number(eRank) : 0;
      const kdRatioNum = eKdRatio !== '' ? Number(eKdRatio) : 0;

      if (
        winRateNum !== (profile.stats?.winRate || 0) ||
        rankNum !== (profile.stats?.rank || 0) ||
        kdRatioNum !== (profile.stats?.kdRatio || 0)
      ) {
        statsObj.winRate = winRateNum;
        statsObj.rank = rankNum;
        statsObj.kdRatio = kdRatioNum;
      }

      if (Object.keys(statsObj).length > 0) {
        u.stats = statsObj;
      }

      if (Object.keys(u).length === 0) { setShowModal(false); return; }
      await api.put('/profile/update', { userId, ...u });
      setAuthItem('gv_profile', JSON.stringify({ username: profile.username, avatar: eAvatar }));
      notify('Profile updated!'); setShowModal(false); await fetchProfile();
    } catch (err) { notify('Failed to update', 'error'); }
    finally { setESaving(false); }
  };

  const openModal = () => { 
    setEAvatar(profile.avatar); 
    setEBanner(profile.banner); 
    setEAbout(profile.about || ''); 
    setEWinRate(profile.stats?.winRate || 0);
    setERank(profile.stats?.rank || 0);
    setEKdRatio(profile.stats?.kdRatio || 0);
    setShowModal(true); 
  };

  if (!userId) return (<div className="gv-p"><div className="gv-c"><div className="gv-ei">🔒</div><p>Please log in to view your profile</p></div></div>);
  if (loading) return (<div className="gv-p"><div className="gv-c"><div className="gv-sp" /><p>Loading profile...</p></div></div>);

  // ── SETUP WIZARD ──
  if (isNewUser) return (
    <div className="gv-p">
      <div className="gv-so">
        <div className="gv-g gv-sc">
          <div className="gv-sh">
            <div className="gv-logo">
              {currentUsername.charAt(0).toUpperCase()}
            </div>
            <h1>GameVerse</h1>
            <p>Welcome, <strong>{currentUsername}</strong>! Set up your profile</p>
          </div>
          <div className="gv-ss">
            <h3>Choose Avatar</h3>
            <div className="gv-pg gv-ag">
              {AVATARS.map(a => (
                <button key={a.id} className={`gv-pi ${setupAvatar === a.url ? 'gv-sel' : ''}`} onClick={() => { setSetupAvatar(a.url); setSetupErr(''); }}>
                  <img src={a.url} alt={a.label} className="gv-ai" />
                  <span>{a.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="gv-ss">
            <h3>Choose Banner</h3>
            <div className="gv-pg gv-bg">
              {BANNERS.map(b => (
                <button key={b.id} className={`gv-pi ${setupBanner === b.url ? 'gv-sel' : ''}`} onClick={() => { setSetupBanner(b.url); setSetupErr(''); }}>
                  <img src={b.url} alt={b.label} className="gv-bt" />
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
          </div>
          {setupErr && <p className="gv-er">{setupErr}</p>}
          <button className="gv-save-btn" onClick={handleCreate} disabled={setupSaving}>{setupSaving ? 'Saving...' : 'Save Profile'}</button>
        </div>
      </div>
    </div>
  );

  // ── FULL PROFILE ──
  const badge = getBadge(profile.achievements?.length || 0);
  const hasG = profile.games?.length > 0;
  const hasA = profile.achievements?.length > 0;
  const hasS = !!profile.stats;
  const hasAc = profile.activity?.length > 0;
  const hasAb = profile.about?.trim();

  return (
    <div className="gv-p">
      {toast.s && <div className={`gv-toast gv-t-${toast.t}`}>{toast.m}</div>}

      <header className="gv-hd">
        <div className="gv-bw">
          <img src={profile.banner} alt="Banner" className="gv-bi" />
          <div className="gv-bf" />
        </div>
        <div className="gv-hb">
          <div className="gv-ar">
            <img src={profile.avatar} alt="Avatar" className="gv-am" />
          </div>
          <div className="gv-ui">
            <h1>{profile.username}</h1>
            <span className={`gv-bd ${badge.c}`}>{badge.l}</span>
          </div>
          <button className="gv-bo" onClick={openModal}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            Edit Profile
          </button>
        </div>
      </header>

      <main className="gv-mn">
        {hasAb && (<section className="gv-sec" style={{ animationDelay: '.05s' }}><div className="gv-g gv-ab"><div className="gv-abl">ABOUT ME</div><p className="gv-abt">{profile.about}</p></div></section>)}

        <section className="gv-sec" style={{ animationDelay: '.1s' }}>
          <h2 className="gv-tt">Quick Stats</h2>
          {hasS ? (
            <div className="gv-sg">
              {[{ v: `${profile.stats?.winRate ?? 0}%`, l: 'Win Rate' }, { v: (profile.stats?.rank || 0) > 0 ? `#${profile.stats.rank}` : 'Unranked', l: 'Global Rank' }, { v: profile.stats?.kdRatio ?? 0, l: 'K/D Ratio' }].map((s, i) => (
                <div key={i} className="gv-g gv-sc2"><span className="gv-sv">{s.v}</span><span className="gv-sl">{s.l}</span></div>
              ))}
            </div>
          ) : (<div className="gv-em"><span className="gv-ei">📊</span><p>Stats not available yet</p></div>)}
        </section>

        <section className="gv-sec" style={{ animationDelay: '.15s' }}>
          <h2 className="gv-tt">Games You Visited</h2>
          {hasG ? (
            <div className="gv-gg">
              {profile.games.map((g, i) => (
                <div key={i} className="gv-g gv-gc" style={{ animationDelay: `${i * .07}s`, '--card-glow': `var(--glow-${g.genre?.toLowerCase().replace(/\s/g, '') || 'general'})` }}>
                  <div className="gv-neon-top">
                    <span className="gv-genre-tag">{g.genre || 'Game'}</span>
                    <div className="gv-neon-icon">🎮</div>
                  </div>
                  <div className="gv-gbd">
                    <h3>{g.name}</h3>
                    <button className="gv-ba" onClick={() => window.open(g.link, '_blank', 'noopener,noreferrer')}>Visit Again</button>
                  </div>
                </div>

              ))}
            </div>
          ) : (<div className="gv-em"><span className="gv-ei">🎮</span><p>No games played yet</p></div>)}
        </section>

        <section className="gv-sec" style={{ animationDelay: '.2s' }}>
          <h2 className="gv-tt">Achievements</h2>
          {hasA ? (
            <div className="gv-ag2">
              {profile.achievements.map((id, i) => {
                const a = ACH[id]; if (!a) return null;
                return (
                  <div key={id} className="gv-g gv-ac2" style={{ animationDelay: `${i * .07}s`, '--ac': a.cl }}>
                    <div className="gv-aic" style={{ background: `linear-gradient(135deg, ${a.cl}22, ${a.cl}55)`, border: `1px solid ${a.cl}44` }}>
                      <span style={{ color: a.cl, fontWeight: 800, fontSize: '.8rem' }}>{a.l.split(' ').map(w => w[0]).join('')}</span>
                    </div>
                    <div><h4 className="gv-an">{a.l}</h4><p className="gv-ad">{a.d}</p></div>
                  </div>
                );
              })}
            </div>
          ) : (<div className="gv-em"><span className="gv-ei">🏆</span><p>No achievements yet</p></div>)}
        </section>

        <section className="gv-sec" style={{ animationDelay: '.25s' }}>
          <h2 className="gv-tt">Recent Activity</h2>
          {hasAc ? (
            <ul className="gv-al">
              {profile.activity.map((item, i) => {
                const a = item.action.toLowerCase();
                const icon = a.includes('tournament') ? '🏟️'
                  : a.includes('quiz') || a.includes('level') ? '🧠'
                  : a.includes('community') || a.includes('event') ? '👥'
                  : a.includes('player') || a.includes('ranking') ? '🏅'
                  : a.includes('game') || a.includes('visited') ? '🎮'
                  : '📌';
                return (
                  <li key={i} className="gv-g gv-ati" style={{ animationDelay: `${i * .06}s` }}>
                    <span style={{ fontSize: '1.2rem', marginRight: '10px', flexShrink: 0 }}>{icon}</span><span className="gv-att">{item.action}</span><span className="gv-attm">{timeAgo(item.timestamp)}</span>
                  </li>
                );
              })}
            </ul>
          ) : (<div className="gv-em"><span className="gv-ei">📋</span><p>No recent activity</p></div>)}
        </section>
      </main>

      {showModal && (
        <div className="gv-mbg" onClick={() => setShowModal(false)}>
          <div className="gv-g gv-md" onClick={e => e.stopPropagation()}>
            <div className="gv-mhd"><h2>Edit Profile</h2><button className="gv-mx" onClick={() => setShowModal(false)}>✕</button></div>
            <div className="gv-mbd">
              <div className="gv-es">
                <h3>Avatar</h3>
                <div className="gv-pg gv-ag">
                  {AVATARS.map(a => (
                    <button key={a.id} className={`gv-pi ${eAvatar === a.url ? 'gv-sel' : ''}`} onClick={() => setEAvatar(a.url)}>
                      <img src={a.url} alt={a.label} className="gv-ai" /><span>{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="gv-es">
                <h3>Banner</h3>
                <div className="gv-pg gv-bg">
                  {BANNERS.map(b => (
                    <button key={b.id} className={`gv-pi ${eBanner === b.url ? 'gv-sel' : ''}`} onClick={() => setEBanner(b.url)}>
                      <img src={b.url} alt={b.label} className="gv-bt" /><span>{b.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="gv-es">
                <h3>About Me</h3>
                <textarea className="gv-abi" maxLength={300} placeholder="What games do you play? Favorite genres? Your rank?" value={eAbout} onChange={e => setEAbout(e.target.value)} />
                <span className="gv-abc">{eAbout.length}/300</span>
              </div>
              <div className="gv-es">
                <h3>Quick Stats</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '.72rem', color: 'var(--t3)', display: 'block', marginBottom: '6px' }}>Win Rate (%)</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="100" 
                      style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, .03)', border: '1px solid var(--bdr)', borderRadius: '8px', color: 'var(--t1)', fontSize: '.84rem' }} 
                      value={eWinRate} 
                      onChange={e => setEWinRate(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '.72rem', color: 'var(--t3)', display: 'block', marginBottom: '6px' }}>Global Rank</label>
                    <input 
                      type="number" 
                      min="0" 
                      style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, .03)', border: '1px solid var(--bdr)', borderRadius: '8px', color: 'var(--t1)', fontSize: '.84rem' }} 
                      value={eRank} 
                      onChange={e => setERank(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '.72rem', color: 'var(--t3)', display: 'block', marginBottom: '6px' }}>K/D Ratio</label>
                    <input 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, .03)', border: '1px solid var(--bdr)', borderRadius: '8px', color: 'var(--t1)', fontSize: '.84rem' }} 
                      value={eKdRatio} 
                      onChange={e => setEKdRatio(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="gv-mft">
              <button className="gv-bgh" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="gv-bp" onClick={handleUpdate} disabled={eSaving}>{eSaving ? 'Saving...' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;