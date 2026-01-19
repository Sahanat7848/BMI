import { Activity, ArrowRight, BarChart2, Shield, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container animate-fade-in">
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={32} color="var(--primary)" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              BMI Tracker Pro
            </span>
            <span style={{ fontSize: '1.125rem', color: 'var(--primary)', fontWeight: '600', letterSpacing: '0.05em', marginTop: '2px' }}>Student ID: 67162110374-2</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/login" className="btn" style={{ color: 'white' }}>Login</Link>
          <Link href="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      <main style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
          Track Your Health with <br />
          <span style={{ color: 'var(--primary)' }}>Precision</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '3rem' }}>
          The complete BMI solution for multi-user environments. Monitor trends, generate MIS reports, and stay on top of your health goals with our advanced tracking platform.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'left' }}>
            <Users color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h3>Multi-User Support</h3>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Individual profiles for family members or clinic patients.</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'left' }}>
            <BarChart2 color="var(--secondary)" style={{ marginBottom: '1rem' }} />
            <h3>MIS Reports</h3>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Detailed daily, weekly, and monthly health analytics.</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'left' }}>
            <Shield color="var(--success)" style={{ marginBottom: '1rem' }} />
            <h3>Secure Storage</h3>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Your health data is stored securely in our private database.</p>
          </div>
        </div>

        <Link href="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
          Start for Free <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
        </Link>
      </main>

      <footer style={{ marginTop: '8rem', paddingBottom: '4rem', opacity: 0.5, textAlign: 'center' }}>
        <p>&copy; 2026 BMI Tracker Pro. Built with Next.js & SQLite.</p>
      </footer>
    </div>
  );
}
