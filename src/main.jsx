import React from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import './styles.css';

const cards = [
  {
    title: 'AI OFFICE',
    text: 'Multi-agent infrastructure for business operations and automation.'
  },
  {
    title: 'HEALTH',
    text: 'Minimal health tracking with AI assistance and analytics.'
  },
  {
    title: 'AUTH',
    text: 'Unified Galenite account system for all products.'
  }
];

function App() {
  return (
    <div className="page">
      <header className="navbar">
        <div className="logo">GALENITE</div>

        <nav>
          <a href="#">Products</a>
          <a href="#">Technology</a>
          <a href="#">About</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-label">
              <Sparkles size={16} />
              NEW ERA
            </div>

            <h1>
              Unified ecosystem
              <br />
              for Galenite.
            </h1>

            <p>
              Rebuilt from scratch around one visual system.
              Minimal interface. Smooth motion. Monochrome identity.
            </p>

            <button>
              Explore ecosystem
              <ArrowUpRight size={18} />
            </button>
          </motion.div>
        </section>

        <section className="grid">
          {cards.map((card) => (
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="card"
              key={card.title}
            >
              <span>{card.title}</span>
              <p>{card.text}</p>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
