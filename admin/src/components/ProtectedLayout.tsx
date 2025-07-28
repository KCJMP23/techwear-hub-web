'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import AdminNavigation from './AdminNavigation';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Define auth pages that should not show the sidebar
  const authPages = ['/auth/signin', '/auth/signup', '/auth/forgot-password'];
  const isAuthPage = authPages.includes(pathname);

  // If it's an auth page, render without sidebar
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-apple-gray-50">
        {children}
      </div>
    );
  }

  // If not authenticated and not on auth page, redirect will be handled by ProtectedRoute
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-apple-gray-50">
        <div className="text-center animate-fade-in-up">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue mx-auto"></div>
          <p className="mt-4 text-apple-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, show the full layout with sidebar
  if (session) {
    return (
      <div className="flex min-h-screen bg-apple-gray-50 overflow-x-hidden">
        <AdminNavigation />
        <div className="flex-1 w-full overflow-x-hidden lg:ml-0">
          <main className="p-4 md:p-6 lg:p-8 max-w-full">
            {children}
          </main>
        </div>
      </div>
    );
  }

  // If not authenticated, show loading (will be redirected by ProtectedRoute)
  return (
    <div className="min-h-screen flex items-center justify-center bg-apple-gray-50">
      <div className="text-center animate-fade-in-up">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue mx-auto"></div>
        <p className="mt-4 text-apple-gray-600">Loading...</p>
      </div>
    </div>
  );
} 