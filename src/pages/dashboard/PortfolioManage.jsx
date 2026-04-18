import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save, MapPin, User, DollarSign, Clock } from 'lucide-react';
import { portfolioProjects as initialProjects } from '../../data/mockData';

const CATEGORIES = ['Residential', 'Commercial', 'Infrastructure', 'Hospitality', 'Industrial'];

const emptyProject = {
  id: null,
  title: '',
  category: 'Residential',
  img: '',
  year: new Date().getFullYear(),
  location: '',
  client: '',
  value: '',
  duration: '',
  desc: '',
  gallery: [],
  hidden: false,
};

export default function PortfolioManage() {
  const [projects, setProjects] = useState(
    initialProjects.map(p => ({ ...p, hidden: false }))
  );
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [galleryInput, setGalleryInput] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = filterCat === 'All' ? projects : projects.filter(p => p.category === filterCat);

  const openAdd = () => {
    setForm({ ...emptyProject, id: Date.now() });
    setGalleryInput('');
    setModal('add');
  };

  const openEdit = (proj) => {
    setForm({ ...proj });
    setGalleryInput('');
    setModal('edit');
  };

  const closeModal = () => { setModal(null); setForm(emptyProject); };

  const handleSave = () => {
    if (!form.title.trim() || !form.category) return;
    if (modal === 'add') {
      setProjects(prev => [...prev, { ...form }]);
    } else {
      setProjects(prev => prev.map(p => p.id === form.id ? { ...form } : p));
    }
    closeModal();
  };

  const toggleHide = (id) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, hidden: !p.hidden } : p));
  };

  const handleDelete = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  const addGalleryImg = () => {
    if (!galleryInput.trim()) return;
    setForm(f => ({ ...f, gallery: [...f.gallery, galleryInput.trim()] }));
    setGalleryInput('');
  };

  const removeGalleryImg = (idx) => {
    setForm(f => ({ ...f, gallery: f.gallery.filter((_, i) => i !== idx) }));
  };

  const cats = ['All', ...CATEGORIES];
  const visible = projects.filter(p => !p.hidden).length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Portfolio Management</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            {projects.length} projects · {visible} visible on website
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilterCat(c)}
            className={filterCat === c ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}>
            {c}
            {c !== 'All' && (
              <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.8 }}>
                ({projects.filter(p => p.category === c).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {filtered.map(proj => (
          <div key={proj.id} className="card" style={{ padding: 0, overflow: 'hidden', opacity: proj.hidden ? 0.55 : 1, transition: 'opacity 0.2s' }}>
            {/* Image */}
            <div style={{ position: 'relative', height: 180 }}>
              <img src={proj.img || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80'}
                alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
                <span style={{ fontSize: 11, background: 'var(--primary)', color: '#fff', borderRadius: 6, padding: '3px 8px', fontWeight: 600 }}>{proj.category}</span>
                <span style={{ fontSize: 11, background: 'rgba(0,0,0,0.6)', color: '#fff', borderRadius: 6, padding: '3px 8px' }}>{proj.year}</span>
              </div>
              {proj.hidden && (
                <div style={{ position: 'absolute', top: 10, right: 10, background: '#f0f0f0', color: '#888', fontSize: 11, borderRadius: 6, padding: '3px 8px', fontWeight: 600 }}>HIDDEN</div>
              )}
              {/* Action overlay */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', padding: '20px 12px 10px', display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                <button onClick={() => openEdit(proj)}
                  style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: 'var(--primary)', display: 'flex', alignItems: 'center' }}
                  title="Edit"><Pencil size={14} /></button>
                <button onClick={() => toggleHide(proj.id)}
                  style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: proj.hidden ? '#b8860b' : '#666', display: 'flex', alignItems: 'center' }}
                  title={proj.hidden ? 'Show' : 'Hide'}>
                  {proj.hidden ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button onClick={() => setDeleteConfirm(proj.id)}
                  style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: 'var(--danger)', display: 'flex', alignItems: 'center' }}
                  title="Delete"><Trash2 size={14} /></button>
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '14px 16px' }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{proj.title}</h4>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {proj.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {proj.location && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)' }}>
                    <MapPin size={12} /> {proj.location}
                  </span>
                )}
                {proj.value && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)' }}>
                    <DollarSign size={12} /> {proj.value}
                  </span>
                )}
                {proj.client && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)' }}>
                    <User size={12} /> {proj.client}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
          <p>No projects in this category.</p>
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
              <h3 style={{ marginBottom: 8 }}>Delete Project?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
                This will permanently remove the portfolio project. This action cannot be undone.
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
          <div className="modal" style={{ maxWidth: 660, maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal === 'add' ? 'Add Portfolio Project' : 'Edit Portfolio Project'}</h3>
              <button className="modal-close" onClick={closeModal}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Title + Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Project Title *</label>
                  <input className="form-control" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Riverside Apartments" />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select className="form-control" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" rows={3} value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Project description..." />
              </div>

              {/* Main Image */}
              <div className="form-group">
                <label>Main Image URL</label>
                <input className="form-control" value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} placeholder="https://..." />
                {form.img && <img src={form.img} alt="preview" style={{ marginTop: 8, height: 100, width: '100%', objectFit: 'cover', borderRadius: 8 }} />}
              </div>

              {/* Location + Client + Value + Duration + Year */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Location</label>
                  <input className="form-control" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="City, Country" />
                </div>
                <div className="form-group">
                  <label>Client</label>
                  <input className="form-control" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} placeholder="Client name" />
                </div>
                <div className="form-group">
                  <label>Project Value</label>
                  <input className="form-control" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} placeholder="e.g. $850,000" />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input className="form-control" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="e.g. 18 months" />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input className="form-control" type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: Number(e.target.value) }))} />
                </div>
              </div>

              {/* Gallery Images */}
              <div className="form-group">
                <label>Gallery Images</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input className="form-control" value={galleryInput} onChange={e => setGalleryInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addGalleryImg())}
                    placeholder="Paste image URL and press Enter or Add" />
                  <button className="btn btn-outline btn-sm" onClick={addGalleryImg} style={{ whiteSpace: 'nowrap' }}>Add</button>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {form.gallery.map((url, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <img src={url} alt="" style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6 }} />
                      <button onClick={() => removeGalleryImg(i)}
                        style={{ position: 'absolute', top: -6, right: -6, background: 'var(--danger)', border: 'none', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 8 }}>
                <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Save size={15} /> {modal === 'add' ? 'Add Project' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
