import { Link } from 'react-router-dom';
import { Building2, Home, Wrench, HardHat, Ruler, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { services } from '../../data/mockData';

const iconMap = { Building2, Home, Wrench, HardHat, Ruler, Shield };

export default function ServicesPage() {
  return (
    <div style={{ background: '#fff' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, #2a5298 100%)',
        padding: '140px 24px 80px', textAlign: 'center',
      }}>
        <div className="container">
          <span style={{ color: 'var(--primary-light)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>What We Do</span>
          <h1 style={{ color: '#fff', marginTop: 12, marginBottom: 16 }}>Our Services</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            Comprehensive construction solutions delivered with precision, safety, and excellence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '80px 24px' }}>
        <div className="container">
          <div className="grid-3">
            {services.map(s => {
              const Icon = iconMap[s.icon] || Building2;
              return (
                <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8, marginBottom: 20 }} />
                  <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <Icon size={22} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 17, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, flex: 1 }}>{s.desc}</p>
                  <div style={{ display: 'flex', gap: 16, marginTop: 16, fontSize: 13, color: 'var(--text-secondary)' }}>
                    <span>⏱ {s.duration}</span>
                    <span>📁 {s.projects}+ projects</span>
                  </div>
                  <Link to={`/services/${s.id}`} style={{
                    marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6,
                    color: 'var(--primary)', fontWeight: 600, fontSize: 14,
                  }}>
                    Read More <ArrowRight size={15} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg)', padding: '80px 24px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <h2 style={{ marginBottom: 16 }}>Ready to Start Your Project?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Contact us today for a free consultation and quote.</p>
          <Link to="/#contact" className="btn btn-primary btn-lg">Request a Quote</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
