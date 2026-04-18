import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Home, Wrench, HardHat, Ruler, Shield, ChevronLeft, ChevronRight, Mail, Phone, MapPin, Star, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { services, portfolioProjects, teamMembers, testimonials } from '../../data/mockData';

const iconMap = { Building2, Home, Wrench, HardHat, Ruler, Shield };

export default function HomePage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  return (
    <div style={{ background: '#fff' }}>
      <Navbar />

      {/* Hero */}
      <section id="home" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(30,58,95,0.92) 0%, rgba(77,166,255,0.7) 100%), url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80) center/cover no-repeat',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '120px 24px 80px',
      }}>
        <div style={{ maxWidth: 700 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(77,166,255,0.2)', border: '1px solid rgba(77,166,255,0.4)', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ color: 'var(--primary-light)', fontSize: 13, fontWeight: 600 }}>Trusted Since 2010</span>
          </div>
          <h1 style={{ color: '#fff', marginBottom: 20, lineHeight: 1.2 }}>
            Building the Future,<br />One Project at a Time
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, marginBottom: 40, lineHeight: 1.7 }}>
            We deliver world-class construction services — from residential homes to commercial towers — with precision, safety, and excellence.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-primary btn-lg">Request a Quote</a>
            <Link to="/portfolio" className="btn btn-outline btn-lg" style={{ color: '#fff', borderColor: '#fff' }}>View Our Work</Link>
          </div>
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 64, flexWrap: 'wrap' }}>
            {[['150+', 'Projects Done'], ['15+', 'Years Experience'], ['98%', 'Client Satisfaction']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--primary-light)', fontSize: 32, fontWeight: 700, fontFamily: 'Montserrat' }}>{num}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '96px 24px', background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>Comprehensive construction solutions tailored to your needs</p>
          </div>
          <div className="grid-3">
            {services.slice(0, 6).map(s => {
              const Icon = iconMap[s.icon] || Building2;
              return (
                <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>
                  <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <Icon size={24} color="#fff" />
                  </div>
                  <h3 style={{ marginBottom: 8, fontSize: 17 }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, flex: 1 }}>{s.desc}</p>
                  <Link to={`/services/${s.id}`} style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontWeight: 600, fontSize: 14 }}>
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/services" className="btn btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Projects Portfolio */}
      <section id="projects" style={{ padding: '96px 24px', background: '#fff' }}>
        <div className="container">
          <div className="section-title">
            <h2>Our Portfolio</h2>
            <p>A selection of our most impactful completed and ongoing projects</p>
          </div>
          <div className="grid-3">
            {portfolioProjects.slice(0, 6).map(p => (
              <div key={p.id} style={{ borderRadius: 'var(--radius)', overflow: 'hidden', position: 'relative', cursor: 'pointer', boxShadow: 'var(--shadow)' }}
                onMouseEnter={e => e.currentTarget.querySelector('.overlay').style.opacity = 1}
                onMouseLeave={e => e.currentTarget.querySelector('.overlay').style.opacity = 0}>
                <img src={p.img} alt={p.title} style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }} />
                <div className="overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(30,58,95,0.92), transparent)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: 20, opacity: 0, transition: 'opacity 0.3s',
                }}>
                  <span style={{ color: 'var(--primary-light)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{p.category}</span>
                  <h3 style={{ color: '#fff', fontSize: 17, marginTop: 4, marginBottom: 10 }}>{p.title}</h3>
                  <Link to={`/portfolio/${p.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#fff', fontWeight: 600, fontSize: 13, background: 'var(--primary)', padding: '6px 14px', borderRadius: 6, width: 'fit-content' }}>
                    Read More <ArrowRight size={13} />
                  </Link>
                </div>
                <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--primary)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>{p.category}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/portfolio" className="btn btn-outline">View Full Portfolio</Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '96px 24px', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&q=80" alt="About" style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block' }} />
            </div>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>About Us</span>
              <h2 style={{ marginTop: 8, marginBottom: 20 }}>Building Excellence Since 2010</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                Light Construction is a full-service construction company with over 15 years of experience delivering residential, commercial, and infrastructure projects across Ethiopia and East Africa.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>
                Our team of certified engineers, architects, and project managers work together to ensure every project is completed on time, within budget, and to the highest quality standards.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                {[['150+', 'Projects Completed'], ['50+', 'Expert Team Members'], ['15+', 'Years Experience'], ['98%', 'Client Satisfaction']].map(([n, l]) => (
                  <div key={l} style={{ background: '#fff', borderRadius: 10, padding: '16px 20px', boxShadow: 'var(--shadow)' }}>
                    <div style={{ color: 'var(--primary)', fontSize: 24, fontWeight: 700, fontFamily: 'Montserrat' }}>{n}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{l}</div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-primary">Learn More About Us</Link>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){#about .container > div{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Team */}
      <section style={{ padding: '96px 24px', background: '#fff' }}>
        <div className="container">
          <div className="section-title">
            <h2>Meet Our Team</h2>
            <p>The experts behind every successful project</p>
          </div>
          <div className="grid-4">
            {teamMembers.map(m => (
              <div key={m.name} className="card" style={{ textAlign: 'center', padding: 28 }}>
                <img src={m.img} alt={m.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', border: '3px solid var(--primary-light)' }} />
                <h3 style={{ fontSize: 16, marginBottom: 4 }}>{m.name}</h3>
                <p style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg, var(--primary-dark), #2a5298)' }}>
        <div className="container" style={{ maxWidth: 700, textAlign: 'center' }}>
          <div className="section-title">
            <h2 style={{ color: '#fff' }}>What Our Clients Say</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Real feedback from real clients</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: '40px 48px', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 20 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />)}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 17, lineHeight: 1.8, marginBottom: 28, fontStyle: 'italic' }}>
              "{testimonials[testimonialIdx].text}"
            </p>
            <img src={testimonials[testimonialIdx].img} alt={testimonials[testimonialIdx].name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', border: '2px solid var(--primary-light)' }} />
            <div style={{ color: '#fff', fontWeight: 600 }}>{testimonials[testimonialIdx].name}</div>
            <div style={{ color: 'var(--primary-light)', fontSize: 13 }}>{testimonials[testimonialIdx].company}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 24 }}>
              <button onClick={() => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)}
                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => setTestimonialIdx(i => (i + 1) % testimonials.length)}
                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '96px 24px', background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Get In Touch</h2>
            <p>Ready to start your project? We'd love to hear from you.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
                {[
                  [Phone, '+251 911 234 567', 'Call Us'],
                  [Mail, 'info@lightconstruction.com', 'Email Us'],
                  [MapPin, 'Bole, Addis Ababa, Ethiopia', 'Visit Us'],
                ].map(([Icon, val, label]) => (
                  <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--primary)', borderRadius: 10, padding: 10, flexShrink: 0 }}>
                      <Icon size={20} color="#fff" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{label}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: 20 }}>Request a Quote</h3>
              <div className="form-group"><label>Full Name</label><input type="text" placeholder="Your name" /></div>
              <div className="form-group"><label>Email</label><input type="email" placeholder="your@email.com" /></div>
              <div className="form-group"><label>Project Type</label>
                <select><option>Residential</option><option>Commercial</option><option>Infrastructure</option><option>Renovation</option></select>
              </div>
              <div className="form-group"><label>Message</label><textarea rows={4} placeholder="Tell us about your project..." /></div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){#contact .container > div{grid-template-columns:1fr!important;}}`}</style>
      </section>

      <Footer />
    </div>
  );
}
