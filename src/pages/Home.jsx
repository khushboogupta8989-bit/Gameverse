// Home.jsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import valorantImg from '../assets/Games/valorant-home-trending.jpg';
import apexImg from '../assets/Games/apex-home-trending.jpg';
import fortniteImg from '../assets/Games/fortnite-home-trending.jpg';
import RingImg from '../assets/Games/Elden-Ring-home-trending.jpg';
import leagueImg from '../assets/Games/League-of-Legends-home-trending.jpeg';
import CounterImg from '../assets/Games/Counter-strike-home-trending.webp';
import OverwatchImg from '../assets/Games/Overwatch2-home-trending.jpg';
import CallOfDutyImg from '../assets/Games/cod-home-trending.webp';
import valorantFeatured from '../assets/Games/valorant-home-featured.jpg';
import RingFeatured from '../assets/Games/ElDEN-RING-home-featured.webp';
import baldursFeatured from '../assets/Games/Baldurs-Gate3-home-featured.webp';
import cyberpunkFeatured from '../assets/Games/cyberpunk-city-home-featured.jpg';
import starfieldFeatured from '../assets/Games/starfield-home-featured.jpg';
import diabloFeatured from '../assets/Games/diablo-home-featured.jpeg';
import valoranttournament from '../assets/Games/valorant-home-tournament.jpg';
import evotournament from '../assets/Games/evo-home-tournament.jpg';
import loltournament from '../assets/Games/lol-home-touenament.jpg';
import grandchampionstournament from '../assets/Games/grandchampions-home-tournament.jpg';
import cs2tournament from '../assets/Games/cs2-home-tournament.jpg';
import valorantnews from '../assets/Games/valorant-home-news.webp';
import gtanews from '../assets/Games/gta-home-news.jpg';
import ps5news from '../assets/Games/ps5-home-news.jpg';
import switchnews from '../assets/Games/nintendo-home-news.jpg';
import Neongallery from '../assets/Games/Neon-Horizon-home-gallery.jpg';
import Cybergallery from '../assets/Games/Cyber-Realm-home-gallery.jpg';
import landscapegallery from '../assets/Games/landscape-home-gallery.webp';
import retrogallery from '../assets/Games/retro-home-gallery.webp';
import modegallery from '../assets/Games/mode-home-gallery.jpg';
import sportgallery from '../assets/Games/sport-home-gallery.jpg';
import fightgallery from '../assets/Games/fight-home-gallery.webp';
import opengallery from '../assets/Games/openworld-home-gallery.jpg';




import './Home.css';



// Real gaming data arrays (backend-ready structure)
const trendingGames = [
  { id: 1, name: "Valorant", genre: "Tactical Shooter", thumbnail: valorantImg, rating: 9.2 },
  { id: 2, name: "Apex Legends", genre: "Battle Royale", thumbnail: apexImg, rating: 8.9 },
  { id: 3, name: "Fortnite", genre: "Battle Royale", thumbnail: fortniteImg, rating: 8.7 },
  { id: 4, name: "Elden Ring", genre: "Action RPG", thumbnail: RingImg, rating: 9.5 },
  { id: 5, name: "League of Legends", genre: "MOBA", thumbnail: leagueImg, rating: 9.0 },
  { id: 6, name: "Counter-Strike 2", genre: "Tactical Shooter", thumbnail: CounterImg, rating: 9.3 },
  { id: 7, name: "Overwatch 2", genre: "Hero Shooter", thumbnail: OverwatchImg, rating: 8.4 },
  { id: 8, name: "Call of Duty: Warzone", genre: "Battle Royale", thumbnail: CallOfDutyImg, rating: 8.6 }
];

