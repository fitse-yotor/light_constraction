import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save, Star } from 'lucide-react';
import { testimonials as initialData } from '../../data/mockData';

const empty = { id: null, name: '', company: '', text: '', img: '', rating: 5, hidden: false };

export default function TestimonialsManage() {
  const [items, setItems] = useState(initialData.map((t, i) => ({ ...t, id: i + 1, hidden: false, rating: 5 })));
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openAdd = () => { setForm({ ...empty, id: Date.now() }); setModal('add'); };
  const openEdit = (t) => { setForm({ ...t }); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(empty); };

  const handleSave = () => {
    if (!form.name.trim() || !form.text.trim()) return;
    if (modal === 'add') setItems(p => [...p, { ...form }]);
    else setItems(p => p.map(t => t.id === form.id ? { ...form } : t));
    closeModal();
  };

  const toggleHide = (id) => setItems(p => p.map(t => t.id === id ? { ...t, hidden: !t.hidden } : t));
  const handleDelete = (id) => { setItems(p => p.filter(t => t.id !== id)); setDeleteConfirm(null); };

  const visible = items.filter(t => !t.hidden).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Testimonials</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{items.length} testimonials · {visible} visible on website</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {items.map(t => (
          <div key={t.id} className="card" style={{ opacity: t.hidden ? 0.55 : 1, transition: 'opacity 0.2s', position: 'relative' }}>
            {t.hidden && <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 11, background: '#f0f0f0', color: '#888', borderRadius: 4, padding: '2px 7px', fontWeight: 600 }}>HIDDEN</span>}
            <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
              <button onClick={() => openEdit(t)} style={{ background: '#e8f4ff', border: 'none', borderRadius: 7, padding: '5px 8px', cursor: 'pointer', color: 'var(--primary)', display: 'flex' }}><Pencil size={13} /></button>
              <button onClick={() => toggleHide(t.id)} style={{ background: t.hidden ? '#fff3cd' : '#f0f0f0', border: 'none', borderRadius: 7, padding: '5px 8px', cursor: 'pointer', color: t.hidden ? '#b8860b' : '#666', display: 'flex' }} title={t.hidden ? 'Show' : 'Hide'}>
                {t.hidden ? <Eye size={13} /> : <EyeOff size={13} />}
              </button>
              <button onClick={() => setDeleteConfirm(t.id)} style={{ background: '#fde8e8', border: 'none', borderRadius: 7, padding: '5px 8px', cursor: 'pointer', color: 'var(--danger)', display: 'flex' }}><Trash2 size={13} /></button>
            </div>

            <div style={{ display: 'flex', gap: 4, marginBottom: 12, marginTop: 4 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < t.rating ? '#F59E0B' : 'none'} color={i < t.rating ? '#F59E0B' : '#d1d5db'} />)}
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{t.text}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={t.img || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-light)' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--primary)' }}>{t.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
              <div style={{ width: 56, height: 56, background: '#fde8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Trash2 size={24} color="var(--danger)" />
              </div>
              <h3 style={{ marginBottom: 8 }}>Delete Testimonial?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>This action cannot be undone.</p>
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
          <div className="modal" style={{ maxWidth: 540 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal === 'add' ? 'Add Testimonial' : 'Edit Testimonial'}</h3>
              <button className="modal-close" onClick={closeModal}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Client Name *</label>
                  <input className="form-control" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Yohannes Tesfaye" />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input className="form-control" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="e.g. Tesfaye Real Estate" />
                </div>
              </div>
              <div className="form-group">
                <label>Testimonial Text *</label>
                <textarea className="form-control" rows={4} value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} placeholder="What the client said..." />
              </div>
              <div className="form-group">
                <label>Photo URL</label>
                <input className="form-control" value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => setForm(f => ({ ...f, rating: n }))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                      <Star size={22} fill={n <= form.rating ? '#F59E0B' : 'none'} color={n <= form.rating ? '#F59E0B' : '#d1d5db'} />
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 4 }}>
                <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Save size={15} /> {modal === 'add' ? 'Add' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
