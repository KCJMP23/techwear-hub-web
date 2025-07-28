import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import AdminNavigation from '@/components/AdminNavigation';
import ProtectedLayout from '@/components/ProtectedLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Affiliate Platform - Admin Dashboard',
  description: 'Admin dashboard for the affiliate platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ProtectedLayout>
            {children}
          </ProtectedLayout>
        </Providers>
      </body>
    </html>
  );
}