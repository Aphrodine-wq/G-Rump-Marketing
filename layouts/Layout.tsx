import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-app antialiased selection:bg-[#7c3aed] selection:text-white flex flex-col">
      <Navbar />
      <main
        id="main-content"
        className="flex-grow w-full"
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
