import { useState } from 'react';
import { Save, Eye, EyeOff, GripVertical } from 'lucide-react';

const DEFAULT_SECTIONS = [
  { id: 'hero', label: 'Hero Banner', desc: 'Main headline, tagline, and CTA buttons', icon: '🏠', visible: true, editable: false },
  { id: 'services', label: 'Services', desc: 'Grid of service cards linking to service pages', icon: '🔧', visible: true, editable: true },
  { id: 'portfolio', label: 'Portfolio', desc: 'Featured project grid with hover overlay', icon: '🏗️', visible: true, editable: true },
  { id: 'about', label: 'About Us', desc: 'Company story, stats, and image', icon: 'ℹ️', visible: true, editable: true },
  { id: 'team', label: 'Our Team', desc: 'Team member cards grid', icon: '👥', visible: true, editable: true },
  { id: 'testimonials', label: 'Testimonials', desc: 'Client testimonial carousel', icon: '⭐', visible: true, editable: true },
  { id: 'contact', label: 'Contact / Quote', desc: 'Contact info and quote request form', icon: '📬', visible: true, editable: false },
];

const HERO_DEFAULTS = {
  headline: 'Building the Future,\nOne Project at a Time',
  subheadline: 'We deliver world-class construction services — from residential homes to commercial towers — with precision, safety, and excellence.',
  ctaPrimary: 'Request a Quote',
  ctaSecondary: 'View Our Work',
  bgImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80',
  stat1Value: '150+', stat1Label: 'Projects Done',
  stat2Value: '15+', stat2Label: 'Years Experience',
  stat3Value: '98%', stat3Label: 'Client Satisfaction',
};

