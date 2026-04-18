import { useState } from 'react';
import { Save, Plus, Pencil, Trash2, X, User, Eye, EyeOff } from 'lucide-react';
import { teamMembers as initialTeam } from '../../data/mockData';

const initialAbout = {
  heroTitle: 'Building the Future Together',
  heroSubtitle: 'We are a leading construction company dedicated to delivering excellence in every project.',
  storyTitle: 'Our Story',
  storyText: `Founded in 2010, Light Construction began with a simple mission: to build structures that stand the test of time while delivering exceptional value to our clients. What started as a small team of passionate engineers and architects has grown into one of Ethiopia's most respected construction firms.\n\nOver the years, we have delivered more than 150 projects across residential, commercial, and infrastructure sectors — each one a testament to our commitment to quality, safety, and innovation.`,
  storyImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  stats: [
    { label: 'Projects Completed', value: '150+' },
    { label: 'Years Experience', value: '15+' },
    { label: 'Team Members', value: '50+' },
    { label: 'Client Satisfaction', value: '98%' },
  ],
  values: [
    { title: 'Excellence', desc: 'We hold ourselves to the highest standards in every project we undertake.' },
    { title: 'Collaboration', desc: 'We work closely with clients, partners, and communities to achieve shared goals.' },
    { title: 'Integrity', desc: 'Transparency and honesty are the foundation of every relationship we build.' },
  ],
};

const emptyMember = { id: null, name: '', role: '', img: '', bio: '' };

