import React from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './styles.css';

function App() {
  return (
    <div className="page minimal-page">
      <header className="navbar minimal-navbar">
        <div className="logo">GALENITE</div>

        <nav>
          <a href="#">Products</a>
          <a href="#">Technology</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <main className="minimal-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="minimal-hero"
        >
          <span className="minimal-badge">
            AI SYSTEMS · DESIGN · INFRASTRUCTURE
          </span>

          <h1>
            Building the next
            <br />
            generation of AI
            <br />
            products.
          </h1>

          <p>
            Minimal ecosystem focused on AI interfaces,
            automation and digital infrastructure.
          </p>

          <div className="hero-actions">
            <button>
              Explore
              <ArrowUpRight size={18} />
            </button>

            <a href="#">View projects</a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
