import { User, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Profile */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <User size={18} color="var(--primary)" />
            <h3 style={{ fontSize: 16 }}>Profile Settings</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group"><label>Full Name</label><input type="text" defaultValue="Admin User" /></div>
            <div className="form-group"><label>Email</label><input type="email" defaultValue="admin@lightconstruction.com" /></div>
            <div className="form-group"><label>Phone</label><input type="text" defaultValue="+1 (555) 234-5678" /></div>
            <div className="form-group"><label>Role</label><input type="text" defaultValue="Project Manager" disabled style={{ background: '#f5f5f5' }} /></div>
          </div>
          <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }}>Save Changes</button>
        </div>

        {/* Notifications */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Bell size={18} color="var(--primary)" />
            <h3 style={{ fontSize: 16 }}>Notifications</h3>
          </div>
          {[
            ['Email notifications for new expenses', true],
            ['Project status change alerts', true],
            ['Weekly summary report', false],
            ['Budget threshold warnings', true],
          ].map(([label, def]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
              <span style={{ fontSize: 14 }}>{label}</span>
              <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked={def} style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{ position: 'absolute', inset: 0, background: def ? 'var(--primary)' : '#ccc', borderRadius: 24, transition: '0.3s' }} />
              </label>
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Shield size={18} color="var(--primary)" />
            <h3 style={{ fontSize: 16 }}>Security</h3>
          </div>
          <div className="form-group"><label>Current Password</label><input type="password" placeholder="••••••••" /></div>
          <div className="form-group"><label>New Password</label><input type="password" placeholder="••••••••" /></div>
          <div className="form-group"><label>Confirm Password</label><input type="password" placeholder="••••••••" /></div>
          <button className="btn btn-secondary btn-sm">Update Password</button>
        </div>
      </div>
    </div>
  );
}
