'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddRecordPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const weight = formData.get('weight');
        const height = formData.get('height');

        try {
            const res = await fetch('/api/bmi', {
                method: 'POST',
                body: JSON.stringify({ weight, height }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container animate-fade-in">
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', textDecoration: 'none', marginBottom: '2rem' }}>
                <ChevronLeft size={20} /> Back to Dashboard
            </Link>

            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="glass-card" style={{ padding: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)' }}>
                            <Activity color="var(--primary)" />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem' }}>New BMI Record</h2>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Enter your details to calculate BMI</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Weight (kg)</label>
                                <input name="weight" type="number" step="0.1" placeholder="70.5" required />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Height (cm)</label>
                                <input name="height" type="number" step="0.1" placeholder="175" required />
                            </div>
                        </div>

                        <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop: '1rem', padding: '1rem' }}>
                            {loading ? 'Calculating...' : 'Calculate & Save Record'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
