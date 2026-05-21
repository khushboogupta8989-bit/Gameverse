import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Games.css';

// --- 1. IMPORT YOUR LOCAL IMAGES ---
import gameBGMI from '../assets/Games/game-bGMI.jpg';
import gameValorant from '../assets/Games/game-valorant.jpeg';
import gameFreeFire from '../assets/Games/game-freefire.jpg';
import gameCOD from '../assets/Games/game-cod.jpg';
import gameCOC from '../assets/Games/game-coc.jpg';
import gameLOL from '../assets/Games/game-lol.webp';
import gameMinecraft from '../assets/Games/game-minecraft.jpg';
import gameGTA from '../assets/Games/game-gta.jpg';
import gameApex from '../assets/Games/game-apex.jpg';
import gameEFootball from '../assets/Games/game-efootball.jpg';
import gameClashRoyale from '../assets/Games/game-clashroyale.jpg';
import gameFIFA from '../assets/Games/game-fifa.jpg';
import Ringimg from '../assets/Games/ElDEN-RING-home-featured.webp';
import baldursimg from '../assets/Games/Baldurs-Gate3-home-featured.webp';
import cyberpunkimg from '../assets/Games/cyberpunk-city-home-featured.jpg';
import starfieldimg from '../assets/Games/starfield-home-featured.jpg';
import diabloimg from '../assets/Games/diablo-home-featured.jpeg';
import Counterimg from '../assets/Games/Counter-strike-home-trending.webp';
import Overwatchimg from '../assets/Games/Overwatch2-home-trending.jpg';
import CallOfDutyimg from '../assets/Games/warzons.webp';
import fortniteimg from '../assets/Games/fortnite-home-trending.jpg';
import gameRDR2 from '../assets/Games/rdr2-home-featured.jpg';
import gameRocketLeague from '../assets/Games/rocketleague-home-featured.jpg';
import gameDota2 from '../assets/Games/dota2-home-featured.jpg';
import gamePUBGPC from '../assets/Games/pubgpc-home-featured.jpg';
import gameR6 from '../assets/Games/r6-home-featured.jpg';
import gameGenshin from '../assets/Games/genshin-home-featured.jpg';
import gameWitcher3 from '../assets/Games/witcher3-home-featured.jpg';

// --- 2. MAP KEYS TO IMAGES ---
// The keys here must match exactly what you put in the database seed (imageKey)
const imageMap = {
  'bgmi': gameBGMI,
  'valorant': gameValorant,
  'freefire': gameFreeFire,
  'cod': gameCOD,
  'coc': gameCOC,
  'lol': gameLOL,
  'minecraft': gameMinecraft,
  'gta': gameGTA,
  'apex': gameApex,
  'efootball': gameEFootball,
  'clashroyale': gameClashRoyale,
  'fifa': gameFIFA,
  'baldurs': baldursimg,
  'Ring': Ringimg,
  'cyberpunk': cyberpunkimg,
  'starfield': starfieldimg,
  'diablo': diabloimg,
  'Counter': Counterimg,
  'Overwatch': Overwatchimg,
  'cod2': CallOfDutyimg,
  'fortnite' : fortniteimg,
  'rdr2': gameRDR2,
  'rocketleague': gameRocketLeague,
  'dota2': gameDota2,
  'pubgpc': gamePUBGPC,
  'r6': gameR6,
  'genshin': gameGenshin,
  'witcher3': gameWitcher3

};

