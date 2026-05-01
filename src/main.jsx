import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="/">GALENITE</a>
        <nav className="nav">
          <a href="/ai-office">AI Office</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main className="main-hero">
        <p className="eyebrow">AI SYSTEMS · DESIGN · INFRASTRUCTURE</p>

        <h1>
          Building AI products
          <br />
          for the new digital era.
        </h1>

        <p className="hero-text">
          Galenite creates minimal, intelligent interfaces and automation systems for business.
        </p>

        <div className="actions">
          <a className="primary-link" href="/ai-office">Explore AI Office</a>
          <a className="secondary-link" href="/products">View products</a>
        </div>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
