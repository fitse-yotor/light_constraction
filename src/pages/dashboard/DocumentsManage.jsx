import { useState, useRef } from 'react';
import { Upload, Trash2, X, FileText, File, Download, Search, Plus, FolderOpen } from 'lucide-react';
import { projects } from '../../data/mockData';

const CATEGORIES = ['Contract', 'Permit', 'Invoice', 'Blueprint', 'Report', 'Other'];

const initialDocs = [
  { id: 1, name: 'Riverside_Contract_2025.pdf', category: 'Contract', project: 'Riverside Apartments', size: '1.2 MB', date: '2025-01-10', url: '#' },
  { id: 2, name: 'Downtown_Building_Permit.pdf', category: 'Permit', project: 'Downtown Office Tower', size: '540 KB', date: '2024-06-15', url: '#' },
  { id: 3, name: 'Invoice_Materials_Mar2025.pdf', category: 'Invoice', project: 'Riverside Apartments', size: '320 KB', date: '2025-03-01', url: '#' },
  { id: 4, name: 'GreenValley_Blueprint_v3.pdf', category: 'Blueprint', project: 'Green Valley Villas', size: '4.8 MB', date: '2023-04-20', url: '#' },
  { id: 5, name: 'Q1_Progress_Report.pdf', category: 'Report', project: 'Downtown Office Tower', size: '890 KB', date: '2025-04-01', url: '#' },
];

const extIcon = (name) => {
  const ext = name.split('.').pop().toLowerCase();
  if (['pdf'].includes(ext)) return { color: '#dc2626', label: 'PDF' };
  if (['doc', 'docx'].includes(ext)) return { color: '#2563eb', label: 'DOC' };
  if (['xls', 'xlsx'].includes(ext)) return { color: '#16a34a', label: 'XLS' };
  if (['dwg', 'dxf'].includes(ext)) return { color: '#7c3aed', label: 'DWG' };
  return { color: '#6b7280', label: ext.toUpperCase() };
};

export default function DocumentsManage() {
  const [docs, setDocs] = useState(initialDocs);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [filterProject, setFilterProject] = useState('All');
  const [form, setForm] = useState({ name: '', category: 'Contract', project: '', size: '', date: new Date().toISOString().slice(0, 10), url: '#' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(f => ({ ...f, name: file.name, size: (file.size / 1024 / 1024).toFixed(2) + ' MB' }));
  };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    setDocs(p => [...p, { id: Date.now(), ...form }]);
    setForm({ name: '', category: 'Contract', project: '', size: '', date: new Date().toISOString().slice(0, 10), url: '#' });
    setShowModal(false);
  };

  const handleDelete = (id) => { setDocs(p => p.filter(d => d.id !== id)); setDeleteConfirm(null); };

  const filtered = docs.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.project.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || d.category === filterCat;
    const matchProj = filterProject === 'All' || d.project === filterProject;
    return matchSearch && matchCat && matchProj;
  });

  const catCounts = CATEGORIES.reduce((acc, c) => ({ ...acc, [c]: docs.filter(d => d.category === c).length }), {});

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Documents & Files</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{docs.length} files stored</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Upload size={16} /> Upload Document
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        {CATEGORIES.map(c => (
          <div key={c} className="card" style={{ padding: '14px 16px', cursor: 'pointer', border: filterCat === c ? '2px solid var(--primary)' : '2px solid transparent', transition: 'border 0.2s' }}
            onClick={() => setFilterCat(filterCat === c ? 'All' : c)}>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--primary)', fontFamily: 'Montserrat' }}>{catCounts[c] || 0}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{c}s</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input className="form-control" style={{ paddingLeft: 36 }} placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-control" style={{ width: 180 }} value={filterProject} onChange={e => setFilterProject(e.target.value)}>
          <option value="All">All Projects</option>
          {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
        </select>
        <button className="btn btn-outline btn-sm" onClick={() => { setFilterCat('All'); setFilterProject('All'); setSearch(''); }}>Clear</button>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg)', borderBottom: '1px solid #e2e8f0' }}>
              {['File', 'Category', 'Project', 'Size', 'Date', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(doc => {
              const { color, label } = extIcon(doc.name);
              return (
                <tr key={doc.id} style={{ borderBottom: '1px solid #f5f5f5' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, background: color + '18', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 9, fontWeight: 800, color }}>{label}</span>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{doc.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 12, background: '#e8f4ff', color: 'var(--primary)', borderRadius: 20, padding: '3px 10px', fontWeight: 600 }}>{doc.category}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{doc.project || '—'}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{doc.size}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{doc.date}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <a href={doc.url} download style={{ background: '#e8f4ff', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: 'var(--primary)', display: 'flex', textDecoration: 'none' }} title="Download">
                        <Download size={14} />
                      </a>
                      <button onClick={() => setDeleteConfirm(doc.id)} style={{ background: '#fde8e8', border: 'none', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', color: 'var(--danger)', display: 'flex' }} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-secondary)' }}>
            <FolderOpen size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <p>No documents found.</p>
          </div>
        )}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
              <div style={{ width: 56, height: 56, background: '#fde8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Trash2 size={24} color="var(--danger)" />
              </div>
              <h3 style={{ marginBottom: 8 }}>Delete Document?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>This will permanently remove the file.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="btn btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="btn" style={{ background: 'var(--danger)', color: '#fff', border: 'none' }} onClick={() => handleDelete(deleteConfirm)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal" style={{ maxWidth: 500 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload Document</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div onClick={() => fileRef.current.click()} style={{ border: '2px dashed #e2e8f0', borderRadius: 10, padding: '28px 24px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
                {form.name ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <FileText size={24} color="var(--primary)" />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{form.name}</span>
                    {form.size && <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>({form.size})</span>}
                  </div>
                ) : (
                  <>
                    <Upload size={28} color="var(--text-secondary)" style={{ margin: '0 auto 8px' }} />
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Click to select a file</p>
                    <p style={{ color: '#aaa', fontSize: 12, marginTop: 4 }}>PDF, DOC, XLS, DWG supported</p>
                  </>
                )}
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.dxf" style={{ display: 'none' }} onChange={handleFile} />
              </div>
              <div className="form-group">
                <label>File Name</label>
                <input className="form-control" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="document_name.pdf" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-control" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Project</label>
                  <select className="form-control" value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))}>
                    <option value="">— None —</option>
                    {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAdd} disabled={!form.name.trim()} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Upload size={15} /> Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