export default function AboutManage() {
  const [about, setAbout] = useState(initialAbout);
  const [team, setTeam] = useState(initialTeam.map((m, i) => ({ ...m, id: i + 1, hidden: false })));
  const [activeTab, setActiveTab] = useState('content');
  const [teamModal, setTeamModal] = useState(null);
  const [memberForm, setMemberForm] = useState(emptyMember);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);

  /* ── About content ── */
  const handleSaveAbout = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateStat = (idx, field, val) => {
    setAbout(a => ({ ...a, stats: a.stats.map((s, i) => i === idx ? { ...s, [field]: val } : s) }));
  };

  const updateValue = (idx, field, val) => {
    setAbout(a => ({ ...a, values: a.values.map((v, i) => i === idx ? { ...v, [field]: val } : v) }));
  };

  /* ── Team ── */
  const openAddMember = () => {
    setMemberForm({ ...emptyMember, id: Date.now() });
    setTeamModal('add');
  };

  const openEditMember = (m) => {
    setMemberForm({ ...m });
    setTeamModal('edit');
  };

  const closeTeamModal = () => { setTeamModal(null); setMemberForm(emptyMember); };

  const handleSaveMember = () => {
    if (!memberForm.name.trim() || !memberForm.role.trim()) return;
    if (teamModal === 'add') {
      setTeam(prev => [...prev, { ...memberForm }]);
    } else {
      setTeam(prev => prev.map(m => m.id === memberForm.id ? { ...memberForm } : m));
    }
    closeTeamModal();
  };

  const handleDeleteMember = (id) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    setDeleteConfirm(null);
  };

  const toggleHideMember = (id) => {
    setTeam(prev => prev.map(m => m.id === id ? { ...m, hidden: !m.hidden } : m));
  };

  const tabs = [
    { id: 'content', label: 'Page Content' },
    { id: 'team', label: 'Team Members' },
    { id: 'stats', label: 'Stats & Values' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>About Page Management</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Edit the About page content, team members, and company stats</p>
        </div>
        {activeTab !== 'team' && (
          <button className="btn btn-primary" onClick={handleSaveAbout} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
        )}
        {activeTab === 'team' && (
          <button className="btn btn-primary" onClick={openAddMember} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Plus size={16} /> Add Member
          </button>
        )}      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '2px solid var(--border)', paddingBottom: 0 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '10px 20px',
              fontSize: 14, fontWeight: activeTab === t.id ? 600 : 400,
              color: activeTab === t.id ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === t.id ? '2px solid var(--primary)' : '2px solid transparent',
              marginBottom: -2, transition: 'all 0.2s',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Page Content ── */}
      {activeTab === 'content' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <h4 style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>Hero Section</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="form-group">
                <label>Hero Title</label>
                <input className="form-control" value={about.heroTitle} onChange={e => setAbout(a => ({ ...a, heroTitle: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Hero Subtitle</label>
                <textarea className="form-control" rows={2} value={about.heroSubtitle} onChange={e => setAbout(a => ({ ...a, heroSubtitle: e.target.value }))} />
              </div>
            </div>
          </div>

          <div className="card">
            <h4 style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>Our Story Section</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="form-group">
                <label>Section Title</label>
                <input className="form-control" value={about.storyTitle} onChange={e => setAbout(a => ({ ...a, storyTitle: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Story Text</label>
                <textarea className="form-control" rows={6} value={about.storyText} onChange={e => setAbout(a => ({ ...a, storyText: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Story Image URL</label>
                <input className="form-control" value={about.storyImg} onChange={e => setAbout(a => ({ ...a, storyImg: e.target.value }))} placeholder="https://..." />
                {about.storyImg && <img src={about.storyImg} alt="preview" style={{ marginTop: 8, height: 120, width: '100%', objectFit: 'cover', borderRadius: 8 }} />}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Team Members ── */}
      {activeTab === 'team' && (
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>
            {team.length} members · {team.filter(m => !m.hidden).length} visible on website
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {team.map(member => (
              <div key={member.id} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 20px', position: 'relative', opacity: member.hidden ? 0.55 : 1, transition: 'opacity 0.2s' }}>
                {member.hidden && (
                  <div style={{ position: 'absolute', top: 12, left: 12, fontSize: 11, background: '#f0f0f0', color: '#888', borderRadius: 4, padding: '2px 7px', fontWeight: 600 }}>HIDDEN</div>
                )}
                {/* Actions */}
                <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
                  <button onClick={() => openEditMember(member)}
                    style={{ background: '#e8f4ff', border: 'none', borderRadius: 7, padding: '5px 8px', cursor: 'pointer', color: 'var(--primary)', display: 'flex' }}>
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => toggleHideMember(member.id)}
                    style={{ background: member.hidden ? '#fff3cd' : '#f0f0f0', border: 'none', borderRadius: 7, padding: '5px 8px', cursor: 'pointer', color: member.hidden ? '#b8860b' : '#666', display: 'flex' }}
                    title={member.hidden ? 'Show on website' : 'Hide from website'}>
                    {member.hidden ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>
                  <button onClick={() => setDeleteConfirm(member.id)}
                    style={{ background: '#fde8e8', border: 'none', borderRadius: 7, padding: '5px 8px', cursor: 'pointer', color: 'var(--danger)', display: 'flex' }}>
                    <Trash2 size={13} />
                  </button>
                </div>

                <img src={member.img || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt={member.name}
                  style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '3px solid var(--primary-light)' }} />
                <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{member.name}</h4>
                <span style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, marginBottom: 8 }}>{member.role}</span>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab: Stats & Values ── */}
      {activeTab === 'stats' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <h4 style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>Company Stats</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {about.stats.map((stat, idx) => (
                <div key={idx} style={{ background: 'var(--bg)', borderRadius: 10, padding: 14 }}>
                  <div className="form-group" style={{ marginBottom: 8 }}>
                    <label style={{ fontSize: 11 }}>Value</label>
                    <input className="form-control" value={stat.value} onChange={e => updateStat(idx, 'value', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: 11 }}>Label</label>
                    <input className="form-control" value={stat.label} onChange={e => updateStat(idx, 'label', e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h4 style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>Core Values</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {about.values.map((val, idx) => (
                <div key={idx} style={{ background: 'var(--bg)', borderRadius: 10, padding: 14 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: 11 }}>Title</label>
                      <input className="form-control" value={val.title} onChange={e => updateValue(idx, 'title', e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: 11 }}>Description</label>
                      <input className="form-control" value={val.desc} onChange={e => updateValue(idx, 'desc', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
              <div style={{ width: 56, height: 56, background: '#fde8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Trash2 size={24} color="var(--danger)" />
              </div>
              <h3 style={{ marginBottom: 8 }}>Remove Team Member?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
                This will remove the team member from the About page.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="btn btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="btn" style={{ background: 'var(--danger)', color: '#fff', border: 'none' }} onClick={() => handleDeleteMember(deleteConfirm)}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Member Modal */}
      {teamModal && (
        <div className="modal-overlay" onClick={closeTeamModal}>
          <div className="modal" style={{ maxWidth: 500 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{teamModal === 'add' ? 'Add Team Member' : 'Edit Team Member'}</h3>
              <button className="modal-close" onClick={closeTeamModal}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Avatar preview */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
                <img src={memberForm.img || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt="preview"
                  style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-light)' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input className="form-control" value={memberForm.name} onChange={e => setMemberForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Abebe Girma" />
                </div>
                <div className="form-group">
                  <label>Role / Title *</label>
                  <input className="form-control" value={memberForm.role} onChange={e => setMemberForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Lead Engineer" />
                </div>
              </div>

              <div className="form-group">
                <label>Photo URL</label>
                <input className="form-control" value={memberForm.img} onChange={e => setMemberForm(f => ({ ...f, img: e.target.value }))} placeholder="https://..." />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea className="form-control" rows={3} value={memberForm.bio} onChange={e => setMemberForm(f => ({ ...f, bio: e.target.value }))} placeholder="Short biography..." />
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 4 }}>
                <button className="btn btn-outline" onClick={closeTeamModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveMember} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Save size={15} /> {teamModal === 'add' ? 'Add Member' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
