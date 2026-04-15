import { Link } from 'react-router-dom';
import { Award, GraduationCap, Briefcase, ArrowLeft } from 'lucide-react';
import { founderData } from '../../data/mockData';

export default function FounderPage() {
  const f = founderData;

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--primary-dark)', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
          <ArrowLeft size={16} /> Back to Website
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Founder Portfolio</span>
      </div>

      {/* Cover + Profile */}
      <div style={{ position: 'relative' }}>
        <div style={{
          height: 380,
          background: `linear-gradient(to bottom, rgba(30,58,95,0.5), rgba(30,58,95,0.85)), url(${f.coverImg}) center/cover no-repeat`,
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end', gap: 32,
            marginTop: -80, paddingBottom: 32,
            flexWrap: 'wrap',
          }}>
            <img src={f.img} alt={f.name} style={{
              width: 140, height: 140, borderRadius: '50%', objectFit: 'cover',
              border: '5px solid #fff', boxShadow: 'var(--shadow-md)', flexShrink: 0,
            }} />
            <div style={{ paddingBottom: 8 }}>
              <h1 style={{ fontSize: 32, marginBottom: 4 }}>{f.name}</h1>
              <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{f.title}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, fontStyle: 'italic' }}>{f.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section style={{ background: 'var(--primary-dark)', padding: '32px 24px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}>
            {f.stats.map(s => (
              <div key={s.label}>
                <div style={{ color: 'var(--primary-light)', fontSize: 30, fontWeight: 700, fontFamily: 'Montserrat' }}>{s.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio + Timeline */}
      <section style={{ padding: '80px 24px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <h2 style={{ marginBottom: 24 }}>Biography</h2>
              {f.bio.map((para, i) => (
                <p key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>{para}</p>
              ))}

              <h2 style={{ marginTop: 48, marginBottom: 24 }}>Career Milestones</h2>
              <div style={{ position: 'relative', paddingLeft: 24 }}>
                <div style={{ position: 'absolute', left: 7, top: 0, bottom: 0, width: 2, background: '#e2e8f0' }} />
                {f.milestones.map((m, i) => (
                  <div key={i} style={{ position: 'relative', marginBottom: 24 }}>
                    <div style={{ position: 'absolute', left: -24, top: 4, width: 14, height: 14, borderRadius: '50%', background: 'var(--primary)', border: '2px solid #fff', boxShadow: '0 0 0 2px var(--primary)' }} />
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ background: 'var(--primary)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, flexShrink: 0, marginTop: 2 }}>{m.year}</span>
                      <span style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>{m.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Education */}
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <GraduationCap size={20} color="var(--primary)" />
                  <h3 style={{ fontSize: 16 }}>Education</h3>
                </div>
                {f.education.map((e, i) => (
                  <div key={i} style={{ padding: '12px 0', borderBottom: i < f.education.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{e.degree}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{e.school}</div>
                    <div style={{ color: 'var(--primary)', fontSize: 12, marginTop: 2 }}>{e.year}</div>
                  </div>
                ))}
              </div>

              {/* Awards */}
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <Award size={20} color="var(--warning)" />
                  <h3 style={{ fontSize: 16 }}>Awards & Recognition</h3>
                </div>
                {f.awards.map((a, i) => (
                  <div key={i} style={{ padding: '12px 0', borderBottom: i < f.awards.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{a.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{a.org}</div>
                    <div style={{ color: 'var(--warning)', fontSize: 12, marginTop: 2 }}>{a.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){section .container > div[style*="grid-template-columns: 1.4fr"]{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: '0 24px 80px', background: 'var(--bg)' }}>
        <div className="container">
          <h2 style={{ paddingTop: 60, marginBottom: 32 }}>Signature Projects</h2>
          <div className="grid-3">
            {f.featuredProjects.map(p => (
              <div key={p.title} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <img src={p.img} alt={p.title} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '16px 20px' }}>
                  <h3 style={{ fontSize: 15, marginBottom: 6 }}>{p.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{p.value}</span>
                    <span>{p.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div style={{ background: 'var(--primary-dark)', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>© 2026 Abebe Girma · Light Construction · All rights reserved.</p>
      </div>
    </div>
  );
}
