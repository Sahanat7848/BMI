import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BMI Tracker Pro - Advanced Health Monitoring",
  description: "Track your BMI, analyze health trends, and generate MIS reports with our premium multi-user health platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Global Student ID Badge */}
        <div className="pulse-id" style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '1.25rem 2.5rem',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '2px solid var(--primary)',
          borderRadius: '24px',
          zIndex: 9999,
          color: 'white',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.3)',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          whiteSpace: 'nowrap',
          textAlign: 'center'
        }}>
          <div style={{
            fontWeight: '800',
            fontSize: '1.5rem',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.25rem'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary)' }}></div>
            67162110374-2
          </div>
          <div style={{ opacity: 0.9, fontSize: '1rem', fontWeight: '500', color: '#cbd5e1' }}>
            user : dekdee@test.com
          </div>
          <div style={{ opacity: 0.9, fontSize: '1rem', fontWeight: '500', color: '#cbd5e1' }}>
            password : dekdee123
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
