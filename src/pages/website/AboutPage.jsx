import { Link } from 'react-router-dom';
import { CheckCircle, Award, Users, Target } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { teamMembers } from '../../data/mockData';

export default function AboutPage() {
  return (
    <div style={{ background: '#fff' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: `linear-gradient(135deg, rgba(30,58,95,0.9) 0%, rgba(77,166,255,0.65) 100%), url(https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80) center/cover no-repeat`,
        padding: '140px 24px 80px', textAlign: 'center',
      }}>
        <div className="container">
          <span style={{ color: 'var(--primary-light)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Who We Are</span>
          <h1 style={{ color: '#fff', marginTop: 12, marginBottom: 16 }}>About Light Construction</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, maxWidth: 600, margin: '0 auto' }}>
            Building excellence across Ethiopia and East Africa since 2010.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '80px 24px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Our Story</span>
              <h2 style={{ marginTop: 8, marginBottom: 20 }}>Built on Trust, Driven by Excellence</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 16 }}>
                Light Construction was founded in 2010 by Abebe Girma with a vision to transform the construction landscape in Ethiopia. Starting with a small team of dedicated engineers and builders, we have grown into one of the region's most trusted construction firms.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 32 }}>
                Our approach combines international best practices with deep local knowledge, allowing us to deliver projects that meet global standards while respecting the unique context of each community we serve.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['ISO 9001:2015 Certified Quality Management', 'Member of Ethiopian Construction Association', 'Award-winning safety record — zero major incidents', 'Committed to sustainable building practices'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={18} color="var(--success)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 14 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80" alt="Our team at work" style={{ width: '100%', height: 460, objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){section .container > div[style*="grid-template-columns"]{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--primary-dark)', padding: '64px 24px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
            {[['150+', 'Projects Completed'], ['15+', 'Years Experience'], ['50+', 'Expert Team'], ['98%', 'Client Satisfaction']].map(([n, l]) => (
              <div key={l}>
                <div style={{ color: 'var(--primary-light)', fontSize: 36, fontWeight: 700, fontFamily: 'Montserrat' }}>{n}</div>
                <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="grid-3">
            {[
              [Award, 'Excellence', 'We hold ourselves to the highest standards in every project, from design to delivery.'],
              [Users, 'Collaboration', 'We work closely with clients, partners, and communities to achieve shared goals.'],
              [Target, 'Integrity', 'Transparency, honesty, and accountability are at the heart of every relationship we build.'],
            ].map(([Icon, title, desc]) => (
              <div key={title} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Icon size={26} color="#fff" />
                </div>
                <h3 style={{ marginBottom: 10 }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 24px' }}>
        <div className="container">
          <div className="section-title">
            <h2>Meet Our Team</h2>
            <p>The dedicated professionals behind every successful project</p>
          </div>
          <div className="grid-4">
            {teamMembers.map(m => (
              <div key={m.name} className="card" style={{ textAlign: 'center', padding: 28 }}>
                <img src={m.img} alt={m.name} style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', border: '3px solid var(--primary-light)' }} />
                <h3 style={{ fontSize: 16, marginBottom: 4 }}>{m.name}</h3>
                <p style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{m.role}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg)', padding: '80px 24px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <h2 style={{ marginBottom: 16 }}>Let's Build Something Great Together</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Reach out to discuss your next project.</p>
          <Link to="/#contact" className="btn btn-primary btn-lg">Contact Us</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
