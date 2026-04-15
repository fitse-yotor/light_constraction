import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, HardHat } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Home', 'About', 'Services', 'Projects', 'Contact'];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(30,58,95,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      transition: 'all 0.3s',
      padding: '0 40px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff' }}>
          <div style={{ background: 'var(--primary)', borderRadius: 8, padding: 6, display: 'flex' }}>
            <HardHat size={22} />
          </div>
          <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 18 }}>Light Construction</span>
        </Link>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="nav-links-desktop">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: '#fff', fontSize: 14, fontWeight: 500,
              opacity: 0.85, transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.85}
            >{l}</a>
          ))}
          <a href="#contact" className="btn btn-primary btn-sm">Request Quote</a>
        </div>

        <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: '#fff' }} className="nav-hamburger">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div style={{ background: 'var(--primary-dark)', padding: '16px 40px 24px' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{ display: 'block', color: '#fff', padding: '10px 0', fontSize: 15, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              {l}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary" style={{ marginTop: 16 }}>Request Quote</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
