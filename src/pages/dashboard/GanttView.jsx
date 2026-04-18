import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/mockData';

const PHASES = ['Design', 'Foundation', 'Structure', 'MEP', 'Finishing', 'Handover'];
const PHASE_COLORS = {
  Design: '#7c3aed',
  Foundation: '#dc2626',
  Structure: '#d97706',
  MEP: '#0891b2',
  Finishing: '#16a34a',
  Handover: '#4DA6FF',
};

const initialPhases = [
  { id: 1, project: 'Riverside Apartments', phase: 'Design', start: '2025-01-10', end: '2025-02-28' },
  { id: 2, project: 'Riverside Apartments', phase: 'Foundation', start: '2025-03-01', end: '2025-04-30' },
  { id: 3, project: 'Riverside Apartments', phase: 'Structure', start: '2025-05-01', end: '2025-08-31' },
  { id: 4, project: 'Riverside Apartments', phase: 'MEP', start: '2025-09-01', end: '2025-10-31' },
  { id: 5, project: 'Riverside Apartments', phase: 'Finishing', start: '2025-11-01', end: '2025-12-15' },
  { id: 6, project: 'Downtown Office Tower', phase: 'Design', start: '2024-06-01', end: '2024-08-31' },
  { id: 7, project: 'Downtown Office Tower', phase: 'Foundation', start: '2024-09-01', end: '2024-12-31' },
  { id: 8, project: 'Downtown Office Tower', phase: 'Structure', start: '2025-01-01', end: '2025-09-30' },
  { id: 9, project: 'Downtown Office Tower', phase: 'MEP', start: '2025-10-01', end: '2026-01-31' },
  { id: 10, project: 'Harbor Bridge Repair', phase: 'Design', start: '2026-02-01', end: '2026-03-15' },
  { id: 11, project: 'Harbor Bridge Repair', phase: 'Foundation', start: '2026-03-16', end: '2026-05-31' },
  { id: 12, project: 'Harbor Bridge Repair', phase: 'Structure', start: '2026-06-01', end: '2026-07-31' },
];

const empty = { id: null, project: projects[0]?.name || '', phase: 'Design', start: '', end: '' };

// Generate months array for the timeline header
function getMonths(startYear, count) {
  const months = [];
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let y = startYear, m = 0;
  for (let i = 0; i < count; i++) {
    months.push({ label: `${names[m]} ${y}`, year: y, month: m });
    m++;
    if (m === 12) { m = 0; y++; }
  }
  return months;
}

function dateToOffset(dateStr, baseYear, baseMonth) {
  const d = new Date(dateStr);
  return (d.getFullYear() - baseYear) * 12 + (d.getMonth() - baseMonth);
}

function dateDurationMonths(start, end) {
  const s = new Date(start), e = new Date(end);
  return Math.max(0.5, (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()) + 1);
}

const COL_W = 72; // px per month column