const featuredGames = [
  { id: 1, name: "Valorant", genre: "Tactical Shooter", thumbnail: valorantFeatured, description: "5v5 character-based tactical shooter where precise gunplay meets unique agent abilities.", rating: 9.2 },
  { id: 2, name: "Elden Ring", genre: "Action RPG", thumbnail: RingFeatured, description: "FromSoftware's magnum opus - an open-world action RPG set in a dark fantasy universe.", rating: 9.5 },
  { id: 3, name: "Baldur's Gate 3", genre: "CRPG", thumbnail: baldursFeatured, description: "Award-winning RPG with deep storytelling, tactical combat, and meaningful choices.", rating: 9.7 },
  { id: 4, name: "Cyberpunk 2077", genre: "Action RPG", thumbnail: cyberpunkFeatured, description: "Open-world action-adventure set in Night City, a megalopolis obsessed with power and body modifications.", rating: 8.8 },
  { id: 5, name: "Starfield", genre: "Space RPG", thumbnail: starfieldFeatured, description: "Bethesda's epic space exploration RPG with over 1000 planets to discover.", rating: 8.2 },
  { id: 6, name: "Diablo IV", genre: "Action RPG", thumbnail: diabloFeatured, description: "Blizzard's dark action RPG returns with an open world and endless demon-slaying.", rating: 8.5 }
];

const upcomingTournaments = [
  { id: 1, name: "Valorant Champions Tour 2025", game: "Valorant", date: "Mar 15-30, 2025", location: "Los Angeles, USA", banner: valoranttournament },
  { id: 2, name: "EVO Japan 2025", game: "Fighting Games", date: "Apr 5-7, 2025", location: "Tokyo, Japan", banner:evotournament  },
  { id: 3, name: "League of Legends Worlds 2025", game: "League of Legends", date: "Oct 1-19, 2025", location: "Seoul, South Korea", banner: loltournament },
  { id: 4, name: "The International 2025", game: "Dota 2", date: "Aug 20-25, 2025", location: "Seattle, USA", banner: grandchampionstournament },
  { id: 5, name: "CS2 Major Copenhagen", game: "Counter-Strike 2", date: "May 10-25, 2025", location: "Copenhagen, Denmark", banner: cs2tournament }
];

// Add 'content' to your objects
const latestNews = [
  { 
    id: 1, 
    title: "Valorant Episode 9 Act 1 Introduces New Agent and Map Reworks", 
    excerpt: "Riot Games unveils major changes coming to Valorant with the latest episode update...", 
    content: "Riot Games has officially unveiled Episode 9 Act 1, bringing significant changes to the tactical shooter. The update introduces a new Thai agent with unique reconnaissance abilities and a complete rework of the map 'Haven'. Players can expect balance changes to operatives like Jett and Chamber, alongside a brand new Battle Pass featuring cyberpunk-themed skins.", 
    date: "Jan 15, 2025", 
    source: "IGN", 
    thumbnail: valorantnews 
  },
  { 
    id: 2, 
    title: "GTA 6 Release Window Confirmed for Fall 2025", 
    excerpt: "Rockstar Games officially announces the highly anticipated Grand Theft Auto 6 release timeframe...", 
    content: "Rockstar Games has confirmed that Grand Theft Auto VI is targeting a Fall 2025 release. Set in a modern-day Vice City, the game will feature two protagonists, Lucia and Jason, in a story inspired by Bonnie and Clyde. The game promises to be the most immersive open world ever created by Rockstar, leveraging next-gen console hardware for realistic physics and graphics.",
    date: "Jan 14, 2025", 
    source: "GameSpot", 
    thumbnail: gtanews 
  },
  { 
    id: 3, 
    title: "PlayStation Reveals PS5 Pro Enhanced Games Lineup", 
    excerpt: "Sony showcases over 50 games optimized for the PS5 Pro's advanced hardware...", 
    content: "Sony Interactive Entertainment has released a list of over 50 games that will receive specific enhancements for the PS5 Pro. Titles like Marvel's Spider-Man 2 and Gran Turismo 7 will feature advanced ray tracing modes and higher resolution targets. The new console aims to bridge the gap between performance and visual fidelity.",
    date: "Jan 13, 2025", 
    source: "Polygon", 
    thumbnail: ps5news 
  },
  { 
    id: 4, 
    title: "Nintendo Switch 2 Backwards Compatibility Detailed", 
    excerpt: "Nintendo confirms extensive backwards compatibility features for the upcoming Switch successor...", 
    content: "Nintendo has confirmed that the successor to the Switch will support backwards compatibility for physical and digital games. The company aims to ensure a smooth transition for its massive user base. While hardware specs remain unconfirmed, the focus is clearly on maintaining the ecosystem players have invested in over the last 7 years.",
    date: "Jan 12, 2025", 
    source: "Kotaku", 
    thumbnail: switchnews 
  }
];

