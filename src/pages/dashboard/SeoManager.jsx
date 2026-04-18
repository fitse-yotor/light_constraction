import { useState } from 'react';
import { Save, Globe, Search, Share2 } from 'lucide-react';

const PAGES = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'portfolio', label: 'Portfolio', path: '/portfolio' },
  { id: 'gallery', label: 'Gallery', path: '/gallery' },
  { id: 'founder', label: 'Founder', path: '/founder' },
  { id: 'cofounder', label: 'Co-Founder', path: '/co-founder' },
];

const initialSeo = {
  home: {
    title: 'Light Construction — Building the Future',
    description: 'Light Construction delivers world-class residential, commercial, and infrastructure projects across Ethiopia and East Africa. Request a free quote today.',
    keywords: 'construction Ethiopia, building company Addis Ababa, commercial construction, residential projects',
    ogImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    ogTitle: '',
    ogDescription: '',
  },
  about: {
    title: 'About Us — Light Construction',
    description: 'Learn about Light Construction\'s story, mission, values, and the expert team behind 150+ successful projects since 2010.',
    keywords: 'about Light Construction, construction company Ethiopia, Abebe Girma, construction team',
    ogImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80',
    ogTitle: '',
    ogDescription: '',
  },
  services: {
    title: 'Our Services — Light Construction',
    description: 'Explore our full range of construction services including commercial, residential, renovation, project management, design, and safety compliance.',
    keywords: 'construction services Ethiopia, commercial building, residential construction, renovation',
    ogImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    ogTitle: '',
    ogDescription: '',
  },
  portfolio: {
    title: 'Portfolio — Light Construction',
    description: 'Browse our portfolio of completed and ongoing projects across Ethiopia and East Africa.',
    keywords: 'construction portfolio Ethiopia, completed projects, building projects Addis Ababa',
    ogImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    ogTitle: '',
    ogDescription: '',
  },
  gallery: {
    title: 'Gallery — Light Construction',
    description: 'View photos and videos from our construction sites and completed projects.',
    keywords: 'construction gallery, building photos Ethiopia, construction site images',
    ogImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    ogTitle: '',
    ogDescription: '',
  },
  founder: {
    title: 'Abebe Girma — Founder & CEO, Light Construction',
    description: 'Learn about Abebe Girma, founder and CEO of Light Construction, with 20+ years of experience in construction across Ethiopia and East Africa.',
    keywords: 'Abebe Girma, Light Construction founder, CEO Ethiopia construction',
    ogImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    ogTitle: '',
    ogDescription: '',
  },
  cofounder: {
    title: 'Tigist Haile — Co-Founder & COO, Light Construction',
    description: 'Learn about Tigist Haile, co-founder and COO of Light Construction, leading project delivery and operations.',
    keywords: 'Tigist Haile, Light Construction co-founder, COO Ethiopia construction',
    ogImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
    ogTitle: '',
    ogDescription: '',
  },
};

const TITLE_MAX = 60;
const DESC_MAX = 160;