export default function GanttView() {
  const [phases, setPhases] = useState(initialPhases);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedProject, setSelectedProject] = useState('All');
  const [viewOffset, setViewOffset] = useState(0); // months to shift view

  const BASE_YEAR = 2024, BASE_MONTH = 5; // Jun 2024
  const VISIBLE_MONTHS = 18;
  const months = getMonths(BASE_YEAR + Math.floor((BASE_MONTH + viewOffset) / 12), VISIBLE_MONTHS);
  const effectiveBase = { year: BASE_YEAR + Math.floor((BASE_MONTH + viewOffset) / 12), month: (BASE_MONTH + viewOffset) % 12 };

  const projectList = [...new Set(phases.map(p => p.project))];
  const filtered = selectedProject === 'All' ? phases : phases.filter(p => p.project === selectedProject);
  const groupedByProject = projectList.filter(p => selectedProject === 'All' || p === selectedProject).map(proj => ({
    project: proj,
    phases: filtered.filter(p => p.project === proj),
  }));

  const openAdd = () => { setForm({ ...empty, id: Date.now() }); setModal('add'); };
  const openEdit = (p) => { setForm({ ...p }); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(empty); };

  const handleSave = () => {
    if (!form.project || !form.phase || !form.start || !form.end) return;
    if (modal === 'add') setPhases(p => [...p, { ...form }]);
    else setPhases(p => p.map(ph => ph.id === form.id ? { ...form } : ph));
    closeModal();
  };

  const handleDelete = (id) => { setPhases(p => p.filter(ph => ph.id !== id)); setDeleteConfirm(null); };

  const today = new Date();
  const todayOffset = (today.getFullYear() - effectiveBase.year) * 12 + (today.getMonth() - effectiveBase.month);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Project Timeline</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Gantt view of all project phases</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select className="form-control" style={{ width: 200 }} value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
            <option value="All">All Projects</option>
            {projectList.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <button className="btn btn-primary" onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Plus size={16} /> Add Phase
          </button>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {PHASES.map(ph => (
          <div key={ph} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: PHASE_COLORS[ph] }} />
            <span style={{ color: 'var(--text-secondary)' }}>{ph}</span>
          </div>
        ))}
      </div>

      {/* Gantt Chart */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #e2e8f0', background: 'var(--bg)' }}>
          <button onClick={() => setViewOffset(v => v - 6)} style={{ background: 'none', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}>
            <ChevronLeft size={15} /> Back 6 months
          </button>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
            {months[0]?.label} — {months[VISIBLE_MONTHS - 1]?.label}
          </span>
          <button onClick={() => setViewOffset(v => v + 6)} style={{ background: 'none', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}>
            Next 6 months <ChevronRight size={15} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 200 + COL_W * VISIBLE_MONTHS }}>
            {/* Month headers */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ width: 200, flexShrink: 0, padding: '10px 16px', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', background: 'var(--bg)', borderRight: '1px solid #e2e8f0' }}>Project / Phase</div>
              {months.map((m, i) => (
                <div key={i} style={{ width: COL_W, flexShrink: 0, padding: '10px 4px', fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center', borderRight: '1px solid #f0f0f0', background: 'var(--bg)' }}>
                  {m.label}
                </div>
              ))}
            </div>

            {/* Rows */}
            {groupedByProject.map(({ project, phases: phasesForProject }) => (
              <div key={project}>
                {/* Project row */}
                <div style={{ display: 'flex', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ width: 200, flexShrink: 0, padding: '10px 16px', fontWeight: 700, fontSize: 13, borderRight: '1px solid #e2e8f0', display: 'flex', alignItems: 'center' }}>
                    {project}
                  </div>
                  <div style={{ flex: 1, position: 'relative', height: 40 }}>
                    {/* Today line */}
                    {todayOffset >= 0 && todayOffset < VISIBLE_MONTHS && (
                      <div style={{ position: 'absolute', left: todayOffset * COL_W + COL_W / 2, top: 0, bottom: 0, width: 2, background: 'var(--danger)', opacity: 0.5, zIndex: 2 }} />
                    )}
                  </div>
                </div>

                {/* Phase rows */}
                {phasesForProject.map(ph => {
                  const offset = dateToOffset(ph.start, effectiveBase.year, effectiveBase.month);
                  const duration = dateDurationMonths(ph.start, ph.end);
                  const color = PHASE_COLORS[ph.phase] || '#4DA6FF';
                  const left = Math.max(0, offset) * COL_W;
                  const width = Math.min(duration, VISIBLE_MONTHS - Math.max(0, offset)) * COL_W - 4;

                  return (
                    <div key={ph.id} style={{ display: 'flex', borderBottom: '1px solid #f5f5f5' }}>
                      <div style={{ width: 200, flexShrink: 0, padding: '8px 16px 8px 28px', fontSize: 12, color: 'var(--text-secondary)', borderRight: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{ph.phase}</span>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button onClick={() => openEdit(ph)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', padding: 2, display: 'flex' }}><Pencil size={12} /></button>
                          <button onClick={() => setDeleteConfirm(ph.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', padding: 2, display: 'flex' }}><Trash2 size={12} /></button>
                        </div>
                      </div>
                      <div style={{ flex: 1, position: 'relative', height: 36 }}>
                        {/* Today line */}
                        {todayOffset >= 0 && todayOffset < VISIBLE_MONTHS && (
                          <div style={{ position: 'absolute', left: todayOffset * COL_W + COL_W / 2, top: 0, bottom: 0, width: 2, background: 'var(--danger)', opacity: 0.3, zIndex: 2 }} />
                        )}
                        {/* Grid lines */}
                        {months.map((_, i) => (
                          <div key={i} style={{ position: 'absolute', left: i * COL_W, top: 0, bottom: 0, width: 1, background: '#f0f0f0' }} />
                        ))}
                        {/* Bar */}
                        {offset < VISIBLE_MONTHS && offset + duration > 0 && width > 0 && (
                          <div style={{
                            position: 'absolute', left: left + 2, top: 6, height: 24,
                            width: Math.max(width, 20),
                            background: color, borderRadius: 6,
                            display: 'flex', alignItems: 'center', paddingLeft: 8,
                            overflow: 'hidden', zIndex: 1,
                          }}>
                            <span style={{ fontSize: 11, color: '#fff', fontWeight: 600, whiteSpace: 'nowrap' }}>{ph.phase}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Today legend */}
        <div style={{ padding: '10px 16px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
          <div style={{ width: 16, height: 2, background: 'var(--danger)' }} />
          <span>Today ({today.toLocaleDateString()})</span>
        </div>
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
              <div style={{ width: 56, height: 56, background: '#fde8e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Trash2 size={24} color="var(--danger)" />
              </div>
              <h3 style={{ marginBottom: 8 }}>Remove Phase?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>This will remove the phase from the timeline.</p>
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
          <div className="modal" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modal === 'add' ? 'Add Phase' : 'Edit Phase'}</h3>
              <button className="modal-close" onClick={closeModal}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label>Project *</label>
                <select className="form-control" value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))}>
                  {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Phase *</label>
                <select className="form-control" value={form.phase} onChange={e => setForm(f => ({ ...f, phase: e.target.value }))}>
                  {PHASES.map(ph => <option key={ph}>{ph}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Start Date *</label>
                  <input className="form-control" type="date" value={form.start} onChange={e => setForm(f => ({ ...f, start: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>End Date *</label>
                  <input className="form-control" type="date" value={form.end} onChange={e => setForm(f => ({ ...f, end: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 4 }}>
                <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Save size={15} /> {modal === 'add' ? 'Add Phase' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
