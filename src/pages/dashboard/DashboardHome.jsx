import { FolderKanban, TrendingUp, DollarSign, AlertCircle, ArrowUpRight } from 'lucide-react';
import { projects, expenses } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function DashboardHome() {
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const profitLoss = totalBudget - totalSpent;

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderKanban, color: 'var(--primary)', bg: '#e8f4ff' },
    { label: 'Active Projects', value: activeProjects, icon: TrendingUp, color: 'var(--success)', bg: '#d4edda' },
    { label: 'Total Expenses', value: `$${(totalSpent / 1000).toFixed(0)}K`, icon: DollarSign, color: 'var(--warning)', bg: '#fff3cd' },
    { label: 'Budget Remaining', value: `$${(profitLoss / 1000).toFixed(0)}K`, icon: AlertCircle, color: profitLoss >= 0 ? 'var(--success)' : 'var(--danger)', bg: profitLoss >= 0 ? '#d4edda' : '#f8d7da' },
  ];

  const statusColor = { active: 'badge-primary', completed: 'badge-success', planning: 'badge-warning' };

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 52, height: 52, background: s.bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} color={s.color} />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Montserrat', color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
        {/* Recent Projects */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16 }}>Recent Projects</h3>
            <Link to="/dashboard/projects" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              View All <ArrowUpRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {projects.map(p => {
              const pct = Math.round((p.spent / p.budget) * 100);
              return (
                <div key={p.id} style={{ padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Budget: ${p.budget.toLocaleString()}</div>
                    </div>
                    <span className={`badge ${statusColor[p.status]}`}>{p.status}</span>
                  </div>
                  <div style={{ background: '#f0f0f0', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: pct > 90 ? 'var(--danger)' : pct > 70 ? 'var(--warning)' : 'var(--primary)', borderRadius: 4, transition: 'width 0.5s' }} />
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{pct}% of budget used</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16 }}>Recent Expenses</h3>
            <Link to="/dashboard/expenses" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              View All <ArrowUpRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {expenses.slice(0, 5).map(e => (
              <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{e.category}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{e.project}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: 'var(--danger)', fontSize: 14 }}>-${e.amount.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{e.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
