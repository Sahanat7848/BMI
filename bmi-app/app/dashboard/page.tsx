import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Activity, LogOut, Plus, History, BarChart3 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) redirect("/login");

    const records = await prisma.bMIRecord.findMany({
        where: { userId: session.user.id },
        orderBy: { recordedAt: 'desc' },
        take: 5,
    });

    const latestRecord = records[0];

    return (
        <div className="container animate-fade-in">
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <Activity size={28} color="var(--primary)" />
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>BMI Pro</span>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{ color: '#94a3b8' }}>Hello, {session.user.name}</span>
                    <form action={async () => {
                        'use server';
                        await signOut();
                    }}>
                        <button className="btn" style={{ background: 'transparent', color: '#94a3b8', border: '1px solid var(--glass-border)' }}>
                            <LogOut size={18} /> Logout
                        </button>
                    </form>
                </div>
            </nav>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
                {/* Quick Stats */}
                <div className="glass-card" style={{ gridColumn: 'span 4', padding: '2rem', textAlign: 'center' }}>
                    <h4 style={{ color: '#94a3b8', marginBottom: '1rem' }}>Latest BMI</h4>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        {latestRecord ? latestRecord.bmi.toFixed(1) : '--'}
                    </div>
                    <p style={{ marginTop: '0.5rem', fontWeight: '600', color: 'var(--success)' }}>
                        {latestRecord ? latestRecord.category : 'No data yet'}
                    </p>
                </div>

                {/* Navigation Cards */}
                <Link href="/dashboard/add" className="glass-card" style={{ gridColumn: 'span 4', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', textDecoration: 'none', transition: 'transform 0.2s' }}>
                    <div style={{ padding: '1rem', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)' }}>
                        <Plus size={32} color="var(--primary)" />
                    </div>
                    <h3 style={{ color: 'white' }}>Add Record</h3>
                </Link>

                <Link href="/dashboard/reports" className="glass-card" style={{ gridColumn: 'span 4', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', textDecoration: 'none', transition: 'transform 0.2s' }}>
                    <div style={{ padding: '1rem', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.1)' }}>
                        <BarChart3 size={32} color="var(--secondary)" />
                    </div>
                    <h3 style={{ color: 'white' }}>MIS Reports</h3>
                </Link>

                {/* Recent History Table */}
                <div className="glass-card" style={{ gridColumn: 'span 12', padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <History size={20} /> Recent Records
                        </h3>
                        <Link href="/dashboard/history" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem' }}>View All</Link>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ padding: '1rem', color: '#94a3b8' }}>Date</th>
                                <th style={{ padding: '1rem', color: '#94a3b8' }}>Weight (kg)</th>
                                <th style={{ padding: '1rem', color: '#94a3b8' }}>Height (cm)</th>
                                <th style={{ padding: '1rem', color: '#94a3b8' }}>BMI</th>
                                <th style={{ padding: '1rem', color: '#94a3b8' }}>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.length > 0 ? records.map((record: any) => (
                                <tr key={record.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '1rem' }}>{new Date(record.recordedAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem' }}>{record.weight}</td>
                                    <td style={{ padding: '1rem' }}>{record.height}</td>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{record.bmi.toFixed(1)}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                                            {record.category}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No records found. Start by adding your first record!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
