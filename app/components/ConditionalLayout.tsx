'use client';

import { usePathname } from 'next/navigation';
import MasterDashNavbar from './MasterDashNavbar';
import { ReactNode } from 'react';

interface ConditionalLayoutProps {
  children: ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  const excludedRoutes = ['/login', '/register', '/auth'];
  const showNavbar = !excludedRoutes.includes(pathname);

  return (
    <>
      {showNavbar ? (
        <MasterDashNavbar>
          {children}
        </MasterDashNavbar>
      ) : (
        <>
          {children}
        </>
      )}
    </>
  );
}
