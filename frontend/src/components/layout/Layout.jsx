// ============================================
// Layout Component — Main App Layout Wrapper
// ============================================
// Wraps the main content area with the Header.
// Manages mobile sidebar state.

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      {/* Top Navigation */}
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
