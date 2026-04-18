import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, Search } from 'lucide-react';
import { projects as initialProjects } from '../../data/mockData';

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', budget: '', status: 'planning', startDate: '', endDate: '', description: '' });

  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const statusColor = { active: 'badge-primary', completed: 'badge-success', planning: 'badge-warning' };

  const handleAdd = () => {
    if (!form.name || !form.budget) return;
    setProjects(prev => [...prev, { ...form, id: Date.now(), budget: Number(form.budget), spent: 0 }]);
    setForm({ name: '', budget: '', status: 'planning', startDate: '', endDate: '', description: '' });
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36, width: 260 }} />
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={16} /> New Project</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg)', borderBottom: '1px solid #e2e8f0' }}>
              {['Project Name', 'Budget', 'Spent', 'Progress', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
              const pct = Math.round((p.spent / p.budget) * 100);
              return (
                <tr key={p.id} style={{ borderBottom: '1px solid #f5f5f5', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.startDate} → {p.endDate}</div>
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}>${p.budget.toLocaleString()}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--danger)', fontWeight: 600 }}>${p.spent.toLocaleString()}</td>
                  <td style={{ padding: '16px 20px', minWidth: 140 }}>
                    <div style={{ background: '#f0f0f0', borderRadius: 4, height: 6, marginBottom: 4 }}>
                      <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: pct > 90 ? 'var(--danger)' : pct > 70 ? 'var(--warning)' : 'var(--primary)', borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{pct}%</span>
                  </td>
                  <td style={{ padding: '16px 20px' }}><span className={`badge ${statusColor[p.status]}`}>{p.status}</span></td>
                  <td style={{ padding: '16px 20px' }}>
                    <Link to={`/dashboard/projects/${p.id}`} className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Eye size={14} /> View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>No projects found.</div>}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>New Project</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="form-group"><label>Project Name</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Project name" /></div>
            <div className="form-group"><label>Budget ($)</label><input type="number" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} placeholder="0" /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group"><label>Start Date</label><input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} /></div>
              <div className="form-group"><label>End Date</label><input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} /></div>
            </div>
            <div className="form-group"><label>Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="planning">Planning</option><option value="active">Active</option><option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description..." /></div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd}>Create Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
