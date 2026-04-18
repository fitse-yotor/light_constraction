import { useParams, Link } from 'react-router-dom';
import { Building2, Home, Wrench, HardHat, Ruler, Shield, ArrowLeft, ArrowRight, CheckCircle, Clock, FolderKanban } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { services } from '../../data/mockData';

const iconMap = { Building2, Home, Wrench, HardHat, Ruler, Shield };

export default function ServiceDetail() {
  const { id } = useParams();
  const service = services.find(s => s.id === Number(id));

  if (!service) return (
    <div style={{ background: '#fff' }}>
      <Navbar />
      <div style={{ padding: '160px 24px', textAlign: 'center' }}>
        <h2>Service not found</h2>
        <Link to="/services" className="btn btn-primary" style={{ marginTop: 24 }}>Back to Services</Link>
      </div>
      <Footer />
    </div>
  );

  const Icon = iconMap[service.icon] || Building2;
  const others = services.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <div style={{ background: '#fff' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: `linear-gradient(135deg, rgba(30,58,95,0.88) 0%, rgba(77,166,255,0.6) 100%), url(${service.img}) center/cover no-repeat`,
        padding: '140px 24px 80px',
      }}>
        <div className="container">
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 24 }}>
            <ArrowLeft size={16} /> All Services
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ background: 'var(--primary)', borderRadius: 12, padding: 12, display: 'flex' }}>
              <Icon size={28} color="#fff" />
            </div>
            <h1 style={{ color: '#fff' }}>{service.title}</h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, maxWidth: 600 }}>{service.desc}</p>
          <div style={{ display: 'flex', gap: 32, marginTop: 32, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.85)' }}>
              <Clock size={16} /><span style={{ fontSize: 14 }}>Duration: {service.duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.85)' }}>
              <FolderKanban size={16} /><span style={{ fontSize: 14 }}>{service.projects}+ Projects Completed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 24px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <h2 style={{ marginBottom: 20 }}>About This Service</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: 15, marginBottom: 32 }}>{service.fullDesc}</p>

              <h3 style={{ marginBottom: 16, fontSize: 18 }}>What's Included</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {service.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <CheckCircle size={18} color="var(--success)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 15 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="card" style={{ background: 'var(--primary-dark)', color: '#fff' }}>
                <h3 style={{ fontSize: 16, marginBottom: 20, color: 'var(--primary-light)' }}>Quick Facts</h3>
                {[
                  ['Typical Duration', service.duration],
                  ['Projects Completed', `${service.projects}+`],
                  ['Team Size', '5–30 specialists'],
                  ['Warranty', '2–5 years'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: 14 }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="card">
                <h3 style={{ fontSize: 16, marginBottom: 12 }}>Get a Free Quote</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>Tell us about your project and we'll get back to you within 24 hours.</p>
                <Link to="/#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Contact Us Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section style={{ padding: '60px 24px 80px', background: 'var(--bg)' }}>
        <div className="container">
          <h2 style={{ marginBottom: 32 }}>Other Services</h2>
          <div className="grid-3">
            {others.map(s => {
              const OtherIcon = iconMap[s.icon] || Building2;
              return (
                <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                    <OtherIcon size={20} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 15, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, flex: 1 }}>{s.desc}</p>
                  <Link to={`/services/${s.id}`} style={{ marginTop: 14, color: 'var(--primary)', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                    Read More <ArrowRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
