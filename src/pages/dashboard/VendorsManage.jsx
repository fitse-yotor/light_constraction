import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Search, Phone, Mail, MapPin, Star } from 'lucide-react';

const CATEGORIES = ['Materials Supplier', 'Subcontractor', 'Equipment Rental', 'Consultant', 'Logistics', 'Other'];
const STATUS = ['Active', 'Inactive', 'Blacklisted'];

const initialVendors = [
  { id: 1, name: 'Addis Steel Works', category: 'Materials Supplier', contact: 'Kebede Alemu', phone: '+251 911 100 200', email: 'info@addissteelworks.com', location: 'Addis Ababa', rating: 5, status: 'Active', notes: 'Primary steel supplier. Reliable delivery, competitive pricing.' },
  { id: 2, name: 'Habesha Electrical', category: 'Subcontractor', contact: 'Mulugeta Bekele', phone: '+251 922 300 400', email: 'habeshaelec@gmail.com', location: 'Addis Ababa', rating: 4, status: 'Active', notes: 'Handles all MEP electrical work. Good safety record.' },
  { id: 3, name: 'East Africa Crane Hire', category: 'Equipment Rental', contact: 'James Omondi', phone: '+254 700 123 456', email: 'hire@eacrane.co.ke', location: 'Nairobi, Kenya', rating: 4, status: 'Active', notes: 'Heavy equipment rental. 48hr notice required.' },
  { id: 4, name: 'Tigray Cement Factory', category: 'Materials Supplier', contact: 'Alem Tesfaye', phone: '+251 934 500 600', email: 'sales@tigraycf.com', location: 'Mekelle, Ethiopia', rating: 3, status: 'Inactive', notes: 'Cement supplier. Currently inactive due to logistics issues.' },
  { id: 5, name: 'Structural Consult PLC', category: 'Consultant', contact: 'Dr. Yonas Girma', phone: '+251 911 700 800', email: 'yonas@structconsult.com', location: 'Addis Ababa', rating: 5, status: 'Active', notes: 'Structural engineering consultant for high-rise projects.' },
];

const empty = { id: null, name: '', category: 'Materials Supplier', contact: '', phone: '', email: '', location: '', rating: 4, status: 'Active', notes: '' };

const statusColors = {
  Active: { bg: '#d4edda', color: 'var(--success)' },
  Inactive: { bg: '#f0f0f0', color: '#666' },
  Blacklisted: { bg: '#f8d7da', color: 'var(--danger)' },
};

export default function VendorsManage() {
  const [vendors, setVendors] = useState(initialVendors);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const openAdd = () => { setForm({ ...empty, id: Date.now() }); setModal('add'); };
  const openEdit = (v) => { setForm({ ...v }); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(empty); };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (modal === 'add') setVendors(p => [...p, { ...form }]);
    else setVendors(p => p.map(v => v.id === form.id ? { ...form } : v));
    closeModal();
  };

  const handleDelete = (id) => { setVendors(p => p.filter(v => v.id !== id)); setDeleteConfirm(null); };

  const filtered = vendors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.contact.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || v.category === filterCat;
    const matchStatus = filterStatus === 'All' || v.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Suppliers & Vendors</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{vendors.length} vendors · {vendors.filter(v => v.status === 'Active').length} active</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> Add Vendor
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {CATEGORIES.map(c => (
          <div key={c} className="card" style={{ padding: '14px 16px', cursor: 'pointer', border: filterCat === c ? '2px solid var(--primary)' : '2px solid transparent' }}
            onClick={() => setFilterCat(filterCat === c ? 'All' : c)}>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)', fontFamily: 'Montserrat' }}>{vendors.filter(v => v.category === c).length}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.3 }}>{c}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input className="form-control" style={{ paddingLeft: 36 }} placeholder="Search vendors..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-control" style={{ width: 180 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          {STATUS.map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="btn btn-outline btn-sm" onClick={() => { setFilterCat('All'); setFilterStatus('All'); setSearch(''); }}>Clear</button>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(v => {
          const sc = statusColors[v.status] || statusColors.Active;
          const expanded = expandedId === v.id;
          return (
            <div key={v.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', cursor: 'pointer' }}
                onClick={() => setExpandedId(expanded ? null : v.id)}>
                {/* Avatar */}
                <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{v.name[0]}</span>
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{v.name}</span>
                    <span style={{ fontSize: 11, background: '#e8f4ff', color: 'var(--primary)', borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>{v.category}</span>
                    <span style={{ fontSize: 11, background: sc.bg, color: sc.color, borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>{v.status}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                    <span>{v.contact}</span>
                    {v.location && <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={11} />{v.location}</span>}
                  </div>
                </div>
                {/* Rating */}
                <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill={i < v.rating ? '#F59E0B' : 'none'} color={i < v.rating ? '#F59E0B' : '#d1d5db'} />)}
                </div>
                {/* Actions */}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                  <button onClick={() => openEdit(v)} style={{ background: '#e8f4ff', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: 'var(--primary)', display: 'flex' }}><Pencil size={14} /></button>
                  <button onClick={() => setDeleteConfirm(v.id)} style={{ background: '#fde8e8', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: 'var(--danger)', display: 'flex' }}><Trash2 size={14} /></button>
                </div>
              </div>

              {/* Expanded */}
              {expanded && (
                <div style={{ borderTop: '1px solid var(--bg)', padding: '14px 20px', background: 'var(--bg)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Contact Details</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {v.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><Phone size={13} color="var(--primary)" />{v.phone}</div>}
                      {v.email && <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><Mail size={13} color="var(--primary)" />{v.email}</div>}
                      {v.location && <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><MapPin size={13} color="var(--primary)" />{v.location}</div>}
                    </div>
                  </div>
                  {v.notes && (
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Notes</p>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-secondary)' }}>No vendors found.</div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
              <div style={{ width: 56, height: 56, background: '#fde8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Trash2 size={24} color="var(--danger)" />
              </div>
              <h3 style={{ marginBottom: 8 }}>Remove Vendor?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="btn btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="btn" style={{ background: 'var(--danger)', color: '#fff', border: 'none' }} onClick={() => handleDelete(deleteConfirm)}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" style={{ maxWidth: 580, maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal === 'add' ? 'Add Vendor' : 'Edit Vendor'}</h3>
              <button className="modal-close" onClick={closeModal}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Company Name *</label>
                  <input className="form-control" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Addis Steel Works" />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-control" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Contact Person</label>
                  <input className="form-control" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="Full name" />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input className="form-control" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="City, Country" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Phone</label>
                  <input className="form-control" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+251 ..." />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input className="form-control" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@company.com" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Status</label>
                  <select className="form-control" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    {STATUS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <div style={{ display: 'flex', gap: 6, paddingTop: 6 }}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} onClick={() => setForm(f => ({ ...f, rating: n }))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                        <Star size={22} fill={n <= form.rating ? '#F59E0B' : 'none'} color={n <= form.rating ? '#F59E0B' : '#d1d5db'} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea className="form-control" rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Internal notes about this vendor..." />
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 4 }}>
                <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Save size={15} /> {modal === 'add' ? 'Add Vendor' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
