import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Activity, ChevronLeft, Trash2, History as HistoryIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HistoryPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const records = await prisma.bMIRecord.findMany({
        where: { userId: session.user.id as string },
        orderBy: { recordedAt: 'desc' },
    });

    return (
        <div className="container animate-fade-in">
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', textDecoration: 'none', marginBottom: '2rem' }}>
                <ChevronLeft size={20} /> Back to Dashboard
            </Link>

            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HistoryIcon size={32} color="var(--primary)" /> Full BMI History
                </h1>
                <p style={{ color: '#94a3b8' }}>Review and manage all your health records</p>
            </div>

            <div className="glass-card" style={{ padding: '2rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                            <th style={{ padding: '1rem', color: '#94a3b8' }}>Date</th>
                            <th style={{ padding: '1rem', color: '#94a3b8' }}>Weight (kg)</th>
                            <th style={{ padding: '1rem', color: '#94a3b8' }}>Height (cm)</th>
                            <th style={{ padding: '1rem', color: '#94a3b8' }}>BMI Score</th>
                            <th style={{ padding: '1rem', color: '#94a3b8' }}>Category</th>
                            <th style={{ padding: '1rem', color: '#94a3b8', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length > 0 ? records.map((record: any) => (
                            <tr key={record.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <td style={{ padding: '1rem' }}>{new Date(record.recordedAt).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>{record.weight.toFixed(1)}</td>
                                <td style={{ padding: '1rem' }}>{record.height.toFixed(1)}</td>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{record.bmi.toFixed(1)}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '99px',
                                        fontSize: '0.8rem',
                                        background: record.category === 'Normal' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                        color: record.category === 'Normal' ? 'var(--success)' : 'var(--warning)'
                                    }}>
                                        {record.category}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <form action={async () => {
                                        'use server';
                                        const { auth } = await import("@/auth");
                                        const session = await auth();
                                        if (!session?.user?.id) return;

                                        const { prisma } = await import("@/lib/prisma");
                                        await prisma.bMIRecord.delete({
                                            where: { id: record.id, userId: session.user.id as string }
                                        });

                                        const { revalidatePath } = await import("next/cache");
                                        revalidatePath("/dashboard/history");
                                        revalidatePath("/dashboard");
                                    }}>
                                        <button className="btn" style={{
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            color: 'var(--error)',
                                            padding: '0.5rem',
                                            borderRadius: '8px'
                                        }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}> No history records found. </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
