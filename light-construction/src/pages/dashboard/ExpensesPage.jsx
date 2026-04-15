import { useState } from 'react';
import { Plus, Paperclip, X } from 'lucide-react';
import { expenses as initialExpenses, projects } from '../../data/mockData';

const categories = ['Materials', 'Labor', 'Equipment', 'Permits', 'Transport', 'Other'];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('');
  const [form, setForm] = useState({ date: '', category: 'Materials', amount: '', project: '', attachment: '' });

  const filtered = filter ? expenses.filter(e => e.project === filter) : expenses;
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const handleAdd = () => {
    if (!form.date || !form.amount || !form.project) return;
    setExpenses(prev => [...prev, { ...form, id: Date.now(), amount: Number(form.amount) }]);
    setForm({ date: '', category: 'Materials', amount: '', project: '', attachment: '' });
    setShowModal(false);
  };

  const categoryColor = { Materials: 'badge-primary', Labor: 'badge-warning', Equipment: 'badge-secondary', Permits: 'badge-success', Transport: 'badge-danger', Other: 'badge-secondary' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: 220 }}>
            <option value="">All Projects</option>
            {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
          <div style={{ background: 'var(--surface)', borderRadius: 8, padding: '8px 16px', boxShadow: 'var(--shadow)', fontSize: 14 }}>
            Total: <strong style={{ color: 'var(--danger)' }}>${total.toLocaleString()}</strong>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={16} /> Add Expense</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg)' }}>
              {['Date', 'Category', 'Amount', 'Project', 'Attachment'].map(h => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, i) => (
              <tr key={e.id} style={{ borderBottom: '1px solid #f5f5f5', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '14px 20px', fontSize: 14 }}>{e.date}</td>
                <td style={{ padding: '14px 20px' }}><span className={`badge ${categoryColor[e.category] || 'badge-secondary'}`}>{e.category}</span></td>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--danger)', fontSize: 15 }}>${e.amount.toLocaleString()}</td>
                <td style={{ padding: '14px 20px', fontSize: 14 }}>{e.project}</td>
                <td style={{ padding: '14px 20px' }}>
                  {e.attachment
                    ? <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontSize: 13 }}><Paperclip size={13} />{e.attachment}</span>
                    : <span style={{ color: '#ccc', fontSize: 13 }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>No expenses found.</div>}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>Add Expense</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group"><label>Date *</label><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
              <div className="form-group"><label>Amount ($) *</label><input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="0" /></div>
            </div>
            <div className="form-group"><label>Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Project *</label>
              <select value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))}>
                <option value="">— Select Project —</option>
                {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Attachment (filename)</label><input type="text" value={form.attachment} onChange={e => setForm(f => ({ ...f, attachment: e.target.value }))} placeholder="invoice.pdf" /></div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd}>Save Expense</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
