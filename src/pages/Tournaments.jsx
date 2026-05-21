import React, { useState, useEffect } from 'react';
import api from '../api';
import './Tournaments.css';
import tournamentHeroBg from '../pages/bg-hero.jpg';

// --- IMPORTS (Your original imports) ---
import cardEsl from '../assets/Games/card-esl.jpg';
import cardVct from '../assets/Games/card-vct.jpg';
import cardVctMasters from '../assets/Games/card-vct-masters.jpg';
import cardBgmi from '../assets/Games/card-bgmi.jpg';
import cardIem from '../assets/Games/card-iem.jpg';
import cardFreefire from '../assets/Games/card-freefire.jpg';
import cardLol from '../assets/Games/card-lol.jpg';
import cardDota from '../assets/Games/card-dota.jpg';
import cardRl from '../assets/Games/card-rl.jpg';
import cardPokemon from '../assets/Games/pokemon-news.jpg';
import cardEfootball from '../assets/Games/card-efootball.jpg';
import cardBlast from '../assets/Games/card-blast.avif';

// EXTRA NEW TOURNAMENT CARDS
import cardFortnite from '../assets/Games/fortnite-home-trending.jpg';
import cardCod from '../assets/Games/game-cod.jpg';
import cardApex from '../assets/Games/game-apex.jpg';
import cardPubg from '../assets/Games/pubgpc-home-featured.jpg';
import cardMinecraft from '../assets/Games/game-minecraft.jpg';
import cardGta from '../assets/Games/game-gta.jpg';
import cardFifa from '../assets/Games/game-fifa.jpg';
import cardOverwatch from '../assets/Games/Overwatch2-home-trending.jpg';
import cardR6 from '../assets/Games/r6-home-featured.jpg';
import cardGenshin from '../assets/Games/genshin-home-featured.jpg';

// --- IMAGE MAP (Matches DB keys to imports) ---
const imageMap = {
  'cardEsl': cardEsl,
  'cardVct': cardVct,
  'cardVctMasters': cardVctMasters,
  'cardBgmi': cardBgmi,
  'cardIem': cardIem,
  'cardFreefire': cardFreefire,
  'cardLol': cardLol,
  'cardDota': cardDota,
  'cardRl': cardRl,
  'cardPokemon': cardPokemon,
  'cardEfootball': cardEfootball,
  'cardBlast': cardBlast,

  // EXTRA NEW TOURNAMENT CARDS
  'cardFortnite': cardFortnite,
  'cardCod': cardCod,
  'cardApex': cardApex,
  'cardPubg': cardPubg,
  'cardMinecraft': cardMinecraft,
  'cardGta': cardGta,
  'cardFifa': cardFifa,
  'cardOverwatch': cardOverwatch,
  'cardR6': cardR6,
  'cardGenshin': cardGenshin
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-IN', options);
};