export default function HomepageSections() {
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [hero, setHero] = useState(HERO_DEFAULTS);
  const [activeSection, setActiveSection] = useState(null);
  const [saved, setSaved] = useState(false);
  const [dragIdx, setDragIdx] = useState(null);

  const toggleVisible = (id) => {
    setSections(s => s.map(sec => sec.id === id ? { ...sec, visible: !sec.visible } : sec));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Drag-to-reorder
  const onDragStart = (i) => setDragIdx(i);
  const onDragOver = (e, i) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === i) return;
    const updated = [...sections];
    const [moved] = updated.splice(dragIdx, 1);
    updated.splice(i, 0, moved);
    setSections(updated);
    setDragIdx(i);
  };
  const onDragEnd = () => setDragIdx(null);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Homepage Sections</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Control visibility and order of homepage sections. Drag to reorder.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Save size={15} /> {saved ? 'Saved!' : 'Save Layout'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24, alignItems: 'start' }}>
        {/* Section List */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Section Order</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sections.map((sec, i) => (
              <div key={sec.id}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragOver={e => onDragOver(e, i)}
                onDragEnd={onDragEnd}
                onClick={() => sec.editable && setActiveSection(activeSection === sec.id ? null : sec.id)}
                className="card"
                style={{
                  padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                  opacity: sec.visible ? 1 : 0.5, cursor: sec.editable ? 'pointer' : 'default',
                  border: activeSection === sec.id ? '2px solid var(--primary)' : '2px solid transparent',
                  transition: 'all 0.2s', background: dragIdx === i ? '#f0f7ff' : '#fff',
                }}>
                <div style={{ cursor: 'grab', color: '#ccc', flexShrink: 0 }}>
                  <GripVertical size={16} />
                </div>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{sec.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{sec.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sec.desc}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {sec.editable && (
                    <span style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, background: '#e8f4ff', borderRadius: 4, padding: '2px 6px' }}>Edit</span>
                  )}
                  <button onClick={e => { e.stopPropagation(); toggleVisible(sec.id); }}
                    style={{ background: sec.visible ? '#f0f0f0' : '#fff3cd', border: 'none', borderRadius: 7, padding: '5px 8px', cursor: 'pointer', color: sec.visible ? '#666' : '#b8860b', display: 'flex' }}
                    title={sec.visible ? 'Hide section' : 'Show section'}>
                    {sec.visible ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Panel */}
        <div>
          {activeSection === null && (
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-secondary)' }}>
              <span style={{ fontSize: 40 }}>🖱️</span>
              <p style={{ marginTop: 12, fontSize: 14 }}>Click an editable section on the left to configure its content.</p>
            </div>
          )}

          {activeSection === 'hero' && (
            <div className="card">
              <h4 style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>Hero Section</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="form-group">
                  <label>Headline</label>
                  <textarea className="form-control" rows={2} value={hero.headline} onChange={e => setHero(h => ({ ...h, headline: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Subheadline</label>
                  <textarea className="form-control" rows={3} value={hero.subheadline} onChange={e => setHero(h => ({ ...h, subheadline: e.target.value }))} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group">
                    <label>Primary CTA</label>
                    <input className="form-control" value={hero.ctaPrimary} onChange={e => setHero(h => ({ ...h, ctaPrimary: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>Secondary CTA</label>
                    <input className="form-control" value={hero.ctaSecondary} onChange={e => setHero(h => ({ ...h, ctaSecondary: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Background Image URL</label>
                  <input className="form-control" value={hero.bgImage} onChange={e => setHero(h => ({ ...h, bgImage: e.target.value }))} />
                  {hero.bgImage && <img src={hero.bgImage} alt="bg" style={{ marginTop: 8, width: '100%', height: 100, objectFit: 'cover', borderRadius: 8 }} />}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {[1, 2, 3].map(n => (
                    <div key={n} style={{ background: 'var(--bg)', borderRadius: 8, padding: 10 }}>
                      <div className="form-group" style={{ marginBottom: 6 }}>
                        <label style={{ fontSize: 11 }}>Stat {n} Value</label>
                        <input className="form-control" value={hero[`stat${n}Value`]} onChange={e => setHero(h => ({ ...h, [`stat${n}Value`]: e.target.value }))} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: 11 }}>Stat {n} Label</label>
                        <input className="form-control" value={hero[`stat${n}Label`]} onChange={e => setHero(h => ({ ...h, [`stat${n}Label`]: e.target.value }))} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'services' && (
            <div className="card">
              <h4 style={{ marginBottom: 12, fontSize: 15, fontWeight: 600 }}>Services Section</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>Services are managed in the <strong>Services</strong> page. Here you can control the section title.</p>
              <div className="form-group">
                <label>Section Title</label>
                <input className="form-control" defaultValue="Our Services" />
              </div>
              <div className="form-group">
                <label>Section Subtitle</label>
                <input className="form-control" defaultValue="Comprehensive construction solutions tailored to your needs" />
              </div>
            </div>
          )}

          {activeSection === 'portfolio' && (
            <div className="card">
              <h4 style={{ marginBottom: 12, fontSize: 15, fontWeight: 600 }}>Portfolio Section</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>Projects are managed in the <strong>Portfolio</strong> page.</p>
              <div className="form-group">
                <label>Section Title</label>
                <input className="form-control" defaultValue="Our Portfolio" />
              </div>
              <div className="form-group">
                <label>Section Subtitle</label>
                <input className="form-control" defaultValue="A selection of our most impactful completed and ongoing projects" />
              </div>
              <div className="form-group">
                <label>Max Projects to Show</label>
                <input className="form-control" type="number" defaultValue={6} min={1} max={12} />
              </div>
            </div>
          )}

          {activeSection === 'about' && (
            <div className="card">
              <h4 style={{ marginBottom: 12, fontSize: 15, fontWeight: 600 }}>About Section</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>Full about content is managed in the <strong>About Page</strong> section.</p>
              <div className="form-group">
                <label>Section Title</label>
                <input className="form-control" defaultValue="Building Excellence Since 2010" />
              </div>
              <div className="form-group">
                <label>Short Description</label>
                <textarea className="form-control" rows={3} defaultValue="Light Construction is a full-service construction company with over 15 years of experience delivering residential, commercial, and infrastructure projects across Ethiopia and East Africa." />
              </div>
            </div>
          )}

          {activeSection === 'team' && (
            <div className="card">
              <h4 style={{ marginBottom: 12, fontSize: 15, fontWeight: 600 }}>Team Section</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>Team members are managed in <strong>About Page → Team Members</strong>.</p>
              <div className="form-group">
                <label>Section Title</label>
                <input className="form-control" defaultValue="Meet Our Team" />
              </div>
              <div className="form-group">
                <label>Section Subtitle</label>
                <input className="form-control" defaultValue="The experts behind every successful project" />
              </div>
            </div>
          )}

          {activeSection === 'testimonials' && (
            <div className="card">
              <h4 style={{ marginBottom: 12, fontSize: 15, fontWeight: 600 }}>Testimonials Section</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>Testimonials are managed in the <strong>Testimonials</strong> page.</p>
              <div className="form-group">
                <label>Section Title</label>
                <input className="form-control" defaultValue="What Our Clients Say" />
              </div>
              <div className="form-group">
                <label>Section Subtitle</label>
                <input className="form-control" defaultValue="Real feedback from real clients" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
