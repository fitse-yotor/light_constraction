import { useState } from 'react';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import { projects, expenses } from '../../data/mockData';

export default function ReportsPage() {
  const [selectedProject, setSelectedProject] = useState('');

  const filtered = selectedProject ? projects.filter(p => p.name === selectedProject) : projects;
  const filteredExpenses = selectedProject ? expenses.filter(e => e.project === selectedProject) : expenses;

  const totalBudget = filtered.reduce((s, p) => s + p.budget, 0);
  const totalSpent = filtered.reduce((s, p) => s + p.spent, 0);
  const variance = totalBudget - totalSpent;

  const byCategory = filteredExpenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const maxCat = Math.max(...Object.values(byCategory), 1);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} style={{ width: 260 }}>
          <option value="">All Projects</option>
          {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
        </select>
        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid-3" style={{ marginBottom: 28 }}>
        {[
          ['Total Budget', `$${totalBudget.toLocaleString()}`, 'var(--primary)', '#e8f4ff'],
          ['Total Spent', `$${totalSpent.toLocaleString()}`, 'var(--danger)', '#f8d7da'],
          ['Variance', `${variance >= 0 ? '+' : ''}$${variance.toLocaleString()}`, variance >= 0 ? 'var(--success)' : 'var(--danger)', variance >= 0 ? '#d4edda' : '#f8d7da'],
        ].map(([label, val, color, bg]) => (
          <div key={label} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color, fontFamily: 'Montserrat', marginBottom: 6 }}>{val}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Budget vs Actual per project */}
        <div className="card">
          <h3 style={{ fontSize: 16, marginBottom: 20 }}>Budget vs Actual</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map(p => {
              const pct = Math.round((p.spent / p.budget) * 100);
              return (
                <div key={p.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                    <span style={{ fontWeight: 600 }}>{p.name}</span>
                    <span style={{ color: pct > 100 ? 'var(--danger)' : 'var(--text-secondary)' }}>{pct}%</span>
                  </div>
                  <div style={{ background: '#f0f0f0', borderRadius: 6, height: 10, position: 'relative' }}>
                    <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: pct > 90 ? 'var(--danger)' : pct > 70 ? 'var(--warning)' : 'var(--primary)', borderRadius: 6 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
                    <span>Spent: ${p.spent.toLocaleString()}</span>
                    <span>Budget: ${p.budget.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expenses by Category */}
        <div className="card">
          <h3 style={{ fontSize: 16, marginBottom: 20 }}>Expenses by Category</h3>
          {Object.keys(byCategory).length === 0
            ? <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: 32 }}>No data available</div>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {Object.entries(byCategory).sort((a, b) => b[1] - a[1]).map(([cat, amt]) => (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                    <span style={{ fontWeight: 600 }}>{cat}</span>
                    <span style={{ color: 'var(--danger)', fontWeight: 700 }}>${amt.toLocaleString()}</span>
                  </div>
                  <div style={{ background: '#f0f0f0', borderRadius: 6, height: 8 }}>
                    <div style={{ width: `${(amt / maxCat) * 100}%`, height: '100%', background: 'var(--primary)', borderRadius: 6 }} />
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>

      {/* Project Table */}
      <div className="card" style={{ marginTop: 24, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
          <h3 style={{ fontSize: 16 }}>Project Summary</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg)' }}>
              {['Project', 'Budget', 'Spent', 'Remaining', 'Status', 'Health'].map(h => (
                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
              const rem = p.budget - p.spent;
              const pct = (p.spent / p.budget) * 100;
              const statusColor = { active: 'badge-primary', completed: 'badge-success', planning: 'badge-warning' };
              return (
                <tr key={p.id} style={{ borderBottom: '1px solid #f5f5f5', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600, fontSize: 14 }}>{p.name}</td>
                  <td style={{ padding: '14px 20px', fontSize: 14 }}>${p.budget.toLocaleString()}</td>
                  <td style={{ padding: '14px 20px', color: 'var(--danger)', fontWeight: 600 }}>${p.spent.toLocaleString()}</td>
                  <td style={{ padding: '14px 20px', color: rem >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>${rem.toLocaleString()}</td>
                  <td style={{ padding: '14px 20px' }}><span className={`badge ${statusColor[p.status]}`}>{p.status}</span></td>
                  <td style={{ padding: '14px 20px' }}>
                    {pct > 90
                      ? <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--danger)', fontSize: 13, fontWeight: 600 }}><TrendingDown size={14} /> At Risk</span>
                      : <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--success)', fontSize: 13, fontWeight: 600 }}><TrendingUp size={14} /> On Track</span>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