const galleryImages = [
  { id: 1, image: Neongallery, altText: "Neon Horizon", link: "/gallery" },
  { id: 2, image: Cybergallery, altText: "Cyber Realm", link: "/gallery" },
  { id: 3, image: landscapegallery, altText: "Fantasy Quest", link: "/gallery" },
  { id: 4, image: retrogallery, altText: "Retro Vibes", link: "/gallery" },
  { id: 5, image: modegallery, altText: "Stealth Mode", link: "/gallery" },
  { id: 6, image: sportgallery, altText: "Speed Run", link: "/gallery" },
  { id: 7, image: fightgallery, altText: "Boss Fight", link: "/gallery" },
  { id: 8, image: opengallery, altText: "Open World", link: "/gallery" }
];

const communityHighlights = [
  { id: 1, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", title: "My attempt at building a working Valorant spike replica", likes: 2847, comments: 342 },
  { id: 2, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop", title: "Complete tier list for every agent in the current meta", likes: 4521, comments: 891 },
  { id: 3, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop", title: "Speedrun strat: How I beat Elden Ring in under 30 minutes", likes: 3156, comments: 234 },
  { id: 4, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", title: "Ultimate guide to improving your aim in FPS games", likes: 5892, comments: 1023 },
  { id: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", title: "Building my dream gaming setup - full breakdown inside", likes: 2103, comments: 187 },
  { id: 6, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", title: "Analysis: Why this pro player's crosshair is so effective", likes: 3789, comments: 456 }
];

// Scroll animation hook
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: '0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Fallback: cards stay invisible (opacity: 0) if observer never fires (common on deployed sites)
    const fallback = setTimeout(() => setIsVisible(true), 600);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return [ref, isVisible];
};

// Card components
const TrendingCard = ({ game, index }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`trending-card ${isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="trending-card-image">
        <img src={game.thumbnail} alt={game.name} loading="lazy" />
        <div className="trending-card-overlay"></div>
      </div>
      <div className="trending-card-content">
        <h3 className="trending-card-title">{game.name}</h3>
        <span className="trending-card-genre">{game.genre}</span>
        <div className="trending-card-rating">
          <svg className="star-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span>{game.rating}</span>
        </div>
      </div>
    </div>
  );
};

const FeaturedCard = ({ game, index }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`featured-card ${isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="featured-card-image">
        <img src={game.thumbnail} alt={game.name} loading="lazy" />
        <div className="featured-card-overlay"></div>
      </div>
      <div className="featured-card-content">
        <div className="featured-card-header">
          <h3 className="featured-card-title">{game.name}</h3>
          <span className="featured-card-genre">{game.genre}</span>
        </div>
        <p className="featured-card-description">{game.description}</p>
        <div className="featured-card-footer">
          <div className="featured-card-rating">
            <svg className="star-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>{game.rating}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TournamentCard = ({ tournament, index }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`tournament-card ${isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="tournament-card-banner">
        <img src={tournament.banner} alt={tournament.name} loading="lazy" />
        <div className="tournament-card-overlay"></div>
      </div>
      <div className="tournament-card-content">
        <span className="tournament-card-game">{tournament.game}</span>
        <h3 className="tournament-card-title">{tournament.name}</h3>
        <div className="tournament-card-details">
          <div className="tournament-detail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{tournament.date}</span>
          </div>
          <div className="tournament-detail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{tournament.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsCard = ({ news, index, onClick }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`news-card ${isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
      onClick={() => onClick(news)} // Add this
    >
      <div className="news-card-image">
        <img src={news.thumbnail} alt={news.title} loading="lazy" />
        <div className="news-card-overlay"></div>
      </div>
      <div className="news-card-content">
        <div className="news-card-meta">
          <span className="news-card-source">{news.source}</span>
          <span className="news-card-date">{news.date}</span>
        </div>
        <h3 className="news-card-title">{news.title}</h3>
        <p className="news-card-excerpt">{news.excerpt}</p>
      </div>
    </div>
  );
};

const CommunityCard = ({ post, index }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div 
      ref={ref}
      className={`community-card ${isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="community-card-header">
        <img src={post.avatar} alt="User" className="community-avatar" />
        {/* Added a wrapper for title to sit nicely next to avatar */}
        <div className="community-title-wrapper">
          <h3 className="community-card-title">{post.title}</h3>
          {/* Added username and category here */}
          <div className="community-meta">
            <span className="community-username">{post.username}</span>
            <span className="community-category-badge">{post.category}</span>
          </div>
        </div>
      </div>
      
      <div className="community-card-stats">
        <div className="community-stat">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>{post.likes.toLocaleString()}</span>
        </div>
        <div className="community-stat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>{post.comments}</span>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const scrollToTrending = () => {
    const nextSection = document.getElementById('trending');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [selectedNews, setSelectedNews] = useState(null);
  const trendingScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkScrollButtons = (container) => {
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scrollTrending = (direction) => {
    const container = trendingScrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = trendingScrollRef.current;
    if (container) {
      container.addEventListener('scroll', () => checkScrollButtons(container));
      checkScrollButtons(container);
    }
  }, []);

  return (
    <div className="home-page">
      {/* Background layers */}
      <div className="home-bg-layer">
        <div className="home-bg-image"></div>
        <div className="home-bg-gradient"></div>
        <div className="home-bg-noise"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-bg-image" style={{ transform: `translateY(${scrollY * 0.3}px)` }}></div>
        <div className="hero-gradient"></div>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-badges">
            <span className="hero-badge">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              #1 Gaming Hub
            </span>
            <span className="hero-badge">50K+ Active Members</span>
          </div>
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">GameVerse</span>
          </h1>
          <p className="hero-subtitle">Your Ultimate Gaming Hub</p>
          <p className="hero-description">
            Explore Games, Tournaments, News & Community — All in One Place
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">500+</span>
              <span className="hero-stat-label">Games</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number">120+</span>
              <span className="hero-stat-label">Tournaments</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number">10K+</span>
              <span className="hero-stat-label">Community</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator" onClick={scrollToTrending} style={{ cursor: 'pointer' }}>
          <div className="scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="7 13 12 18 17 13"></polyline>
              <polyline points="7 6 12 11 17 6"></polyline>
            </svg>
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="section trending-section" id="trending">
        <div className="section-container">
          <div className="section-header">
            {/* Left Group */}
            <div className="header-content">
              <h2 className="section-title">
                <span className="title-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                  </svg>
                </span>
                Trending Now
              </h2>
              <div className="section-underline"></div>
            </div>
            {/* Right Button */}
            <Link to="/games" className="view-more-btn">
              View More
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
          
          <div className="trending-wrapper">
            <button 
              className={`scroll-btn scroll-btn-left ${canScrollLeft ? 'visible' : ''}`}
              onClick={() => scrollTrending('left')}
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div className="trending-scroll" ref={trendingScrollRef}>
              {trendingGames.map((game, index) => (
                <TrendingCard key={game.id} game={game} index={index} />
              ))}
            </div>
            
            <button 
              className={`scroll-btn scroll-btn-right ${canScrollRight ? 'visible' : ''}`}
              onClick={() => scrollTrending('right')}
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="section featured-section">
        <div className="section-container">
          <div className="section-header">
            {/* Left Group */}
            <div className="header-content">
              <h2 className="section-title">
                <span className="title-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                  </svg>
                </span>
                Featured Games
              </h2>
              <div className="section-underline"></div>
              <p className="section-description">Discover the most acclaimed titles dominating the gaming landscape</p>
            </div>
            {/* Right Button */}
            <Link to="/games" className="view-more-btn">
              View More
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
          
          <div className="featured-grid">
            {featuredGames.map((game, index) => (
              <FeaturedCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments Section */}
      <section className="section tournaments-section">
        <div className="section-container">
          <div className="section-header">
            {/* Left Group */}
            <div className="header-content">
              <h2 className="section-title">
                <span className="title-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
                  </svg>
                </span>
                Upcoming Tournaments
              </h2>
              <div className="section-underline"></div>
              <p className="section-description">The biggest esports events you won't want to miss</p>
            </div>
            {/* Right Button */}
            <Link to="/tournaments" className="view-more-btn">
              View More
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
          
          <div className="tournaments-grid">
            {upcomingTournaments.map((tournament, index) => (
              <TournamentCard key={tournament.id} tournament={tournament} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="section news-section">
        <div className="section-container">
          <div className="section-header">
            {/* Left Group */}
            <div className="header-content">
              <h2 className="section-title">
                <span className="title-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </span>
                Latest News
              </h2>
              <div className="section-underline"></div>
              <p className="section-description">Stay updated with the latest from the gaming world</p>
            </div>
            {/* Right Button */}
            <Link to="/blog" className="view-more-btn">
              View More
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
          
    <div className="news-grid">
      {latestNews.map((news, index) => (
        <NewsCard 
          key={news.id} 
          news={news} 
          index={index} 
          onClick={setSelectedNews} // Pass the function here
        />
      ))}
    </div>
  </div>

  {/* THE MODAL POPUP */}
  {selectedNews && (
    <div className="news-modal-overlay" onClick={() => setSelectedNews(null)}>
      <div className="news-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setSelectedNews(null)}>×</button>
        
        <div className="modal-image-wrapper">
          <img src={selectedNews.thumbnail} alt={selectedNews.title} />
        </div>
        
        <div className="modal-text">
          <span className="modal-source">{selectedNews.source}</span>
          <h2 className="modal-title">{selectedNews.title}</h2>
          <p className="modal-date">{selectedNews.date}</p>
          <p className="modal-body">{selectedNews.content}</p>
        </div>
      </div>
    </div>
  )}
</section>

      {/* Gallery Marquee Section */}
      <section className="section gallery-section">
        <div className="section-container">
          {/* Removed 'centered' class to allow button alignment */}
          <div className="section-header">
            {/* Left Group */}
            <div className="header-content">
              <h2 className="section-title">
                <span className="title-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/>
                  </svg>
                </span>
                Gallery Highlights
              </h2>
              <div className="section-underline"></div>
            </div>
            {/* Right Button */}
            <Link to="/gallery" className="view-more-btn">
              View More
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="gallery-marquee-wrapper">
          <div className="gallery-marquee">
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <Link to={image.link} key={`${image.id}-${index}`} className="gallery-marquee-item">
                <img src={image.image} alt={image.altText} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span>{image.altText}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community Highlights Section */}
      <section className="section community-section">
        <div className="section-container">
          <div className="section-header">
            {/* Left Group */}
            <div className="header-content">
              <h2 className="section-title">
                <span className="title-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </span>
                Community Highlights
              </h2>
              <div className="section-underline"></div>
              <p className="section-description">Top posts and discussions from our gaming community</p>
            </div>
            {/* Right Button */}
            <Link to="/community" className="view-more-btn">
              View More
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
          
          <div className="community-grid">
            {communityHighlights.map((post, index) => (
              <CommunityCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="cta-bg"></div>
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to <span className="gradient-text">Level Up</span> Your Gaming Experience?
          </h2>
          <p className="cta-description">
            Join tournaments, explore games, and be part of the ultimate gaming community.
          </p>
          <div className="cta-buttons">
            <Link to="/games" className="cta-button primary">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
              Browse Games
            </Link>
            <Link to="/tournaments" className="cta-button secondary">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/>
              </svg>
              View Tournaments
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;