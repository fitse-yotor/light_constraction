import { Link } from 'react-router-dom';
import { Share2, MessageCircle, Globe, AtSign } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--primary-dark)', color: '#fff', padding: '64px 24px 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 8, padding: '4px 8px' }}>
                <img src="/logo.png" alt="Light Construction" style={{ height: 36, width: 'auto', objectFit: 'contain', display: 'block' }} />
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
              Building excellence since 2010. Your trusted partner for all construction needs.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Share2, MessageCircle, Globe, AtSign].map((Icon, i) => (
                <a key={i} href="#" style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: 8, display: 'flex', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                  <Icon size={16} color="#fff" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 15, marginBottom: 16, color: 'var(--primary-light)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Portfolio', '/portfolio'], ['Gallery', '/gallery'], ['Contact', '/#contact']].map(([label, path]) => (
                <li key={label}>
                  <Link to={path} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: 15, marginBottom: 16, color: 'var(--primary-light)' }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Commercial', 'Residential', 'Renovation', 'Planning', 'Safety'].map(item => (
                <li key={item}><Link to="/services" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: 15, marginBottom: 16, color: 'var(--primary-light)' }}>Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['+251 911 234 567', 'info@lightconstruction.com', 'Bole, Addis Ababa', 'Mon–Fri 8am–6pm'].map(item => (
                <li key={item}><span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>© 2026 Light Construction. All rights reserved.</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Privacy Policy · Terms of Service</p>
        </div>
      </div>
      <style>{`@media(max-width:768px){footer .container > div:first-child{grid-template-columns:1fr 1fr!important;}}`}</style>
    </footer>
  );
}
