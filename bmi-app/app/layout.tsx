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
          padding: '0.75rem 2rem',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '2px solid var(--primary)',
          borderRadius: '99px',
          zIndex: 9999,
          color: 'white',
          fontWeight: '800',
          fontSize: '1.5rem',
          boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
          pointerEvents: 'none',
          letterSpacing: '0.1em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          whiteSpace: 'nowrap'
        }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary)' }}></div>
          67162110374-2
        </div>

        {children}
      </body>
    </html>
  );
}
