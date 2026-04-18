import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Shield, Eye, EyeOff } from 'lucide-react';

const ROLES = [
  { value: 'admin', label: 'Admin', desc: 'Full access to all features', color: 'var(--primary)', bg: '#e8f4ff' },
  { value: 'manager', label: 'Manager', desc: 'Manage projects, expenses, and content', color: 'var(--success)', bg: '#d4edda' },
  { value: 'viewer', label: 'Viewer', desc: 'Read-only access to dashboard', color: 'var(--text-secondary)', bg: '#f0f0f0' },
];

const PERMISSIONS = {
  admin: ['Dashboard', 'Projects', 'Expenses', 'Planning', 'Reports', 'Gallery', 'Services', 'Portfolio', 'About', 'Co-Founder', 'Testimonials', 'Announcements', 'Documents', 'Timeline', 'Homepage', 'SEO', 'Vendors', 'Users', 'Settings'],
  manager: ['Dashboard', 'Projects', 'Expenses', 'Planning', 'Reports', 'Gallery', 'Services', 'Portfolio', 'About', 'Testimonials', 'Announcements', 'Documents', 'Timeline', 'Vendors'],
  viewer: ['Dashboard', 'Projects', 'Reports'],
};

const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@lightconstruction.com', role: 'admin', active: true, lastLogin: '2026-04-18' },
  { id: 2, name: 'Project Manager', email: 'manager@lightconstruction.com', role: 'manager', active: true, lastLogin: '2026-04-17' },
  { id: 3, name: 'Viewer', email: 'viewer@lightconstruction.com', role: 'viewer', active: true, lastLogin: '2026-04-10' },
];

const empty = { id: null, name: '', email: '', role: 'manager', active: true, password: '' };

export default function UserManage() {
  const [users, setUsers] = useState(initialUsers);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [activeRole, setActiveRole] = useState(null);

  const openAdd = () => { setForm({ ...empty, id: Date.now() }); setModal('add'); };
  const openEdit = (u) => { setForm({ ...u, password: '' }); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(empty); setShowPass(false); };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    if (modal === 'add') setUsers(p => [...p, { ...form, lastLogin: '—' }]);
    else setUsers(p => p.map(u => u.id === form.id ? { ...form } : u));
    closeModal();
  };

  const toggleActive = (id) => setUsers(p => p.map(u => u.id === id ? { ...u, active: !u.active } : u));
  const handleDelete = (id) => { setUsers(p => p.filter(u => u.id !== id)); setDeleteConfirm(null); };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>User Management</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{users.length} users · {users.filter(u => u.active).length} active</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* Role Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {ROLES.map(r => (
          <div key={r.value} className="card" style={{ cursor: 'pointer', border: activeRole === r.value ? `2px solid ${r.color}` : '2px solid transparent', transition: 'border 0.2s' }}
            onClick={() => setActiveRole(activeRole === r.value ? null : r.value)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, background: r.bg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={16} color={r.color} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: r.color }}>{r.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{users.filter(u => u.role === r.value).length} users</div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>{r.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {PERMISSIONS[r.value].slice(0, 6).map(p => (
                <span key={p} style={{ fontSize: 10, background: r.bg, color: r.color, borderRadius: 4, padding: '2px 6px', fontWeight: 600 }}>{p}</span>
              ))}
              {PERMISSIONS[r.value].length > 6 && (
                <span style={{ fontSize: 10, color: 'var(--text-secondary)', padding: '2px 4px' }}>+{PERMISSIONS[r.value].length - 6} more</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg)', borderBottom: '1px solid #e2e8f0' }}>
              {['User', 'Role', 'Status', 'Last Login', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.filter(u => !activeRole || u.role === activeRole).map(u => {
              const role = ROLES.find(r => r.value === u.role) || ROLES[0];
              return (
                <tr key={u.id} style={{ borderBottom: '1px solid #f5f5f5' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 38, height: 38, background: role.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: role.color }}>{u.name[0]}</span>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{u.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 12, background: role.bg, color: role.color, borderRadius: 20, padding: '3px 10px', fontWeight: 600 }}>{role.label}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 12, background: u.active ? '#d4edda' : '#f0f0f0', color: u.active ? 'var(--success)' : '#666', borderRadius: 20, padding: '3px 10px', fontWeight: 600 }}>
                      {u.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{u.lastLogin}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEdit(u)} style={{ background: '#e8f4ff', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: 'var(--primary)', display: 'flex' }}><Pencil size={14} /></button>
                      <button onClick={() => toggleActive(u.id)} style={{ background: u.active ? '#fff3cd' : '#d4edda', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: u.active ? '#b8860b' : 'var(--success)', display: 'flex' }} title={u.active ? 'Deactivate' : 'Activate'}>
                        {u.active ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button onClick={() => setDeleteConfirm(u.id)} style={{ background: '#fde8e8', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: 'var(--danger)', display: 'flex' }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
              <div style={{ width: 56, height: 56, background: '#fde8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Trash2 size={24} color="var(--danger)" />
              </div>
              <h3 style={{ marginBottom: 8 }}>Delete User?</h3>
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
          <div className="modal" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal === 'add' ? 'Add User' : 'Edit User'}</h3>
              <button className="modal-close" onClick={closeModal}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input className="form-control" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input className="form-control" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@company.com" />
                </div>
              </div>
              <div className="form-group">
                <label>Role</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {ROLES.map(r => (
                    <button key={r.value} onClick={() => setForm(f => ({ ...f, role: r.value }))}
                      style={{ flex: 1, padding: '8px 4px', border: '2px solid', borderColor: form.role === r.value ? r.color : '#e2e8f0', background: form.role === r.value ? r.bg : '#fff', color: form.role === r.value ? r.color : 'var(--text-secondary)', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                      {r.label}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>
                  {ROLES.find(r => r.value === form.role)?.desc}
                </p>
              </div>
              <div className="form-group">
                <label>{modal === 'add' ? 'Password *' : 'New Password (leave blank to keep current)'}</label>
                <div style={{ position: 'relative' }}>
                  <input className="form-control" type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" style={{ paddingRight: 40 }} />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
                <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} style={{ width: 16, height: 16 }} />
                Account is active
              </label>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 4 }}>
                <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Save size={15} /> {modal === 'add' ? 'Create User' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
