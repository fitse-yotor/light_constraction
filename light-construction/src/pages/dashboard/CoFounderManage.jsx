import { useState } from 'react';
import { Save, Plus, Trash2, X, GraduationCap, Award, Briefcase } from 'lucide-react';
import { coFounderData as initialData } from '../../data/mockData';

export default function CoFounderManage() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [bioInput, setBioInput] = useState('');
  const [milestoneInput, setMilestoneInput] = useState({ year: '', event: '' });
  const [eduInput, setEduInput] = useState({ degree: '', school: '', year: '' });
  const [awardInput, setAwardInput] = useState({ title: '', org: '', year: '' });
  const [projectInput, setProjectInput] = useState({ title: '', img: '', value: '', year: new Date().getFullYear() });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addBioParagraph = () => {
    if (!bioInput.trim()) return;
    setData(d => ({ ...d, bio: [...d.bio, bioInput.trim()] }));
    setBioInput('');
  };

  const removeBioParagraph = (idx) => {
    setData(d => ({ ...d, bio: d.bio.filter((_, i) => i !== idx) }));
  };

  const addMilestone = () => {
    if (!milestoneInput.year || !milestoneInput.event.trim()) return;
    setData(d => ({ ...d, milestones: [...d.milestones, { ...milestoneInput }] }));
    setMilestoneInput({ year: '', event: '' });
  };

  const removeMilestone = (idx) => {
    setData(d => ({ ...d, milestones: d.milestones.filter((_, i) => i !== idx) }));
  };

  const addEducation = () => {
    if (!eduInput.degree.trim() || !eduInput.school.trim()) return;
    setData(d => ({ ...d, education: [...d.education, { ...eduInput }] }));
    setEduInput({ degree: '', school: '', year: '' });
  };

  const removeEducation = (idx) => {
    setData(d => ({ ...d, education: d.education.filter((_, i) => i !== idx) }));
  };

  const addAward = () => {
    if (!awardInput.title.trim() || !awardInput.org.trim()) return;
    setData(d => ({ ...d, awards: [...d.awards, { ...awardInput }] }));
    setAwardInput({ title: '', org: '', year: '' });
  };

  const removeAward = (idx) => {
    setData(d => ({ ...d, awards: d.awards.filter((_, i) => i !== idx) }));
  };

  const addProject = () => {
    if (!projectInput.title.trim() || !projectInput.img.trim()) return;
    setData(d => ({ ...d, featuredProjects: [...d.featuredProjects, { ...projectInput }] }));
    setProjectInput({ title: '', img: '', value: '', year: new Date().getFullYear() });
  };

  const removeProject = (idx) => {
    setData(d => ({ ...d, featuredProjects: d.featuredProjects.filter((_, i) => i !== idx) }));
  };

  const updateStat = (idx, field, val) => {
    setData(d => ({ ...d, stats: d.stats.map((s, i) => i === idx ? { ...s, [field]: val } : s) }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile & Bio' },
    { id: 'career', label: 'Career & Milestones' },
    { id: 'credentials', label: 'Education & Awards' },
    { id: 'projects', label: 'Featured Projects' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Co-Founder Portfolio Management</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Edit {data.name}'s portfolio page content</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

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

      {/* ── Tab: Profile & Bio ── */}
      {activeTab === 'profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <h4 style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>Basic Information</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>Full Name</label>
                <input className="form-control" value={data.name} onChange={e => setData(d => ({ ...d, name: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input className="form-control" value={data.title} onChange={e => setData(d => ({ ...d, title: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label>Tagline</label>
              <input className="form-control" value={data.tagline} onChange={e => setData(d => ({ ...d, tagline: e.target.value }))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>Profile Image URL</label>
                <input className="form-control" value={data.img} onChange={e => setData(d => ({ ...d, img: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>Cover Image URL</label>
                <input className="form-control" value={data.coverImg} onChange={e => setData(d => ({ ...d, coverImg: e.target.value }))} placeholder="https://..." />
              </div>
            </div>
            {data.img && (
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <img src={data.img} alt="Profile" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-light)' }} />
                {data.coverImg && <img src={data.coverImg} alt="Cover" style={{ flex: 1, height: 80, objectFit: 'cover', borderRadius: 8 }} />}
              </div>
            )}
          </div>

          <div className="card">
            <h4 style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>Biography Paragraphs</h4>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <textarea className="form-control" rows={3} value={bioInput} onChange={e => setBioInput(e.target.value)}
                placeholder="Add a new biography paragraph..." />
              <button className="btn btn-primary btn-sm" onClick={addBioParagraph} style={{ alignSelf: 'flex-start', whiteSpace: 'nowrap' }}>
                <Plus size={14} /> Add
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.bio.map((para, i) => (
                <div key={i} style={{ background: 'var(--bg)', borderRadius: 8, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, margin: 0 }}>{para}</p>
                  <button onClick={() => removeBioParagraph(i)}
                    style={{ background: '#fde8e8', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', color: 'var(--danger)', display: 'flex', flexShrink: 0 }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h4 style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>Stats</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {data.stats.map((stat, idx) => (
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
        </div>
      )}

      {/* ── Tab: Career & Milestones ── */}
      {activeTab === 'career' && (
        <div className="card">
          <h4 style={{ marginBottom: 16, fontSize: 15, fontWeight: 600 }}>Career Milestones</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 8, marginBottom: 16, alignItems: 'center' }}>
            <input className="form-control" type="number" value={milestoneInput.year} onChange={e => setMilestoneInput(m => ({ ...m, year: e.target.value }))}
              placeholder="Year" style={{ width: 100 }} />
            <input className="form-control" value={milestoneInput.event} onChange={e => setMilestoneInput(m => ({ ...m, event: e.target.value }))}
              placeholder="Event description..." />
            <button className="btn btn-primary btn-sm" onClick={addMilestone} style={{ whiteSpace: 'nowrap' }}>
              <Plus size={14} /> Add
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {data.milestones.map((m, i) => (
              <div key={i} style={{ background: 'var(--bg)', borderRadius: 8, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1 }}>
                  <span style={{ background: 'var(--primary)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, flexShrink: 0 }}>{m.year}</span>
                  <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{m.event}</span>
                </div>
                <button onClick={() => removeMilestone(i)}
                  style={{ background: '#fde8e8', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', color: 'var(--danger)', display: 'flex', flexShrink: 0 }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab: Education & Awards ── */}
      {activeTab === 'credentials' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <GraduationCap size={20} color="var(--primary)" />
              <h4 style={{ fontSize: 15, fontWeight: 600 }}>Education</h4>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: 8, marginBottom: 16, alignItems: 'center' }}>
              <input className="form-control" value={eduInput.degree} onChange={e => setEduInput(ed => ({ ...ed, degree: e.target.value }))}
                placeholder="Degree" />
              <input className="form-control" value={eduInput.school} onChange={e => setEduInput(ed => ({ ...ed, school: e.target.value }))}
                placeholder="School" />
              <input className="form-control" type="number" value={eduInput.year} onChange={e => setEduInput(ed => ({ ...ed, year: e.target.value }))}
                placeholder="Year" style={{ width: 100 }} />
              <button className="btn btn-primary btn-sm" onClick={addEducation} style={{ whiteSpace: 'nowrap' }}>
                <Plus size={14} /> Add
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.education.map((e, i) => (
                <div key={i} style={{ background: 'var(--bg)', borderRadius: 8, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{e.degree}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{e.school}</div>
                    <div style={{ color: 'var(--primary)', fontSize: 12, marginTop: 2 }}>{e.year}</div>
                  </div>
                  <button onClick={() => removeEducation(i)}
                    style={{ background: '#fde8e8', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', color: 'var(--danger)', display: 'flex', flexShrink: 0 }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Award size={20} color="var(--warning)" />
              <h4 style={{ fontSize: 15, fontWeight: 600 }}>Awards & Recognition</h4>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: 8, marginBottom: 16, alignItems: 'center' }}>
              <input className="form-control" value={awardInput.title} onChange={e => setAwardInput(a => ({ ...a, title: e.target.value }))}
                placeholder="Award title" />
              <input className="form-control" value={awardInput.org} onChange={e => setAwardInput(a => ({ ...a, org: e.target.value }))}
                placeholder="Organization" />
              <input className="form-control" type="number" value={awardInput.year} onChange={e => setAwardInput(a => ({ ...a, year: e.target.value }))}
                placeholder="Year" style={{ width: 100 }} />
              <button className="btn btn-primary btn-sm" onClick={addAward} style={{ whiteSpace: 'nowrap' }}>
                <Plus size={14} /> Add
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.awards.map((a, i) => (
                <div key={i} style={{ background: 'var(--bg)', borderRadius: 8, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{a.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{a.org}</div>
                    <div style={{ color: 'var(--warning)', fontSize: 12, marginTop: 2 }}>{a.year}</div>
                  </div>
                  <button onClick={() => removeAward(i)}
                    style={{ background: '#fde8e8', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', color: 'var(--danger)', display: 'flex', flexShrink: 0 }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Featured Projects ── */}
      {activeTab === 'projects' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Briefcase size={20} color="var(--primary)" />
            <h4 style={{ fontSize: 15, fontWeight: 600 }}>Signature Projects</h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: 8, marginBottom: 16, alignItems: 'center' }}>
            <input className="form-control" value={projectInput.title} onChange={e => setProjectInput(p => ({ ...p, title: e.target.value }))}
              placeholder="Project title" />
            <input className="form-control" value={projectInput.img} onChange={e => setProjectInput(p => ({ ...p, img: e.target.value }))}
              placeholder="Image URL" />
            <input className="form-control" value={projectInput.value} onChange={e => setProjectInput(p => ({ ...p, value: e.target.value }))}
              placeholder="Value" style={{ width: 120 }} />
            <input className="form-control" type="number" value={projectInput.year} onChange={e => setProjectInput(p => ({ ...p, year: Number(e.target.value) }))}
              placeholder="Year" style={{ width: 100 }} />
            <button className="btn btn-primary btn-sm" onClick={addProject} style={{ whiteSpace: 'nowrap', gridColumn: 'span 4' }}>
              <Plus size={14} /> Add Project
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {data.featuredProjects.map((p, i) => (
              <div key={i} style={{ background: 'var(--bg)', borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
                <img src={p.img} alt={p.title} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{p.title}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{p.value}</span>
                    <span>{p.year}</span>
                  </div>
                </div>
                <button onClick={() => removeProject(i)}
                  style={{ position: 'absolute', top: 8, right: 8, background: 'var(--danger)', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', color: '#fff', display: 'flex' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
