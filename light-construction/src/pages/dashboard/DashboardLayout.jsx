import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, Receipt, Kanban,
  BarChart2, Settings, Bell, Search,
  ChevronLeft, ChevronRight, User, Images,
  Wrench, Briefcase, Info, UserCircle, Globe
} from 'lucide-react';

const navGroups = [
  {
    label: 'Operations',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: FolderKanban, label: 'Projects', path: '/dashboard/projects' },
      { icon: Receipt, label: 'Expenses', path: '/dashboard/expenses' },
      { icon: Kanban, label: 'Canvas', path: '/dashboard/canvas' },
      { icon: BarChart2, label: 'Reports', path: '/dashboard/reports' },
    ],
  },
  {
    label: 'Website',
    items: [
      { icon: Wrench, label: 'Services', path: '/dashboard/services' },
      { icon: Briefcase, label: 'Portfolio', path: '/dashboard/portfolio' },
      { icon: Images, label: 'Gallery', path: '/dashboard/gallery' },
      { icon: Info, label: 'About Page', path: '/dashboard/about' },
      { icon: UserCircle, label: 'Co-Founder', path: '/dashboard/co-founder' },
    ],
  },
  {
    label: 'System',
    items: [
      { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ],
  },
];

// flat list for header title lookup
const allNavItems = navGroups.flatMap(g => g.items);

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const currentPage = allNavItems.find(n => location.pathname === n.path || location.pathname.startsWith(n.path + '/'))?.label || 'Dashboard';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 68 : 240,
        background: 'var(--primary-dark)',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.25s',
        flexShrink: 0,
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: collapsed ? '12px 16px' : '12px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.08)', minHeight: 70 }}>
          {collapsed ? (
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 6, padding: '2px 4px', display: 'flex' }}>
              <img src="/logo.png" alt="LC" style={{ height: 32, width: 32, objectFit: 'contain' }} />
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 8, padding: '4px 8px' }}>
              <img src="/logo.png" alt="Light Construction" style={{ height: 40, width: 'auto', objectFit: 'contain', display: 'block' }} />
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
          {navGroups.map(group => (
            <div key={group.label}>
              {!collapsed && (
                <div style={{ padding: '8px 24px 4px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: 'rgba(255,255,255,0.3)' }}>
                  {group.label}
                </div>
              )}
              {collapsed && <div style={{ height: 8 }} />}
              {group.items.map(({ icon: Icon, label, path }) => {
                const active = location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path + '/'));
                return (
                  <Link key={path} to={path} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: collapsed ? '12px 22px' : '11px 24px',
                    color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                    background: active ? 'rgba(77,166,255,0.2)' : 'transparent',
                    borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent',
                    transition: 'all 0.2s', textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                    title={collapsed ? label : ''}>
                    <Icon size={18} style={{ flexShrink: 0 }} />
                    {!collapsed && <span style={{ fontSize: 14, fontWeight: active ? 600 : 400 }}>{label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => setCollapsed(c => !c)} style={{
            background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff',
            borderRadius: 8, padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', cursor: 'pointer', transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
            {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span style={{ marginLeft: 8, fontSize: 13 }}>Collapse</span></>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <header style={{
          background: 'var(--surface)', borderBottom: '1px solid #e2e8f0',
          padding: '0 32px', height: 70,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 50,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <h2 style={{ fontSize: 20 }}>{currentPage}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input type="text" placeholder="Search..." style={{ paddingLeft: 36, width: 220, height: 38 }} />
            </div>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', position: 'relative', padding: 6, borderRadius: 8, cursor: 'pointer' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: 'var(--danger)', borderRadius: '50%' }} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={16} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Admin</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Manager</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