const genres = ["All", "Battle Royale", "FPS", "MOBA", "Strategy", "Sports", "Sandbox", "Action-Adventure"];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`star ${index < fullStars ? 'full' : index === fullStars && hasHalfStar ? 'half' : 'empty'}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="rating-value">{rating}</span>
    </div>
  );
};

const GameCard = ({ game, onClick }) => {
  // --- 3. USE THE MAP TO GET IMAGE ---
  // If imageKey doesn't exist, fallback to a default or empty string
  const thumbnailSrc = imageMap[game.imageKey] || game.thumbnail;

  return (
    <div
      className="game-card"
      onClick={() => onClick(game)}
      tabIndex={0}
    >
      <div className="card-image-container">
        <img
          src={thumbnailSrc}
          alt={game.name}
          className="card-image loaded"
        />
        <div className="card-gradient-overlay"></div>
        <div className="card-genre-tag">{game.genre}</div>
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{game.name}</h3>
          <div className="card-platforms">
            {game.platforms.slice(0, 2).map((platform, idx) => (
              <span key={idx} className="platform-badge">{platform}</span>
            ))}
            {game.platforms.length > 2 && (
              <span className="platform-badge more">+{game.platforms.length - 2}</span>
            )}
          </div>
        </div>

        <div className="card-meta">
          <StarRating rating={game.rating} />
          <div className="popularity-bar">
            <div className="popularity-fill" style={{ width: `${game.popularity}%` }}></div>
            <span className="popularity-text">{game.popularity}% popular</span>
          </div>
        </div>

        <div className="card-footer">
          <span className="card-year">{game.releaseYear}</span>
          <span className="card-developer">{game.developer}</span>
        </div>

        <div className="card-cta">
          <span className="view-details-text">View Details</span>
          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <div className="card-glow"></div>
    </div>
  );
};

// Modal Component
const GameModal = ({ game, onClose }) => {
  if (!game) return null;

  const thumbnailSrc = imageMap[game.imageKey] || game.thumbnail;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-header">
          <img src={thumbnailSrc} alt={game.name} className="modal-thumbnail" />
          <div className="modal-header-overlay"></div>
          <div className="modal-header-content">
            <span className="modal-genre">{game.genre}</span>
            <h2 id="modal-title" className="modal-title">{game.fullName}</h2>
            <div className="modal-meta-badges">
              {game.platforms.map((platform, idx) => (
                <span key={idx} className="modal-platform-badge">{platform}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">{game.rating}</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">{game.playerBase}</span>
                <span className="stat-label">Players</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">{game.popularity}%</span>
                <span className="stat-label">Popularity</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">About</h3>
            <p className="modal-description">{game.description}</p>
          </div>

          <div className="modal-details-grid">
            <div className="detail-item">
              <span className="detail-label">Developer</span>
              <span className="detail-value">{game.developer}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Publisher</span>
              <span className="detail-value">{game.publisher}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Release Year</span>
              <span className="detail-value">{game.releaseYear}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Platforms</span>
              <span className="detail-value">{game.platforms.join(', ')}</span>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" />
              </svg>
              Esports in India
            </h3>
            <p className="modal-esports">{game.esports}</p>
          </div>

          <div className="modal-footer">
            <div className="player-base-info">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>{game.playerBase} in India</span>
            </div>
            <a
              href={game.officialSite}
              target="_blank"
              rel="noopener noreferrer"
              className="official-site-btn"
              onClick={() => {
                try {
                  const payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
                  const userId = payload?.user?._id || payload?.user?.id;

                  // Smart extractor: checks all possible image variable names you might be using
                  const img = game.image || game.cardImage || game.cover || game.thumbnail || "";
                  // Only saves it if it's a valid text string (not an empty import object)
                  const validImg = (typeof img === 'string' && img.trim() !== "" && !img.includes('object')) ? img : "";

                  api.post('/profile/add-game', {
                    userId: userId,
                    name: game.title || game.name || 'Game',
                    image: validImg,
                    link: game.officialSite
                  }).catch(() => { });
                } catch (e) { }
              }}
            >
              Visit Official Site
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

const FilterButton = ({ genre, isActive, onClick }) => (
  <button
    className={`filter-btn ${isActive ? 'active' : ''}`}
    onClick={() => onClick(genre)}
    aria-pressed={isActive}
  >
    {genre}
    {isActive && <span className="filter-glow"></span>}
  </button>
);

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);

  // --- STATE FOR GAMES ---
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH GAMES FROM BACKEND ---
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await api.get('/games');
        setGames(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch games", err);
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    setIsVisible(true);

    if (selectedGame) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedGame]);

  const filteredGames = activeFilter === "All"
    ? games
    : games.filter(game => game.genre === activeFilter);

  const openModal = (game) => setSelectedGame(game);
  const closeModal = () => setSelectedGame(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="games-page">
      {/* Background Layers */}
      <div className="games-bg-layer">
        <div className="games-bg-image"></div>
        <div className="games-bg-gradient"></div>
        <div className="games-bg-mesh"></div>
      </div>

      {/* Hero Section */}
      <section className="games-hero">
        <div className="hero-bg-image"></div>
        <div className="hero-gradient"></div>

        <div className={`hero-content ${isVisible ? 'visible' : ''}`}>

          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span>India's Gaming Hub</span>
          </div>

          <h1 className="hero-title">
            Explore <span className="gradient-text">Top Games</span> in India
          </h1>

          <p className="hero-subtitle">
            Discover trending titles, stats, and updates popular among Indian gamers
          </p>

        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-container">
          <div className="filter-header">
            <h2 className="filter-title">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
              </svg>
              Filter by Genre
            </h2>
          </div>
          <div className="filter-buttons">
            {genres.map((genre) => (
              <FilterButton
                key={genre}
                genre={genre}
                isActive={activeFilter === genre}
                onClick={setActiveFilter}
              />
            ))}
          </div>
          <div className="results-count">
            Showing <span className="count-number">{filteredGames.length}</span> games
            {activeFilter !== "All" && <span className="count-filter"> in {activeFilter}</span>}
          </div>
        </div>
      </section>

      {/* Games Grid Section */}
      <section className="games-grid-section">
        <div className="grid-container">
          <div className="grid-header">
            <h2 className="grid-title">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
              Popular Games in India
            </h2>
            <div className="grid-underline"></div>
          </div>

          {/* LOADING STATE */}
          {loading ? (
            <div className="no-results"><p>Loading games...</p></div>
          ) : (
            <div className="games-grid">
              {filteredGames.map((game, index) => (
                <GameCard
                  key={game._id} // Use MongoDB _id
                  game={game}
                  onClick={openModal}
                />
              ))}
            </div>
          )}

          {filteredGames.length === 0 && !loading && (
            <div className="no-results">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <p>No games found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="games-cta-section">
        <div className="cta-bg-image"></div>
        <div className="cta-gradient"></div>
        <div className="cta-content">
          <h2 className="cta-title">
            Want to <span className="gradient-text">Compete</span>?
          </h2>
          <p className="cta-description">
            Join tournaments, connect with gamers, and showcase your skills on India's biggest gaming platform.
          </p>
          <div className="cta-buttons">
            <Link to="/tournaments" className="cta-btn primary">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" />
              </svg>
              View Tournaments
            </Link>
            <Link to="/community" className="cta-btn secondary">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Game Detail Modal */}
      {selectedGame && <GameModal game={selectedGame} onClose={closeModal} />}
    </div>
  );
};

export default Games;