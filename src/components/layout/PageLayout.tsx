
import React, { ReactNode } from 'react';
import Navbar from '../Navbar';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-50">
      <Navbar />
      <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <div className="container mx-auto px-3 py-4 md:px-6 max-w-7xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