export default function SeoManager() {
  const [seo, setSeo] = useState(initialSeo);
  const [activePage, setActivePage] = useState('home');
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const page = seo[activePage] || {};
  const update = (field, val) => setSeo(s => ({ ...s, [activePage]: { ...s[activePage], [field]: val } }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const titleLen = page.title?.length || 0;
  const descLen = page.description?.length || 0;
  const titleColor = titleLen > TITLE_MAX ? 'var(--danger)' : titleLen > TITLE_MAX * 0.85 ? 'var(--warning)' : 'var(--success)';
  const descColor = descLen > DESC_MAX ? 'var(--danger)' : descLen > DESC_MAX * 0.85 ? 'var(--warning)' : 'var(--success)';

  const ogTitle = page.ogTitle || page.title || '';
  const ogDesc = page.ogDescription || page.description || '';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>SEO & Meta Manager</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Manage page titles, descriptions, and social sharing metadata</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, alignItems: 'start' }}>
        {/* Page List */}
        <div className="card" style={{ padding: 8 }}>
          {PAGES.map(p => (
            <button key={p.id} onClick={() => setActivePage(p.id)}
              style={{
                width: '100%', textAlign: 'left', background: activePage === p.id ? '#e8f4ff' : 'none',
                border: 'none', borderRadius: 8, padding: '10px 14px', cursor: 'pointer',
                color: activePage === p.id ? 'var(--primary)' : 'var(--text-primary)',
                fontWeight: activePage === p.id ? 600 : 400, fontSize: 14,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
              <span>{p.label}</span>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{p.path}</span>
            </button>
          ))}
        </div>

        {/* Editor */}
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '2px solid #e2e8f0' }}>
            {[
              { id: 'basic', label: 'Basic SEO', Icon: Search },
              { id: 'social', label: 'Social / OG', Icon: Share2 },
              { id: 'preview', label: 'Preview', Icon: Globe },
            ].map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '10px 20px',
                  fontSize: 14, fontWeight: activeTab === id ? 600 : 400,
                  color: activeTab === id ? 'var(--primary)' : 'var(--text-secondary)',
                  borderBottom: activeTab === id ? '2px solid var(--primary)' : '2px solid transparent',
                  marginBottom: -2, display: 'flex', alignItems: 'center', gap: 6,
                }}>
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          {activeTab === 'basic' && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label>Page Title</label>
                  <span style={{ fontSize: 12, color: titleColor, fontWeight: 600 }}>{titleLen}/{TITLE_MAX}</span>
                </div>
                <input className="form-control" value={page.title || ''} onChange={e => update('title', e.target.value)} placeholder="Page title for browser tab and search results" />
                <div style={{ marginTop: 6, height: 4, background: '#e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (titleLen / TITLE_MAX) * 100)}%`, height: '100%', background: titleColor, transition: 'width 0.2s, background 0.2s' }} />
                </div>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label>Meta Description</label>
                  <span style={{ fontSize: 12, color: descColor, fontWeight: 600 }}>{descLen}/{DESC_MAX}</span>
                </div>
                <textarea className="form-control" rows={3} value={page.description || ''} onChange={e => update('description', e.target.value)} placeholder="Brief description shown in search engine results" />
                <div style={{ marginTop: 6, height: 4, background: '#e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (descLen / DESC_MAX) * 100)}%`, height: '100%', background: descColor, transition: 'width 0.2s, background 0.2s' }} />
                </div>
              </div>

              <div className="form-group">
                <label>Keywords</label>
                <input className="form-control" value={page.keywords || ''} onChange={e => update('keywords', e.target.value)} placeholder="comma, separated, keywords" />
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Note: Modern search engines rely less on meta keywords, but they can still be useful.</p>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', background: '#e8f4ff', borderRadius: 8, padding: '10px 14px' }}>
                Open Graph tags control how your pages appear when shared on Facebook, LinkedIn, WhatsApp, etc. Leave blank to use the basic SEO values.
              </p>
              <div className="form-group">
                <label>OG Title (optional)</label>
                <input className="form-control" value={page.ogTitle || ''} onChange={e => update('ogTitle', e.target.value)} placeholder={page.title || 'Defaults to page title'} />
              </div>
              <div className="form-group">
                <label>OG Description (optional)</label>
                <textarea className="form-control" rows={3} value={page.ogDescription || ''} onChange={e => update('ogDescription', e.target.value)} placeholder={page.description || 'Defaults to meta description'} />
              </div>
              <div className="form-group">
                <label>OG Image URL</label>
                <input className="form-control" value={page.ogImage || ''} onChange={e => update('ogImage', e.target.value)} placeholder="https://... (recommended: 1200×630px)" />
                {page.ogImage && <img src={page.ogImage} alt="OG preview" style={{ marginTop: 8, width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />}
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Google Preview */}
              <div className="card">
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 14 }}>Google Search Preview</p>
                <div style={{ maxWidth: 600 }}>
                  <div style={{ fontSize: 12, color: '#006621', marginBottom: 2 }}>lightconstruction.com{PAGES.find(p => p.id === activePage)?.path}</div>
                  <div style={{ fontSize: 18, color: '#1a0dab', marginBottom: 4, fontWeight: 400, lineHeight: 1.3 }}>{page.title || 'Page Title'}</div>
                  <div style={{ fontSize: 13, color: '#545454', lineHeight: 1.5 }}>{page.description || 'Meta description will appear here...'}</div>
                </div>
              </div>

              {/* Social Preview */}
              <div className="card">
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 14 }}>Social Share Preview</p>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', maxWidth: 500 }}>
                  {page.ogImage && <img src={page.ogImage} alt="og" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />}
                  <div style={{ padding: '12px 16px', background: '#f8f9fa' }}>
                    <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', marginBottom: 4 }}>LIGHTCONSTRUCTION.COM</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{ogTitle || 'Page Title'}</div>
                    <div style={{ fontSize: 13, color: '#555', lineHeight: 1.4 }}>{ogDesc || 'Description...'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
