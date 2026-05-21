import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

// --- IMPORTS ---
import neonHorizonImg from '../assets/Games/neon-horizon-gallery.jpg';
import cyberRealmImg from '../assets/Games/cyber-realm-gallery.jpg';
import fantasyQuestImg from '../assets/Games/fantasy-quest-gallery.jpg';
import retroVibesImg from '../assets/Games/retro-vibes-gallery.jpg';
import stealthOpsImg from '../assets/Games/stealth-ops-gallery.avif';
import vrDimensionsImg from '../assets/Games/vr-dimensions-gallery.jpg';
import grandStageImg from '../assets/Games/grand-stage-gallery.jpg';
import dreamSetupImg from '../assets/Games/dream-setup-gallery.jpg';
import glitchModeImg from '../assets/Games/glitch-mode-gallery.jpg';
import pixelUniverseImg from '../assets/Games/pixel-universe-gallery.webp';
import speedRunImg from '../assets/Games/speed-run-gallery.jpg';
import futureTechImg from '../assets/Games/future-tech-gallery.webp';
import herosJourneyImg from '../assets/Games/heros-journey-gallery.jpg';
import neonDeskImg from '../assets/Games/neon-desk-gallery.jpg';
import mainEventImg from '../assets/Games/main-event-gallery.webp';

export const gallerySample = [
  { id: 1, title: "Neon Horizon", caption: "The ultimate battleground under city lights", src: neonHorizonImg, category: "Esports" },
  { id: 2, title: "Cyber Realm", caption: "Immersive digital worlds and futuristic landscapes", src: cyberRealmImg, category: "Concept Art" },
  { id: 3, title: "Fantasy Quest", caption: "Epic adventures through mystical lands", src: fantasyQuestImg, category: "Gameplay" },
  { id: 4, title: "Retro Vibes", caption: "Classic arcade aesthetics and synthwave dreams", src: retroVibesImg, category: "Fan Art" },
  { id: 5, title: "Stealth Ops", caption: "In the shadows: tactical gaming highlights", src: stealthOpsImg, category: "Gameplay" },
  { id: 6, title: "VR Dimensions", caption: "Next-gen hardware and virtual reality experiences", src: vrDimensionsImg, category: "Tech" },
  { id: 7, title: "Grand Stage", caption: "Where legends are made: tournament finals", src: grandStageImg, category: "Events" },
  { id: 8, title: "Dream Setup", caption: "The perfect gaming battlestation aesthetic", src: dreamSetupImg, category: "Setup" },
  { id: 9, title: "Glitch Mode", caption: "Digital distortion and high-octane matches", src: glitchModeImg, category: "Esports" },
  { id: 10, title: "Pixel Universe", caption: "A journey through 8-bit and 16-bit eras", src: pixelUniverseImg, category: "Concept Art" },
  { id: 11, title: "Speed Run", caption: "Fast-paced action and adrenaline rushes", src: speedRunImg, category: "Gameplay" },
  { id: 12, title: "Future Tech", caption: "Innovative gadgets defining tomorrow", src: futureTechImg, category: "Tech" },
  { id: 13, title: "Hero's Journey", caption: "Artistic interpretations of iconic characters", src: herosJourneyImg, category: "Fan Art" },
  { id: 14, title: "Neon Desk", caption: "Minimalist setups with RGB flair", src: neonDeskImg, category: "Setup" },
  { id: 15, title: "Main Event", caption: "The roar of the crowd and the lights of the stage", src: mainEventImg, category: "Events" }
];
 
// Modal Component
const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="g-modal-overlay" onClick={onClose}>
      <div className="g-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="g-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        
        <div className="g-modal-image-container">
          <img src={image.src} alt={image.title} className="g-modal-image" />
        </div>
        
        <div className="g-modal-details">
          <span className="g-modal-category">{image.category}</span>
          <h3 className="g-modal-title">{image.title}</h3>
          <p className="g-modal-caption">{image.caption}</p>
        </div>
      </div>
    </div>
  );
};

// Gallery Card Component
const GalleryCard = ({ image, onClick }) => (
  <div className="g-card" onClick={() => onClick(image)}>
    <div className="g-card-inner">
      <div className="g-card-front">
        <img src={image.src} alt={image.title} className="g-card-img" loading="lazy" />
        <div className="g-card-overlay">
          <div className="g-card-content">
            <span className="g-card-category">{image.category}</span>
            <h3 className="g-card-title">{image.title}</h3>
            <div className="g-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);

  // Filter Logic
  const filteredImages = activeFilter === 'All' 
    ? gallerySample 
    : gallerySample.filter(img => img.category === activeFilter);

  // Unique Categories for Buttons
  const categories = ['All', ...new Set(gallerySample.map(img => img.category))];

  useEffect(() => {
    setIsLoaded(true);
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [selectedImage]);

  return (
    <div className="gallery-page">
      {/* Background Layer */}
      <div className="g-bg-layer">
        <div className="g-bg-image"></div>
        <div className="g-bg-gradient"></div>
        <div className="g-grid-overlay"></div> {/* Added grid overlay */}
      </div>

      {/* Hero Section */}
      <section className={`g-hero ${isLoaded ? 'visible' : ''}`}>
        <div className="hero-content">
          <span className="hero-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"/>
            </svg>
            Visual Showcase
          </span>
          <h1 className="hero-title">
            Gaming <span className="gradient-text">Gallery</span>
          </h1>
          <p className="hero-subtitle">
            Explore premium game screenshots, fan art, and esports highlights
          </p>
        </div>
      </section>

      {/* Filter Bar Section - NEW! */}
      <section className="g-filter-section">
        <div className="filter-container">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="g-section">
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <GalleryCard 
              key={image.id} 
              image={image} 
              onClick={setSelectedImage} 
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="g-cta-section">
        <h3>Discover More</h3>
        <div className="cta-links">
          <Link to="/games" className="cta-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
            Browse Games
          </Link>
          <Link to="/tournaments" className="cta-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/></svg>
            View Tournaments
          </Link>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
};

export default Gallery;