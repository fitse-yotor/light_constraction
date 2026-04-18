import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save, Megaphone, AlertTriangle, Info, CheckCircle } from 'lucide-react';

const TYPES = [
  { value: 'info', label: 'Info', color: 'var(--primary)', bg: '#e8f4ff', Icon: Info },
  { value: 'success', label: 'Success', color: 'var(--success)', bg: '#d4edda', Icon: CheckCircle },
  { value: 'warning', label: 'Warning', color: '#b8860b', bg: '#fff3cd', Icon: AlertTriangle },
  { value: 'promo', label: 'Promo', color: '#7c3aed', bg: '#ede9fe', Icon: Megaphone },
];

const empty = {
  id: null, title: '', message: '', type: 'info',
  startDate: '', endDate: '', hidden: false, pinned: false,
};

const initialAnnouncements = [
  { id: 1, title: 'New Project Launch', message: 'We are excited to announce the start of the Lakeside Resort Phase 2 project in Ziway.', type: 'success', startDate: '2026-04-01', endDate: '2026-05-01', hidden: false, pinned: true },
  { id: 2, title: 'Office Closure Notice', message: 'Our offices will be closed on April 25th for the Ethiopian Easter holiday.', type: 'info', startDate: '2026-04-20', endDate: '2026-04-26', hidden: false, pinned: false },
  { id: 3, title: 'We Are Hiring!', message: 'Light Construction is looking for experienced structural engineers and site supervisors. Apply now.', type: 'promo', startDate: '2026-04-01', endDate: '2026-06-30', hidden: false, pinned: false },
];

export default function AnnouncementsManage() {
  const [items, setItems] = useState(initialAnnouncements);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [preview, setPreview] = useState(true);

  const openAdd = () => { setForm({ ...empty, id: Date.now() }); setModal('add'); };
  const openEdit = (a) => { setForm({ ...a }); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(empty); };

  const handleSave = () => {
    if (!form.title.trim() || !form.message.trim()) return;
    if (modal === 'add') setItems(p => [...p, { ...form }]);
    else setItems(p => p.map(a => a.id === form.id ? { ...form } : a));
    closeModal();
  };

  const toggleHide = (id) => setItems(p => p.map(a => a.id === id ? { ...a, hidden: !a.hidden } : a));
  const togglePin = (id) => setItems(p => p.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a));
  const handleDelete = (id) => { setItems(p => p.filter(a => a.id !== id)); setDeleteConfirm(null); };

  const active = items.filter(a => !a.hidden);
  const pinned = items.filter(a => a.pinned && !a.hidden);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Announcements</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{items.length} total · {active.length} active · {pinned.length} pinned</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className={preview ? 'btn btn-outline btn-sm' : 'btn btn-sm'} style={!preview ? { background: 'var(--bg)', border: '1.5px solid #e2e8f0', color: 'var(--text-secondary)' } : {}} onClick={() => setPreview(p => !p)}>
            {preview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button className="btn btn-primary" onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Plus size={16} /> New Announcement
          </button>
        </div>
      </div>

      {/* Live Preview Banner */}
      {preview && pinned.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Website Banner Preview</p>
          {pinned.map(a => {
            const t = TYPES.find(t => t.value === a.type) || TYPES[0];
            return (
              <div key={a.id} style={{ background: t.bg, borderLeft: `4px solid ${t.color}`, borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <t.Icon size={18} color={t.color} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: t.color }}>{a.title}: </span>
                  <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{a.message}</span>
                </div>
                <span style={{ fontSize: 11, color: t.color, fontWeight: 600, background: t.color + '22', padding: '2px 8px', borderRadius: 20 }}>PINNED</span>
              </div>
            );
          })}
        </div>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map(a => {
          const t = TYPES.find(t => t.value === a.type) || TYPES[0];
          return (
            <div key={a.id} className="card" style={{ padding: '16px 20px', opacity: a.hidden ? 0.55 : 1, transition: 'opacity 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 40, height: 40, background: t.bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <t.Icon size={18} color={t.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{a.title}</span>
                    <span style={{ fontSize: 11, background: t.bg, color: t.color, borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>{t.label}</span>
                    {a.pinned && <span style={{ fontSize: 11, background: '#ede9fe', color: '#7c3aed', borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>📌 Pinned</span>}
                    {a.hidden && <span style={{ fontSize: 11, background: '#f0f0f0', color: '#888', borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>Hidden</span>}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{a.message}</p>
                  {(a.startDate || a.endDate) && (
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>
                      {a.startDate && <span>From {a.startDate}</span>}
                      {a.endDate && <span> · Until {a.endDate}</span>}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button onClick={() => togglePin(a.id)} title={a.pinned ? 'Unpin' : 'Pin to website'}
                    style={{ background: a.pinned ? '#ede9fe' : '#f0f0f0', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: a.pinned ? '#7c3aed' : '#666', fontSize: 14 }}>
                    📌
                  </button>
                  <button onClick={() => openEdit(a)} style={{ background: '#e8f4ff', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: 'var(--primary)', display: 'flex' }}><Pencil size={14} /></button>
                  <button onClick={() => toggleHide(a.id)} style={{ background: a.hidden ? '#fff3cd' : '#f0f0f0', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: a.hidden ? '#b8860b' : '#666', display: 'flex' }}>
                    {a.hidden ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={() => setDeleteConfirm(a.id)} style={{ background: '#fde8e8', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: 'var(--danger)', display: 'flex' }}><Trash2 size={14} /></button>
                </div>
              </div>
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
              <h3 style={{ marginBottom: 8 }}>Delete Announcement?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="btn btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="btn" style={{ background: 'var(--danger)', color: '#fff', border: 'none' }} onClick={() => handleDelete(deleteConfirm)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" style={{ maxWidth: 540 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal === 'add' ? 'New Announcement' : 'Edit Announcement'}</h3>
              <button className="modal-close" onClick={closeModal}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label>Title *</label>
                <input className="form-control" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Announcement title" />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea className="form-control" rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Announcement body..." />
              </div>
              <div className="form-group">
                <label>Type</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {TYPES.map(t => (
                    <button key={t.value} onClick={() => setForm(f => ({ ...f, type: t.value }))}
                      style={{ padding: '6px 14px', borderRadius: 20, border: '2px solid', borderColor: form.type === t.value ? t.color : '#e2e8f0', background: form.type === t.value ? t.bg : '#fff', color: form.type === t.value ? t.color : 'var(--text-secondary)', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <t.Icon size={13} /> {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Start Date</label>
                  <input className="form-control" type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input className="form-control" type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
                <input type="checkbox" checked={form.pinned} onChange={e => setForm(f => ({ ...f, pinned: e.target.checked }))} style={{ width: 16, height: 16 }} />
                Pin this announcement to the website banner
              </label>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 4 }}>
                <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Save size={15} /> {modal === 'add' ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
