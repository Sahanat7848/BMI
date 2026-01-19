import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Activity, ChevronLeft, TrendingUp, Calendar, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import BMIChart from "@/app/components/BMIChart";

export default async function ReportsPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");
    const userId = session.user.id as string;

    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(new Date().setDate(now.getDate() - 7));
    const startOfMonth = new Date(new Date().setMonth(now.getMonth() - 1));
    const startOfYear = new Date(new Date().setFullYear(now.getFullYear() - 1));

    const [daily, weekly, monthly, yearly, chartRecords] = await Promise.all([
        prisma.bMIRecord.aggregate({
            where: { userId, recordedAt: { gte: startOfDay } },
            _avg: { bmi: true }, _count: true
        }),
        prisma.bMIRecord.aggregate({
            where: { userId, recordedAt: { gte: startOfWeek } },
            _avg: { bmi: true }, _count: true
        }),
        prisma.bMIRecord.aggregate({
            where: { userId, recordedAt: { gte: startOfMonth } },
            _avg: { bmi: true }, _count: true
        }),
        prisma.bMIRecord.aggregate({
            where: { userId, recordedAt: { gte: startOfYear } },
            _avg: { bmi: true }, _count: true
        }),
        prisma.bMIRecord.findMany({
            where: { userId },
            orderBy: { recordedAt: 'asc' },
            take: 30
        })
    ]);

    const chartData = chartRecords.map((r: any) => ({
        date: new Date(r.recordedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        bmi: parseFloat(r.bmi.toFixed(1))
    }));

    const stats = [
        { title: 'Today', count: daily._count, avg: daily._avg.bmi, color: 'var(--primary)' },
        { title: 'Last 7 Days', count: weekly._count, avg: weekly._avg.bmi, color: 'var(--secondary)' },
        { title: 'Last 30 Days', count: monthly._count, avg: monthly._avg.bmi, color: 'var(--accent)' },
        { title: 'This Year', count: yearly._count, avg: yearly._avg.bmi, color: 'var(--success)' },
    ];

    return (
        <div className="container animate-fade-in">
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', textDecoration: 'none', marginBottom: '2rem' }}>
                <ChevronLeft size={20} /> Back to Dashboard
            </Link>

            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>MIS Reports</h1>
                <p style={{ color: '#94a3b8' }}>Management Information System - BMI Trends & Analysis</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat) => (
                    <div key={stat.title} className="glass-card" style={{ padding: '2rem' }}>
                        <h4 style={{ color: '#94a3b8', marginBottom: '1rem' }}>{stat.title}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color }}>
                                    {stat.avg ? stat.avg.toFixed(1) : '0.0'}
                                </div>
                                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Average BMI</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{stat.count}</div>
                                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Records</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ padding: '2.5rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <TrendingUp size={24} color="var(--primary)" /> BMI Trend Analysis (Last 30 Records)
                </h3>
                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Visual representation of your BMI progress over time.</p>

                {chartData.length > 0 ? (
                    <BMIChart data={chartData} />
                ) : (
                    <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                        Not enough data to generate trend analysis. Add more records to see your progress!
                    </div>
                )}
            </div>
        </div>
    );
}
