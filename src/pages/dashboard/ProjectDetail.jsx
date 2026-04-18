import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Calendar, Tag } from 'lucide-react';
import { projects, expenses, tasks as initialTasks } from '../../data/mockData';
import CanvasBoard from './CanvasBoard';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === Number(id));
  const [tab, setTab] = useState('overview');

  if (!project) return <div style={{ padding: 40, textAlign: 'center' }}>Project not found. <Link to="/dashboard/projects" style={{ color: 'var(--primary)' }}>Go back</Link></div>;

  const projectExpenses = expenses.filter(e => e.project === project.name);
  const totalSpent = projectExpenses.reduce((s, e) => s + e.amount, 0);
  const pct = Math.round((project.spent / project.budget) * 100);
  const statusColor = { active: 'badge-primary', completed: 'badge-success', planning: 'badge-warning' };

  return (
    <div>
      <Link to="/dashboard/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      {/* Project Header */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h2 style={{ fontSize: 22 }}>{project.name}</h2>
              <span className={`badge ${statusColor[project.status]}`}>{project.status}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{project.description}</p>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              [DollarSign, 'Budget', `$${project.budget.toLocaleString()}`],
              [DollarSign, 'Spent', `$${project.spent.toLocaleString()}`],
              [Calendar, 'Start', project.startDate],
              [Calendar, 'End', project.endDate],
            ].map(([Icon, label, val]) => (
              <div key={label + val} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Budget Used</span>
            <span style={{ fontWeight: 600 }}>{pct}%</span>
          </div>
          <div style={{ background: '#f0f0f0', borderRadius: 6, height: 10 }}>
            <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: pct > 90 ? 'var(--danger)' : pct > 70 ? 'var(--warning)' : 'var(--primary)', borderRadius: 6, transition: 'width 0.5s' }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--surface)', borderRadius: 10, padding: 4, width: 'fit-content', boxShadow: 'var(--shadow)' }}>
        {['overview', 'expenses', 'canvas'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 20px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            background: tab === t ? 'var(--primary)' : 'transparent',
            color: tab === t ? '#fff' : 'var(--text-secondary)',
            transition: 'all 0.2s', textTransform: 'capitalize',
          }}>{t}</button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'overview' && (
        <div className="grid-3">
          {[
            ['Total Budget', `$${project.budget.toLocaleString()}`, 'var(--primary)'],
            ['Amount Spent', `$${project.spent.toLocaleString()}`, 'var(--danger)'],
            ['Remaining', `$${(project.budget - project.spent).toLocaleString()}`, 'var(--success)'],
          ].map(([label, val, color]) => (
            <div key={label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 700, color, fontFamily: 'Montserrat', marginBottom: 6 }}>{val}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'expenses' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg)' }}>
                {['Date', 'Category', 'Amount', 'Attachment'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projectExpenses.map(e => (
                <tr key={e.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '14px 20px', fontSize: 14 }}>{e.date}</td>
                  <td style={{ padding: '14px 20px' }}><span className="badge badge-secondary">{e.category}</span></td>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--danger)' }}>${e.amount.toLocaleString()}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--primary)' }}>{e.attachment || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {projectExpenses.length === 0 && <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>No expenses recorded for this project.</div>}
        </div>
      )}

      {tab === 'canvas' && <CanvasBoard projectFilter={project.name} />}
    </div>
  );
}
