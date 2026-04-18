import { useState } from 'react';
import { X, ZoomIn, Play } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { galleryItems } from '../../data/mockData';

const categories = ['All', 'Construction', 'Planning', 'Completed', 'Infrastructure', 'Commercial'];

export default function GalleryPage() {
  const [items] = useState(galleryItems);
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter);

  return (
    <div style={{ background: '#fff' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, #2a5298 100%)',
        padding: '140px 24px 80px', textAlign: 'center',
      }}>
        <div className="container">
          <span style={{ color: 'var(--primary-light)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Visual Showcase</span>
          <h1 style={{ color: '#fff', marginTop: 12, marginBottom: 16 }}>Gallery</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Photos and videos from our projects, team, and milestones.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section style={{ padding: '48px 24px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: '8px 20px', borderRadius: 24, border: '2px solid',
              borderColor: filter === c ? 'var(--primary)' : '#e2e8f0',
              background: filter === c ? 'var(--primary)' : '#fff',
              color: filter === c ? '#fff' : 'var(--text-secondary)',
              fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
            }}>{c}</button>
          ))}
        </div>
      </section>

      {/* Masonry-style Grid */}
      <section style={{ padding: '48px 24px 80px' }}>
        <div className="container">
          <div style={{ columns: 3, columnGap: 16 }}>
            {filtered.map(item => (
              <div key={item.id} style={{ breakInside: 'avoid', marginBottom: 16, borderRadius: 12, overflow: 'hidden', position: 'relative', cursor: 'pointer', boxShadow: 'var(--shadow)' }}
                onClick={() => setLightbox(item)}
                onMouseEnter={e => { e.currentTarget.querySelector('.gallery-overlay').style.opacity = 1; }}
                onMouseLeave={e => { e.currentTarget.querySelector('.gallery-overlay').style.opacity = 0; }}>
                {item.type === 'video' ? (
                  <div style={{ background: '#000', position: 'relative' }}>
                    <video src={item.src} style={{ width: '100%', display: 'block' }} muted />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={20} color="var(--primary-dark)" fill="var(--primary-dark)" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img src={item.src} alt={item.title} style={{ width: '100%', display: 'block', transition: 'transform 0.3s' }} />
                )}
                <div className="gallery-overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(30,58,95,0.85), transparent)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: 16, opacity: 0, transition: 'opacity 0.3s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{item.title}</div>
                      <div style={{ color: 'var(--primary-light)', fontSize: 12 }}>{item.category}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: 6 }}>
                      {item.type === 'video' ? <Play size={16} color="#fff" /> : <ZoomIn size={16} color="#fff" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>No items in this category.</div>
          )}
        </div>
        <style>{`@media(max-width:900px){section .container > div[style*="columns: 3"]{columns:2!important;}}@media(max-width:600px){section .container > div[style*="columns: 3"]{columns:1!important;}}`}</style>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, padding: 24,
        }} onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: 20, right: 20,
            background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
            borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}><X size={20} /></button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 900, width: '100%' }}>
            {lightbox.type === 'video'
              ? <video src={lightbox.src} controls autoPlay style={{ width: '100%', borderRadius: 12 }} />
              : <img src={lightbox.src} alt={lightbox.title} style={{ width: '100%', borderRadius: 12, maxHeight: '80vh', objectFit: 'contain' }} />
            }
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>{lightbox.title}</div>
              <div style={{ color: 'var(--primary-light)', fontSize: 13, marginTop: 4 }}>{lightbox.category}</div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
