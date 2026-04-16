import { useState, useRef } from 'react';
import { Upload, Trash2, Image, Video, X, Plus } from 'lucide-react';
import { galleryItems as initial } from '../../data/mockData';

const categories = ['Construction', 'Planning', 'Completed', 'Infrastructure', 'Commercial'];

export default function GalleryManage() {
  const [items, setItems] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ title: '', category: 'Construction', type: 'photo', src: '' });
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setForm(f => ({ ...f, src: url, type: file.type.startsWith('video') ? 'video' : 'photo' }));
  };

  const handleAdd = () => {
    if (!form.title || !form.src) return;
    setItems(prev => [...prev, { id: Date.now(), ...form }]);
    setForm({ title: '', category: 'Construction', type: 'photo', src: '' });
    setPreview(null);
    setShowModal(false);
  };

  const handleDelete = (id) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['All', ...categories].map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: '6px 16px', borderRadius: 20, border: '1.5px solid',
              borderColor: filter === c ? 'var(--primary)' : '#e2e8f0',
              background: filter === c ? 'var(--primary)' : '#fff',
              color: filter === c ? '#fff' : 'var(--text-secondary)',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>{c}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}><Upload size={16} /> Upload Media</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {[
          [Image, 'Photos', items.filter(i => i.type === 'photo').length, '#e8f4ff', 'var(--primary)'],
          [Video, 'Videos', items.filter(i => i.type === 'video').length, '#fff3cd', 'var(--warning)'],
        ].map(([Icon, label, count, bg, color]) => (
          <div key={label} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px' }}>
            <div style={{ width: 44, height: 44, background: bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'Montserrat', color }}>{count}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {filtered.map(item => (
          <div key={item.id} style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow)', background: '#000' }}
            onMouseEnter={e => e.currentTarget.querySelector('.del-btn').style.opacity = 1}
            onMouseLeave={e => e.currentTarget.querySelector('.del-btn').style.opacity = 0}>
            {item.type === 'video'
              ? <video src={item.src} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} muted />
              : <img src={item.src} alt={item.title} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
            }
            <div style={{ padding: '10px 12px', background: '#fff' }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{item.category}</span>
                <span style={{ fontSize: 11, background: item.type === 'video' ? '#fff3cd' : '#e8f4ff', color: item.type === 'video' ? '#856404' : 'var(--primary)', padding: '1px 6px', borderRadius: 10, fontWeight: 600 }}>
                  {item.type}
                </span>
              </div>
            </div>
            <button className="del-btn" onClick={() => handleDelete(item.id)} style={{
              position: 'absolute', top: 8, right: 8,
              background: 'var(--danger)', border: 'none', color: '#fff',
              borderRadius: 8, padding: 6, display: 'flex', cursor: 'pointer',
              opacity: 0, transition: 'opacity 0.2s',
            }}><Trash2 size={14} /></button>
          </div>
        ))}

        {/* Upload placeholder */}
        <div onClick={() => setShowModal(true)} style={{
          borderRadius: 12, border: '2px dashed #e2e8f0', height: 220,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 8, cursor: 'pointer', color: 'var(--text-secondary)', transition: 'border-color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
          <Plus size={28} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Upload Media</span>
        </div>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>No media in this category.</div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>Upload Media</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>

            {/* Drop zone */}
            <div onClick={() => fileRef.current.click()} style={{
              border: '2px dashed #e2e8f0', borderRadius: 10, padding: '32px 24px',
              textAlign: 'center', cursor: 'pointer', marginBottom: 20, transition: 'border-color 0.2s',
              background: preview ? '#f8f9fa' : '#fff',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
              {preview ? (
                form.type === 'video'
                  ? <video src={preview} style={{ maxHeight: 160, borderRadius: 8 }} muted />
                  : <img src={preview} alt="preview" style={{ maxHeight: 160, borderRadius: 8, objectFit: 'cover' }} />
              ) : (
                <>
                  <Upload size={32} color="var(--text-secondary)" style={{ margin: '0 auto 8px' }} />
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Click to upload photo or video</p>
                  <p style={{ color: '#aaa', fontSize: 12, marginTop: 4 }}>JPG, PNG, MP4, MOV supported</p>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display: 'none' }} onChange={handleFile} />
            </div>

            <div className="form-group"><label>Title *</label><input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Media title" /></div>
            <div className="form-group"><label>Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
              <button className="btn btn-outline" onClick={() => { setShowModal(false); setPreview(null); }}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd} disabled={!form.title || !form.src}>
                <Upload size={15} /> Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
