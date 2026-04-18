import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';

// Mock users — in a real app these would come from a backend
const USERS = [
  { id: 1, email: 'admin@lightconstruction.com', password: 'admin123', name: 'Admin User', role: 'admin', avatar: 'A' },
  { id: 2, email: 'manager@lightconstruction.com', password: 'manager123', name: 'Project Manager', role: 'manager', avatar: 'M' },
  { id: 3, email: 'viewer@lightconstruction.com', password: 'viewer123', name: 'Viewer', role: 'viewer', avatar: 'V' },
];

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const user = USERS.find(u => u.email === email && u.password === password);
      if (user) {
        onLogin(user);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 600);
  };

  const fillDemo = (role) => {
    const u = USERS.find(u => u.role === role);
    if (u) { setEmail(u.email); setPassword(u.password); setError(''); }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--primary-dark) 0%, #2a5298 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 12, padding: '8px 16px', display: 'inline-block', marginBottom: 16 }}>
            <img src="/logo.png" alt="Light Construction" style={{ height: 48, objectFit: 'contain', display: 'block' }} />
          </div>
          <h1 style={{ color: '#fff', fontSize: 24, marginBottom: 6 }}>Admin Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>Sign in to manage your website and projects</p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: '#fde8e8', border: '1px solid #f5c6cb', borderRadius: 8, padding: '10px 14px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle size={16} color="var(--danger)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--danger)' }}>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{ paddingLeft: 38 }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  type={showPass ? 'text' : 'password'} required
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ paddingLeft: 38, paddingRight: 40 }}
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: 8, height: 44, fontSize: 15 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo accounts */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #f0f0f0' }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Demo Accounts</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { role: 'admin', label: 'Admin', color: 'var(--primary)', bg: '#e8f4ff' },
                { role: 'manager', label: 'Manager', color: 'var(--success)', bg: '#d4edda' },
                { role: 'viewer', label: 'Viewer', color: 'var(--text-secondary)', bg: '#f0f0f0' },
              ].map(({ role, label, color, bg }) => (
                <button key={role} onClick={() => fillDemo(role)}
                  style={{ flex: 1, padding: '8px 4px', background: bg, border: 'none', borderRadius: 8, cursor: 'pointer', color, fontWeight: 600, fontSize: 12 }}>
                  {label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 8 }}>Click a role to auto-fill credentials</p>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 24 }}>
          © 2026 Light Construction · All rights reserved
        </p>
      </div>
    </div>
  );
}
