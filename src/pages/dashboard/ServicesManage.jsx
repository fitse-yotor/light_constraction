import { useState } from 'react';
import {
  Plus, Pencil, Trash2, Eye, EyeOff, X, Save,
  Building2, Home, Wrench, HardHat, Ruler, Shield, ChevronDown, ChevronUp
} from 'lucide-react';
import { services as initialServices } from '../../data/mockData';

const ICONS = ['Building2', 'Home', 'Wrench', 'HardHat', 'Ruler', 'Shield'];
const iconMap = { Building2, Home, Wrench, HardHat, Ruler, Shield };

const emptyService = {
  id: null,
  icon: 'Building2',
  title: '',
  desc: '',
  fullDesc: '',
  features: [],
  img: '',
  duration: '',
  projects: 0,
  hidden: false,
};

export default function ServicesManage() {
  const [services, setServices] = useState(
    initialServices.map(s => ({ ...s, hidden: false }))
  );
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [form, setForm] = useState(emptyService);
  const [featureInput, setFeatureInput] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  /* ── helpers ── */
  const openAdd = () => {
    setForm({ ...emptyService, id: Date.now() });
    setFeatureInput('');
    setModal('add');
  };

  const openEdit = (svc) => {
    setForm({ ...svc });
    setFeatureInput('');
    setModal('edit');
  };

  const closeModal = () => { setModal(null); setForm(emptyService); };

  const handleSave = () => {
    if (!form.title.trim() || !form.desc.trim()) return;
    if (modal === 'add') {
      setServices(prev => [...prev, { ...form }]);
    } else {
      setServices(prev => prev.map(s => s.id === form.id ? { ...form } : s));
    }
    closeModal();
  };

  const toggleHide = (id) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, hidden: !s.hidden } : s));
  };

  const handleDelete = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
    setDeleteConfirm(null);
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setForm(f => ({ ...f, features: [...f.features, featureInput.trim()] }));
    setFeatureInput('');
  };

  const removeFeature = (idx) => {
    setForm(f => ({ ...f, features: f.features.filter((_, i) => i !== idx) }));
  };

  const visible = services.filter(s => !s.hidden).length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Services Management</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            {services.length} services · {visible} visible on website
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* Services List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {services.map(svc => {
          const Icon = iconMap[svc.icon] || Building2;
          const expanded = expandedId === svc.id;
          return (
            <div key={svc.id} className="card" style={{ padding: 0, overflow: 'hidden', opacity: svc.hidden ? 0.55 : 1, transition: 'opacity 0.2s' }}>
              {/* Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}>
                {/* Icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: svc.hidden ? '#e0e0e0' : 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} color="#fff" />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{svc.title}</span>
                    {svc.hidden && (
                      <span style={{ fontSize: 11, background: '#f0f0f0', color: '#888', borderRadius: 4, padding: '2px 7px', fontWeight: 600 }}>HIDDEN</span>
                    )}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {svc.desc}
                  </p>
                </div>

                {/* Meta */}
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>{svc.projects}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Projects</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{svc.duration}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Duration</div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button onClick={() => setExpandedId(expanded ? null : svc.id)}
                    style={{ background: 'var(--bg)', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
                    title="Expand">
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <button onClick={() => openEdit(svc)}
                    style={{ background: '#e8f4ff', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'var(--primary)', display: 'flex', alignItems: 'center' }}
                    title="Edit">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => toggleHide(svc.id)}
                    style={{ background: svc.hidden ? '#fff3cd' : '#f0f0f0', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: svc.hidden ? '#b8860b' : '#666', display: 'flex', alignItems: 'center' }}
                    title={svc.hidden ? 'Show' : 'Hide'}>
                    {svc.hidden ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                  <button onClick={() => setDeleteConfirm(svc.id)}
                    style={{ background: '#fde8e8', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'var(--danger)', display: 'flex', alignItems: 'center' }}
                    title="Delete">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Expanded Detail */}
              {expanded && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '16px 20px', background: 'var(--bg)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>{svc.fullDesc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {svc.features.map((f, i) => (
                          <span key={i} style={{ fontSize: 12, background: '#e8f4ff', color: 'var(--primary)', borderRadius: 6, padding: '3px 10px' }}>{f}</span>
                        ))}
                      </div>
                    </div>
                    {svc.img && (
                      <img src={svc.img} alt={svc.title} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
              <div style={{ width: 56, height: 56, background: '#fde8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Trash2 size={24} color="var(--danger)" />
              </div>
              <h3 style={{ marginBottom: 8 }}>Delete Service?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
                This will permanently remove the service from the website. This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="btn btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="btn" style={{ background: 'var(--danger)', color: '#fff', border: 'none' }} onClick={() => handleDelete(deleteConfirm)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" style={{ maxWidth: 640, maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal === 'add' ? 'Add New Service' : 'Edit Service'}</h3>
              <button className="modal-close" onClick={closeModal}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Title + Icon */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
                <div className="form-group">
                  <label>Service Title *</label>
                  <input className="form-control" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Commercial Construction" />
                </div>
                <div className="form-group">
                  <label>Icon</label>
                  <select className="form-control" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}>
                    {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
              </div>

              {/* Short Desc */}
              <div className="form-group">
                <label>Short Description *</label>
                <input className="form-control" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Brief description shown on cards" />
              </div>

              {/* Full Desc */}
              <div className="form-group">
                <label>Full Description</label>
                <textarea className="form-control" rows={4} value={form.fullDesc} onChange={e => setForm(f => ({ ...f, fullDesc: e.target.value }))} placeholder="Detailed description for the service detail page" />
              </div>

              {/* Image URL */}
              <div className="form-group">
                <label>Image URL</label>
                <input className="form-control" value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} placeholder="https://..." />
              </div>

              {/* Duration + Projects */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Duration</label>
                  <input className="form-control" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="e.g. 6–24 months" />
                </div>
                <div className="form-group">
                  <label>Projects Completed</label>
                  <input className="form-control" type="number" value={form.projects} onChange={e => setForm(f => ({ ...f, projects: Number(e.target.value) }))} />
                </div>
              </div>

              {/* Features */}
              <div className="form-group">
                <label>Features</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input className="form-control" value={featureInput} onChange={e => setFeatureInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="Type a feature and press Enter or Add" />
                  <button className="btn btn-outline btn-sm" onClick={addFeature} style={{ whiteSpace: 'nowrap' }}>Add</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {form.features.map((f, i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, background: '#e8f4ff', color: 'var(--primary)', borderRadius: 6, padding: '3px 8px' }}>
                      {f}
                      <button onClick={() => removeFeature(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', padding: 0, display: 'flex' }}><X size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 8 }}>
                <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Save size={15} /> {modal === 'add' ? 'Add Service' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
