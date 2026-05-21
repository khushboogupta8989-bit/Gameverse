import React, { useState, useEffect } from 'react';
import api from '../api'; // 1. Import API
import './Leaderboard.css';

// --- PLAYER MODAL ---
const PlayerModal = ({ player, onClose }) => {
  if (!player) return null;
  const socials = player.socials || {};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box player-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-x" onClick={onClose}>×</button>
        
        <div className="player-modal-header">
          <div className="player-avatar-lg">{player.name[0]}</div>
          <div className="player-title">
            <span className="rank-badge">Rank #{player.rank}</span>
            <h2>{player.name}</h2>
            <p className="real-name">{player.realName}</p>
            <div className="team-tag">{player.team} • {player.region}</div>
          </div>
        </div>

        <div className="player-stats-grid">
          <div className="stat-box"><span className="val">{player.score}</span><span className="lbl">Score</span></div>
          <div className="stat-box"><span className="val">{player.wins}</span><span className="lbl">Wins</span></div>
          <div className="stat-box"><span className="val">{player.kd}</span><span className="lbl">K/D</span></div>
          <div className="stat-box"><span className="val">{player.winRate}</span><span className="lbl">Win %</span></div>
        </div>

        <div className="player-info-section">
          <h3>Achievements</h3>
          <p>{player.achievements}</p>
        </div>

        {player.gameId && (
          <div className="player-info-section game-id-box">
            <span className="gid-label">Game ID</span>
            <span className="gid-val">{player.gameId}</span>
          </div>
        )}

        <div className="player-actions">
          {socials?.youtube && (
            <a href={socials.youtube} target="_blank" rel="noreferrer" className="social-btn yt">YouTube</a>
          )}
          {socials?.instagram && (
            <a href={socials.instagram} target="_blank" rel="noreferrer" className="social-btn ig">Instagram</a>
          )}
          {socials?.twitter && (
             <a href={socials.twitter} target="_blank" rel="noreferrer" className="social-btn tw">Twitter</a>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
const Leaderboard = () => {
  const [players, setPlayers] = useState([]); // State for Backend Data
  const [loading, setLoading] = useState(true);
  
  const [activeGame, setActiveGame] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    try {
      const payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
      const userId = payload?.user?._id || payload?.user?.id;
      if (userId) {
        api.post('/profile/add-activity', { userId, action: `Viewed player ranking: ${player.name}` }).catch(() => {});
      }
    } catch (e) {}
  };

  // 2. Fetch Data from Backend
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await api.get('/players'); // Calls http://localhost:5000/api/players
        setPlayers(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  const filteredData = players.filter(player => {
    const gameMatch = activeGame === "All" || player.game === activeGame;
    const regionMatch = activeRegion === "All" || player.region === activeRegion;
    return gameMatch && regionMatch;
  });

  return (
    <div className="leaderboard-page">
      <div className="lb-bg-layer">
        <div className="lb-bg-img"></div>
        <div className="lb-bg-gradient"></div>
      </div>

      <section className="lb-hero">
        <div className="hero-inner">
          <h1 className="lb-title">Top Players <span className="txt-grad">& Rankings</span></h1>
          <p className="lb-sub">Track the best players in India and worldwide.</p>
        </div>
      </section>

      <section className="lb-filters">
        <div className="filter-group">
          <span>Game:</span>
          <div className="filter-btns">
            {["All", "BGMI", "Valorant", "Free Fire", "CS2"].map(g => (
              <button key={g} className={`f-btn ${activeGame === g ? 'active' : ''}`} onClick={() => setActiveGame(g)}>{g}</button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span>Region:</span>
          <div className="filter-btns">
            {["All", "India", "Global"].map(r => (
              <button key={r} className={`f-btn ${activeRegion === r ? 'active' : ''}`} onClick={() => setActiveRegion(r)}>{r}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="lb-table-section">
        <div className="table-header">
          <span>Rank</span>
          <span>Player</span>
          <span>Game</span>
          <span>Score</span>
          <span>W/L</span>
          <span>Info</span>
        </div>

        <div className="table-body">
          {loading ? (
            <p style={{textAlign: 'center', color: '#fff', padding: '20px'}}>Loading players...</p>
          ) : (
            filteredData.map((player, index) => (
              <div 
                key={player._id} 
                className={`table-row ${index < 3 ? 'top-three' : ''}`}
                onClick={() => handlePlayerClick(player)}
              >
                <div className="col-rank">
                  {index < 3 ? (
                    <span className={`medal m${index + 1}`}>{index + 1}</span>
                  ) : (
                    <span className="rank-num">{index + 1}</span>
                  )}
                </div>
                <div className="col-player">
                  <div className="p-avatar">{player.name[0]}</div>
                  <div className="p-info">
                    <span className="p-name">{player.name}</span>
                    <span className="p-team">{player.team}</span>
                  </div>
                </div>
                <div className="col-game">
                  <span className="game-pill">{player.game}</span>
                </div>
                <div className="col-score">{player.score}</div>
                <div className="col-wl">{player.wins}W / {player.matches - player.wins}L</div>
                <div className="col-action">
                  <span className="arrow-btn">→</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {selectedPlayer && <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
    </div>
  );
};

export default Leaderboard;