// --- CARD COMPONENT ---
const TournamentCard = ({ tournament, onClick }) => {
  const bannerSrc = imageMap[tournament.banner] || tournament.banner;

  return (
    <div
      className={`t-card ${tournament.status === 'Live' ? 'live-glow' : ''}`}
      onClick={() => onClick(tournament)}
    >
      <div className="t-card-img-wrap">
        <img src={bannerSrc} alt={tournament.name} className="t-card-img" loading="lazy" />
        <div className="t-card-overlay"></div>

        <div className="t-card-top-bar">
          {tournament.status === 'Live' && <div className="status-tag live"><span className="dot-pulse"></span> LIVE</div>}
          {tournament.status === 'Upcoming' && <div className="status-tag upcoming">Upcoming</div>}
          {tournament.status === 'Completed' && <div className="status-tag completed">Completed</div>}
          <div className="region-tag">{tournament.region}</div>
        </div>

        <div className="prize-badge">
          <svg viewBox="0 0 24 24" fill="currentColor" className="icon-sm"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" /></svg>
          <span>{tournament.prizePool}</span>
        </div>
      </div>

      <div className="t-card-content">
        <span className="game-tag">{tournament.game}</span>
        <h3 className="t-card-title">{tournament.name}</h3>
        <div className="t-card-meta">
          <div className="meta-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-xs"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>
            <span>{formatDate(tournament.startDate)}</span>
          </div>
          <div className="meta-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-xs"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>{tournament.location.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MODAL COMPONENT ---
const TournamentModal = ({ tournament, onClose }) => {
  if (!tournament) return null;
  const bannerSrc = imageMap[tournament.banner] || tournament.banner;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-x" onClick={onClose}>×</button>
        <div className="modal-head">
          <img src={bannerSrc} alt={tournament.name} className="modal-img" />
          <div className="modal-head-gradient"></div>
          <div className="modal-head-info">
            <span className="mg-game">{tournament.game}</span>
            <h2 className="mg-title">{tournament.name}</h2>
          </div>
        </div>
        <div className="modal-body">
          <div className="m-stats">
            <div className="m-stat-box prize"><span className="ms-val">{tournament.prizePool}</span><span className="ms-lbl">Prize Pool</span></div>
            <div className="m-stat-box"><span className="ms-val">{formatDate(tournament.startDate)}</span><span className="ms-lbl">Start Date</span></div>
            <div className="m-stat-box"><span className="ms-val">{tournament.location}</span><span className="ms-lbl">Location</span></div>
            <div className="m-stat-box"><span className="ms-val">{tournament.format}</span><span className="ms-lbl">Format</span></div>
          </div>
          <p className="m-desc">{tournament.description}</p>
          {tournament.teams && tournament.teams.length > 0 && (
            <div className="m-teams">
              <h4>Featured Teams</h4>
              <div className="team-chips">
                {tournament.teams.map((t, i) => <span key={i} className="chip">{t}</span>)}
              </div>
            </div>
          )}
          <div className="m-actions">
            <a href={tournament.officialWebsite} target="_blank" rel="noreferrer" className="m-btn primary"
              onClick={() => {
                try {
                  const payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
                  const userId = payload?.user?._id || payload?.user?.id;
                  api.post('/profile/add-activity', { userId, action: `Viewed tournament: ${tournament.name}` }).catch(() => { });
                } catch (e) { }
              }}
            >Official Website</a>

            {tournament.streamLink && <a href={tournament.streamLink} target="_blank" rel="noreferrer" className="m-btn secondary">Watch Stream</a>}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
const Tournaments = () => {
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [visible, setVisible] = useState(false);
  const [tournaments, setTournaments] = useState([]);

  const handleTournamentClick = (tournament) => {
    setSelectedTournament(tournament);
    try {
      const payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
      const userId = payload?.user?._id || payload?.user?.id;
      if (userId) {
        api.post('/profile/add-activity', { userId, action: `Viewed tournament: ${tournament.name}` }).catch(() => {});
      }
    } catch (e) {}
  };

  // Fetch Data
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await api.get('/tournaments');
        setTournaments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTournaments();
  }, []);

  useEffect(() => { setVisible(true); }, []);

  const live = tournaments.filter(t => t.status === 'Live');
  const upcoming = tournaments.filter(t => t.status === 'Upcoming');
  const completed = tournaments.filter(t => t.status === 'Completed');

  return (
    <div className="t-page">

      <div className="t-bg-layer">
        <div className="t-bg-image"></div>
        <div className="t-bg-gradient"></div>
      </div>

      {/* Hero Section */}
      <section className={`t-hero ${visible ? 'vis' : ''}`}>
        <div className="hero-bg-img" style={{ backgroundImage: `url(${tournamentHeroBg})` }}></div>
        <div className="hero-bg-shade"></div>

        <div className="hero-inner">
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="currentColor" className="icon-sm"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            <span>Esports Calendar</span>
          </div>
          <h1 className="hero-title">Explore <span className="txt-grad">Tournaments</span></h1>
          <p className="hero-sub">Live brackets, major events, and global competitions.</p>
        </div>
      </section>

      {/* LIVE */}
      {live.length > 0 && (
        <section className="t-sec">
          <div className="sec-head"><h2 className="sec-title"><span className="dot-live"></span> Live Now</h2></div>
          <div className="t-grid h-scroll">
            {live.map(t => <TournamentCard key={t._id} tournament={t} onClick={handleTournamentClick} />)}
          </div>
        </section>
      )}

      {/* UPCOMING */}
      <section className="t-sec">
        <div className="sec-head"><h2 className="sec-title">Upcoming Events</h2></div>
        <div className="t-grid">
          {upcoming.map(t => <TournamentCard key={t._id} tournament={t} onClick={handleTournamentClick} />)}
        </div>
      </section>

      {/* COMPLETED */}
      {completed.length > 0 && (
        <section className="t-sec">
          <div className="sec-head"><h2 className="sec-title">Past Highlights</h2></div>
          <div className="t-grid">
            {completed.map(t => <TournamentCard key={t._id} tournament={t} onClick={handleTournamentClick} />)}
          </div>
        </section>
      )}

      {selectedTournament && <TournamentModal tournament={selectedTournament} onClose={() => setSelectedTournament(null)} />}
    </div>
  );
};

export default Tournaments;