import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, X, Calendar, Flag, GripVertical } from 'lucide-react';
import { tasks as initialTasks, projects } from '../../data/mockData';

const COLUMNS = [
  { id: 'todo', label: 'To Do', color: '#6B7280', bg: '#f3f4f6' },
  { id: 'inProgress', label: 'In Progress', color: '#F59E0B', bg: '#fffbeb' },
  { id: 'completed', label: 'Completed', color: '#28A745', bg: '#f0fdf4' },
];

const priorityStyle = {
  high: { bg: '#fee2e2', color: '#dc2626', label: 'High' },
  medium: { bg: '#fef3c7', color: '#d97706', label: 'Medium' },
  low: { bg: '#dcfce7', color: '#16a34a', label: 'Low' },
};

function TaskCard({ task, index }) {
  const p = priorityStyle[task.priority] || priorityStyle.medium;
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}
          style={{
            background: '#fff', borderRadius: 12, padding: '14px 16px',
            boxShadow: snapshot.isDragging ? '0 8px 24px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.06)',
            marginBottom: 10, border: '1px solid #f0f0f0',
            transform: snapshot.isDragging ? 'rotate(2deg)' : 'none',
            transition: 'box-shadow 0.2s',
            ...provided.draggableProps.style,
          }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ fontWeight: 600, fontSize: 14, flex: 1, paddingRight: 8 }}>{task.title}</div>
            <div {...provided.dragHandleProps} style={{ color: '#ccc', cursor: 'grab', flexShrink: 0 }}>
              <GripVertical size={14} />
            </div>
          </div>
          {task.description && <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.5 }}>{task.description}</p>}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
            <span style={{ background: p.bg, color: p.color, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Flag size={10} /> {p.label}
            </span>
            {task.dueDate && (
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={11} /> {task.dueDate}
              </span>
            )}
          </div>
          {task.project && <div style={{ marginTop: 8, fontSize: 11, color: 'var(--primary)', fontWeight: 500 }}>{task.project}</div>}
        </div>
      )}
    </Draggable>
  );
}

export default function CanvasBoard({ projectFilter }) {
  const [columns, setColumns] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [targetCol, setTargetCol] = useState('todo');
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', dueDate: '', project: projectFilter || '' });

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const srcCol = [...columns[source.droppableId]];
    const destCol = source.droppableId === destination.droppableId ? srcCol : [...columns[destination.droppableId]];
    const [moved] = srcCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, moved);

    setColumns(prev => ({
      ...prev,
      [source.droppableId]: srcCol,
      [destination.droppableId]: destCol,
    }));
  };

  const openAddModal = (colId) => {
    setTargetCol(colId);
    setForm({ title: '', description: '', priority: 'medium', dueDate: '', project: projectFilter || '' });
    setShowModal(true);
  };

  const handleAdd = () => {
    if (!form.title.trim()) return;
    const newTask = { id: `t${Date.now()}`, ...form };
    setColumns(prev => ({ ...prev, [targetCol]: [...prev[targetCol], newTask] }));
    setShowModal(false);
  };

  const filteredColumns = projectFilter
    ? Object.fromEntries(Object.entries(columns).map(([k, v]) => [k, v.filter(t => t.project === projectFilter)]))
    : columns;

  return (
    <div>
      {!projectFilter && (
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={() => openAddModal('todo')}><Plus size={16} /> Add Task</button>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
          {COLUMNS.map(col => {
            const tasks = filteredColumns[col.id] || [];
            return (
              <div key={col.id} style={{ background: col.bg, borderRadius: 14, padding: 16, border: `1px solid ${col.color}22` }}>
                {/* Column Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: col.color }} />
                    <span style={{ fontWeight: 700, fontSize: 14, color: col.color }}>{col.label}</span>
                    <span style={{ background: col.color + '22', color: col.color, fontSize: 12, fontWeight: 700, padding: '1px 8px', borderRadius: 20 }}>{tasks.length}</span>
                  </div>
                  <button onClick={() => openAddModal(col.id)} style={{ background: 'none', border: 'none', color: col.color, cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex' }}
                    title="Add task">
                    <Plus size={16} />
                  </button>
                </div>

                {/* Tasks */}
                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}
                      style={{ minHeight: 80, background: snapshot.isDraggingOver ? col.color + '11' : 'transparent', borderRadius: 8, transition: 'background 0.2s', padding: 2 }}>
                      {tasks.map((task, i) => <TaskCard key={task.id} task={task} index={i} />)}
                      {provided.placeholder}
                      {tasks.length === 0 && !snapshot.isDraggingOver && (
                        <div style={{ textAlign: 'center', padding: '24px 0', color: col.color + '88', fontSize: 13 }}>Drop tasks here</div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Add Task Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Task</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="form-group"><label>Title *</label><input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Task title" /></div>
            <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description..." /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group"><label>Priority</label>
                <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                  <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
                </select>
              </div>
              <div className="form-group"><label>Due Date</label><input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} /></div>
            </div>
            {!projectFilter && (
              <div className="form-group"><label>Project</label>
                <select value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))}>
                  <option value="">— Select Project —</option>
                  {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
            )}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd}>Save Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
