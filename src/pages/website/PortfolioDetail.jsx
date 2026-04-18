import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, DollarSign, User, Clock } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { portfolioProjects } from '../../data/mockData';

export default function PortfolioDetail() {
  const { id } = useParams();
  const project = portfolioProjects.find(p => p.id === Number(id));

  if (!project) return (
    <div style={{ background: '#fff' }}>
      <Navbar />
      <div style={{ padding: '160px 24px', textAlign: 'center' }}>
        <h2>Project not found</h2>
        <Link to="/portfolio" className="btn btn-primary" style={{ marginTop: 24 }}>Back to Portfolio</Link>
      </div>
      <Footer />
    </div>
  );

  const related = portfolioProjects.filter(p => p.id !== project.id && p.category === project.category).slice(0, 3);

  return (
    <div style={{ background: '#fff' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: `linear-gradient(to bottom, rgba(30,58,95,0.75) 0%, rgba(0,0,0,0.4) 100%), url(${project.img}) center/cover no-repeat`,
        padding: '140px 24px 80px',
      }}>
        <div className="container">
          <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 24 }}>
            <ArrowLeft size={16} /> All Projects
          </Link>
          <span style={{ display: 'inline-block', background: 'var(--primary)', color: '#fff', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20, marginBottom: 16 }}>{project.category}</span>
          <h1 style={{ color: '#fff', marginBottom: 16 }}>{project.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, maxWidth: 600 }}>{project.desc}</p>
        </div>
      </section>

      {/* Details */}
      <section style={{ padding: '80px 24px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 64, alignItems: 'start' }}>
            {/* Gallery */}
            <div>
              <h2 style={{ marginBottom: 24 }}>Project Gallery</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {project.gallery.map((img, i) => (
                  <div key={i} style={{ borderRadius: 10, overflow: 'hidden', gridColumn: i === 0 ? '1 / -1' : 'auto' }}>
                    <img src={img} alt={`${project.title} ${i + 1}`} style={{ width: '100%', height: i === 0 ? 320 : 180, objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.03)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="card">
                <h3 style={{ fontSize: 16, marginBottom: 20 }}>Project Details</h3>
                {[
                  [MapPin, 'Location', project.location],
                  [User, 'Client', project.client],
                  [DollarSign, 'Project Value', project.value],
                  [Clock, 'Duration', project.duration],
                  [Calendar, 'Year', project.year],
                ].map(([Icon, label, val]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
                    <div style={{ width: 36, height: 36, background: '#e8f4ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} color="var(--primary)" />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card" style={{ background: 'var(--primary-dark)', color: '#fff' }}>
                <h3 style={{ fontSize: 15, marginBottom: 12, color: 'var(--primary-light)' }}>Interested in a similar project?</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 16 }}>Let's discuss your vision and bring it to life.</p>
                <Link to="/#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get in Touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ padding: '0 24px 80px', background: 'var(--bg)' }}>
          <div className="container">
            <h2 style={{ marginBottom: 32, paddingTop: 60 }}>Related Projects</h2>
            <div className="grid-3">
              {related.map(p => (
                <div key={p.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
                  <div style={{ padding: '16px 20px' }}>
                    <h3 style={{ fontSize: 15, marginBottom: 6 }}>{p.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{p.location}</p>
                    <Link to={`/portfolio/${p.id}`} style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--primary)', fontWeight: 600, fontSize: 13 }}>
                      View Details <ArrowLeft size={13} style={{ transform: 'rotate(180deg)' }} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
