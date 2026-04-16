import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: transparent ? 'transparent' : 'rgba(30,58,95,0.97)',
      backdropFilter: transparent ? 'none' : 'blur(10px)',
      transition: 'all 0.3s',
      padding: '0 40px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            background: transparent ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.95)',
            borderRadius: 10, padding: '4px 10px',
            boxShadow: transparent ? '0 2px 12px rgba(0,0,0,0.15)' : 'none',
            transition: 'all 0.3s',
          }}>
            <img src="/logo.png" alt="Light Construction" style={{ height: 44, width: 'auto', objectFit: 'contain', display: 'block' }} />
          </div>
        </Link>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="nav-links-desktop">
          {links.map(l => {
            const active = location.pathname === l.to;
            return l.to.startsWith('/#') ? (
              <a key={l.label} href={l.to} style={{
                color: '#fff', fontSize: 14, fontWeight: active ? 600 : 500,
                opacity: active ? 1 : 0.85, transition: 'opacity 0.2s',
                borderBottom: active ? '2px solid var(--primary-light)' : '2px solid transparent',
                paddingBottom: 2,
              }}
                onMouseEnter={e => e.target.style.opacity = 1}
                onMouseLeave={e => { if (!active) e.target.style.opacity = 0.85; }}
              >{l.label}</a>
            ) : (
              <Link key={l.label} to={l.to} style={{
                color: '#fff', fontSize: 14, fontWeight: active ? 600 : 500,
                opacity: active ? 1 : 0.85, transition: 'opacity 0.2s',
                borderBottom: active ? '2px solid var(--primary-light)' : '2px solid transparent',
                paddingBottom: 2,
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => { if (!active) e.currentTarget.style.opacity = 0.85; }}
              >{l.label}</Link>
            );
          })}
          <Link to="/#contact" className="btn btn-primary btn-sm">Request Quote</Link>
        </div>

        <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} className="nav-hamburger">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div style={{ background: 'var(--primary-dark)', padding: '16px 40px 24px' }}>
          {links.map(l => (
            l.to.startsWith('/#')
              ? <a key={l.label} href={l.to} onClick={() => setOpen(false)} style={{ display: 'block', color: '#fff', padding: '10px 0', fontSize: 15, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{l.label}</a>
              : <Link key={l.label} to={l.to} onClick={() => setOpen(false)} style={{ display: 'block', color: '#fff', padding: '10px 0', fontSize: 15, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{l.label}</Link>
          ))}
          <Link to="/#contact" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Request Quote</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
