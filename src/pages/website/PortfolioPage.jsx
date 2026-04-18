import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { portfolioProjects } from '../../data/mockData';

const categories = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Hospitality'];

export default function PortfolioPage() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? portfolioProjects : portfolioProjects.filter(p => p.category === active);

  return (
    <div style={{ background: '#fff' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, #2a5298 100%)',
        padding: '140px 24px 80px', textAlign: 'center',
      }}>
        <div className="container">
          <span style={{ color: 'var(--primary-light)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Our Work</span>
          <h1 style={{ color: '#fff', marginTop: 12, marginBottom: 16 }}>Project Portfolio</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            A showcase of our most impactful projects across Ethiopia and East Africa.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section style={{ padding: '48px 24px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setActive(c)} style={{
              padding: '8px 20px', borderRadius: 24, border: '2px solid',
              borderColor: active === c ? 'var(--primary)' : '#e2e8f0',
              background: active === c ? 'var(--primary)' : '#fff',
              color: active === c ? '#fff' : 'var(--text-secondary)',
              fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
            }}>{c}</button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '48px 24px 80px' }}>
        <div className="container">
          <div className="grid-3">
            {filtered.map(p => (
              <div key={p.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  <span style={{ position: 'absolute', top: 12, left: 12, background: 'var(--primary)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>{p.category}</span>
                  <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 11, padding: '3px 10px', borderRadius: 20 }}>{p.year}</span>
                </div>
                <div style={{ padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 16, marginBottom: 6 }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, flex: 1 }}>{p.desc.slice(0, 100)}...</p>
                  <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
                    <span>📍 {p.location}</span>
                    <span>💰 {p.value}</span>
                  </div>
                  <Link to={`/portfolio/${p.id}`} style={{
                    marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6,
                    color: 'var(--primary)', fontWeight: 600, fontSize: 14,
                  }}>
                    View Details <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
