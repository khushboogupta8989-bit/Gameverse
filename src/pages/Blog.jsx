import React, { useState, useEffect } from 'react';
import api from '../api';
import { getAuthItem } from '../authStorage'; 
import './Blog.css';

// --- IMPORTS ---
import newsValorant from '../assets/Games/valorant-home-news.webp';
import newsbgmi from '../assets/Games/game-bGMI.jpg';
import newsgta from '../assets/Games/gta-home-news.jpg';
import newsmobile from '../assets/Games/mobile-blog.avif';
import newsrtx from '../assets/Games/rtx-news.jpg';
import newsff from '../assets/Games/freefire-news.jpg';
import newscs2 from '../assets/Games/lol-home-touenament.jpg';
import newspokemon from '../assets/Games/pokemon-news.jpg';
import newsnintendo from '../assets/Games/nintendo-home-news.jpg';
import newsapex from '../assets/Games/apex-home-featured.jpg';

// --- IMAGE MAP (kept for backward compatibility with old articles) ---
const imageMap = {
  'newsValorant': newsValorant,
  'newsbgmi': newsbgmi,
  'newsgta': newsgta,
  'newsmobile': newsmobile,
  'newsrtx': newsrtx,
  'newsff': newsff,
  'newscs2': newscs2,
  'newspokemon': newspokemon,
  'newsnintendo': newsnintendo,
  'newsapex': newsapex
};

// --- GET LOGGED IN USER ---
const getUser = () => {
  try {
    const user = JSON.parse(getAuthItem('user'));
    return user || null;
  } catch {
    return null;
  }
};

// --- WRITE MODAL ---
const WriteModal = ({ onClose, onArticleAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Esports',
    image: '',
    content: '',
    snippet: '',
    readTime: '5 min'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthItem('token');
    
    if (!token) {
      alert("Please login to publish articles!");
      return;
    }

    try {
      await api.post('/articles', formData, {
        headers: { 'x-auth-token': token }
      });
      alert("Article Published Successfully!");
      onArticleAdded();
    } catch (err) {
      console.error("Error creating article", err.response?.data || err.message);
      alert("Failed to publish. Check console for details.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box write-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-x" onClick={onClose}>×</button>
        <div className="write-header">
          <h2>Create New Article</h2>
        </div>
        <form className="write-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Article Title</label>
            <input type="text" name="title" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" onChange={handleChange}>
                <option>Esports</option>
                <option>News</option>
                <option>Updates</option>
                <option>Hardware</option>
              </select>
            </div>
            <div className="form-group">
              <label>Read Time</label>
              <input type="text" name="readTime" onChange={handleChange} placeholder="5 min" />
            </div>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input 
              type="url" 
              name="image" 
              onChange={handleChange} 
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="form-group">
            <label>Snippet</label>
            <input type="text" name="snippet" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea name="content" rows="6" onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="submit-btn">Publish</button>
        </form>
      </div>
    </div>
  );
};

// --- READ MODAL ---
const ReadModal = ({ article, onClose, user, onDelete }) => {
  if (!article) return null;
  const imgSrc = article.image || imageMap[article.imageKey];

  const isAdmin = user && user.role === 'Admin';
  const isAuthor = user && (user.id === article.authorId || user.username === article.author);
  const canDelete = isAdmin || isAuthor;

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        const token = getAuthItem('token');
        await api.delete(`/articles/${article._id}`, {
          headers: { 'x-auth-token': token }
        });
        onDelete(article._id);
        onClose(); // Close modal after delete
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete article');
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box read-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-x" onClick={onClose}>×</button>
        
        {canDelete && (
          <button className="modal-delete-btn" onClick={handleDelete} title="Delete article">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        )}

        <div className="modal-head">
          <img src={imgSrc} alt={article.title} className="modal-img" />
          <div className="modal-head-gradient"></div>
          <div className="modal-head-info">
            <span className="modal-category-tag">{article.category}</span>
            <h2 className="modal-main-title">{article.title}</h2>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-meta-bar">
            <div className="author-info">
              <div className="author-avatar">{article.author?.[0] || 'A'}</div>
              <div>
                <strong>{article.author || 'Admin'}</strong>
              </div>
            </div>
            <div className="meta-stats">
              <span>{new Date(article.date).toLocaleDateString()}</span>
              <span>{article.readTime} read</span>
            </div>
          </div>
          <div className="article-content">
            <p>{article.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CARD ---
const ArticleCard = ({ article, onClick }) => {
  const imgSrc = article.image || imageMap[article.imageKey];

  return (
    <div className="blog-card" onClick={() => onClick(article)}>
      <div className="blog-card-img-wrap">
        <img src={imgSrc} alt={article.title} className="blog-card-img" />
        <span className="blog-category">{article.category}</span>
      </div>
      <div className="blog-card-content">
        <div className="blog-meta">
          <span>{new Date(article.date).toLocaleDateString()}</span>
          <span className="dot-sep">•</span>
          <span>{article.readTime}</span>
        </div>
        <h3 className="blog-title">{article.title}</h3>
        <p className="blog-snippet">{article.snippet}</p>
        <div className="blog-footer">
          <div className="blog-author">
            <div className="author-avatar">{article.author?.[0] || 'A'}</div>
            <span>{article.author || 'Admin'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isWriting, setIsWriting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/articles');
        setArticles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticles();
  }, [isWriting]);

  useEffect(() => { setVisible(true); }, []);

  const handleDelete = (articleId) => {
    setArticles(articles.filter(a => a._id !== articleId));
  };

  const filteredArticles = articles.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="blog-page">
      <div className="blog-bg-layer">
        <div className="blog-bg-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80')" }}></div>
        <div className="blog-bg-gradient"></div>
      </div>

      <section className={`blog-hero ${visible ? 'vis' : ''}`}>
        <div className="hero-inner">
          <span className="hero-badge">📰 Latest Updates</span>
          <h1 className="hero-title">Gaming <span className="txt-grad">News & Articles</span></h1>
        </div>
      </section>

      <section className="blog-sec">
        <div className="blog-actions-bar">
          <div className="filter-tabs">
            <button className={`tab ${activeCategory === "All" ? "active" : ""}`} onClick={() => setActiveCategory("All")}>All</button>
            <button className={`tab ${activeCategory === "News" ? "active" : ""}`} onClick={() => setActiveCategory("News")}>News</button>
            <button className={`tab ${activeCategory === "Esports" ? "active" : ""}`} onClick={() => setActiveCategory("Esports")}>Esports</button>
          </div>
          <button className="write-btn" onClick={() => setIsWriting(true)}>Write Article</button>
        </div>

        <div className="blog-grid">
          {filteredArticles.map((item) => (
            <ArticleCard 
              key={item._id} 
              article={item} 
              onClick={setSelectedArticle}
            />
          ))}
        </div>
      </section>

      {isWriting && <WriteModal onClose={() => setIsWriting(false)} onArticleAdded={() => setIsWriting(false)} />}
      {selectedArticle && (
        <ReadModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
          user={user}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Blog;