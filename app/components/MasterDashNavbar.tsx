'use client';

import { ReactNode, useState } from 'react';
import {
  Dashboard,
  People,
  LocalHospital,
  Healing,
  Inventory2,
  ShoppingCart,
  LocalPharmacy,
  SupportAgent,
  AccountCircle,
  HelpOutline,
  Calculate,
  Settings,
  ExpandLess,
  ExpandMore,
  BarChart,
  Analytics,
  Menu,
  Mail,
  Notifications,
  Logout,
  LightMode,
  DarkMode,
  Search,
} from '@mui/icons-material';

import {
  Avatar,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [moreOpen, setMoreOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleProfileMenuOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const userName = 'Binode Kumar';
  const userEmail = 'Binod@master.com';
  const userImage = 'https://i.pravatar.cc/40?img=3';

  const navItems = [
    { label: 'Analysis', icon: <Dashboard fontSize="small" />, path: '/analysis' },
    { label: 'Patient', icon: <People fontSize="small" />, path: '/patient' },
    { label: 'Doctor', icon: <LocalHospital fontSize="small" />, path: '/doctor' },
    { label: 'Nurse', icon: <Healing fontSize="small" />, path: '/nurse' },
    { label: 'Medicine Stock', icon: <Inventory2 fontSize="small" />, path: '/medicine-stock' },
    { label: 'Medicine Orders', icon: <ShoppingCart fontSize="small" />, path: '/orders' },
    { label: 'Pharmacy', icon: <LocalPharmacy fontSize="small" />, path: '/pharmacy' },
    { label: 'Support', icon: <SupportAgent fontSize="small" />, path: '/support' },
    { label: 'Account', icon: <AccountCircle fontSize="small" />, path: '/account' },
    { label: 'FAQs', icon: <HelpOutline fontSize="small" />, path: '/faqs' },
    { label: 'Calculator', icon: <Calculate fontSize="small" />, path: '/calculator' },
    { label: 'Settings', icon: <Settings fontSize="small" />, path: '/settings' },
  ];

  const moreItems = [
    { label: 'Reports', path: '/reports', icon: <BarChart fontSize="small" /> },
    { label: 'Analytics', path: '/analytics', icon: <Analytics fontSize="small" /> },
  ];

  const NAVBAR_HEIGHT = 56;

  return (
    <div className="flex flex-col min-h-screen">
      {!isHomePage ? (
        <>
          {/* Navbar */}
          <nav
            className="bg-[#0077B6] text-white px-4 py-2 flex items-center justify-between fixed top-0 left-0 right-0 z-50"
            style={{ height: NAVBAR_HEIGHT }}
          >
            <div className="flex items-center space-x-4">
              <button
                aria-label="Toggle Sidebar"
                onClick={toggleSidebar}
                className="p-2 rounded hover:bg-[#5FA8D3] transition duration-150"
              >
                <Menu />
              </button>
              <div className="font-semibold hidden sm:block text-2xl select-none">Dashboard</div>
            </div>

            <div className="flex-grow max-w-lg mx-4">
              <div className="relative text-[#CAF0F8]">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="text-[#5FA8D3]" />
                </span>
                <input
                  type="search"
                  placeholder="Search…"
                  className="w-full py-2 pl-10 pr-4 rounded-md bg-[#CAF0F8] text-[#0077B6] placeholder-[#5FA8D3] focus:outline-none focus:ring-2 focus:ring-[#4C956C] shadow-inner"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded hover:bg-[#5FA8D3] transition duration-150">
                <Mail />
              </button>
              <button className="p-2 rounded hover:bg-[#5FA8D3] transition duration-150">
                <Notifications />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded hover:bg-[#5FA8D3] transition duration-150"
              >
                {darkMode ? (
                  <LightMode className="text-[#F4A261]" />
                ) : (
                  <DarkMode className="text-white" />
                )}
              </button>
              <button
                onClick={handleProfileMenuOpen}
                className="flex items-center space-x-2 p-2 rounded hover:bg-[#5FA8D3] transition duration-150"
              >
                <img src={userImage} alt="User" className="h-6 w-6 rounded-full" />
                <span className="hidden sm:block font-medium text-base">{userName}</span>
              </button>
            </div>

            {isMenuOpen && anchorEl && (
              <div
                className="absolute bg-white text-[#0077B6] rounded-lg shadow-md w-48 z-50 ring-1 ring-gray-200"
                style={{
                  top: anchorEl.getBoundingClientRect().bottom + window.scrollY,
                  left: anchorEl.getBoundingClientRect().left + window.scrollX,
                  transform: 'translateY(8px)',
                }}
                onMouseLeave={handleMenuClose}
              >
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold text-base">{userName}</p>
                  <p className="text-sm text-gray-600">{userEmail}</p>
                </div>
                <button
                  onClick={handleMenuClose}
                  className="flex items-center w-full px-4 py-2 hover:bg-[#CAF0F8]"
                >
                  <AccountCircle fontSize="small" />
                  <span className="ml-2">My account</span>
                </button>
                <button
                  onClick={handleMenuClose}
                  className="flex items-center w-full px-4 py-2 hover:bg-[#CAF0F8]"
                >
                  <Logout fontSize="small" />
                  <span className="ml-2">Logout</span>
                </button>
              </div>
            )}
          </nav>

          {/* Sidebar + Content */}
          <div className="flex flex-1" style={{ paddingTop: NAVBAR_HEIGHT }}>
            <aside
              className={`bg-white border-r border-gray-200 flex-col shadow-sm transition-all duration-300 ease-in-out ${
                sidebarOpen ? 'w-64 flex flex-col' : 'w-16 flex flex-col'
              }`}
              style={{
                height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
                position: 'fixed',
                top: NAVBAR_HEIGHT,
                left: 0,
              }}
            >
              <List dense className="flex-grow overflow-auto">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.path} passHref>
                    <ListItemButton
                      selected={pathname === item.path}
                      className={`py-1 px-2 ${!sidebarOpen ? 'justify-center' : ''}`}
                    >
                      <ListItemIcon className="text-black min-w-0 justify-center">
                        {item.icon}
                      </ListItemIcon>
                      {sidebarOpen && (
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{ className: 'text-sm' }}
                        />
                      )}
                    </ListItemButton>
                  </Link>
                ))}

                <ListItemButton
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`py-1 px-2 ${!sidebarOpen ? 'justify-center' : ''}`}
                >
                  <ListItemIcon className="text-black min-w-0 justify-center">
                    <Inventory2 fontSize="small" />
                  </ListItemIcon>
                  {sidebarOpen && (
                    <ListItemText
                      primary="More"
                      primaryTypographyProps={{ className: 'text-sm' }}
                    />
                  )}
                  {sidebarOpen && (moreOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>

                <Collapse in={moreOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding dense>
                    {moreItems.map((item) => (
                      <Link key={item.label} href={item.path} passHref>
                        <ListItemButton className={`pl-10 py-1 ${!sidebarOpen ? 'hidden' : ''}`}>
                          <ListItemIcon className="text-black">{item.icon}</ListItemIcon>
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ className: 'text-sm' }}
                          />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </List>

              <div
                className={`border-t mt-2 px-4 py-3 flex items-center gap-2 ${
                  sidebarOpen ? '' : 'justify-center'
                }`}
              >
                <Avatar
                  alt="Mayuk Medical"
                  src="/profile.jpg"
                  sx={{ width: 36, height: 36 }}
                  className={`${sidebarOpen ? '' : 'mx-auto'}`}
                />
                {sidebarOpen && (
                  <div className="leading-tight">
                    <div className="font-semibold text-sm text-gray-800">Mayuk Medical</div>
                    <div className="text-xs text-gray-500">Admin Dashboard</div>
                  </div>
                )}
              </div>
            </aside>

            <main
              className="flex-1 p-6 bg-[#CAF0F8] min-h-[calc(100vh-56px)] transition-all duration-300 ease-in-out"
              style={{
                marginLeft: sidebarOpen ? 256 : 64,
                width: `calc(100% - ${sidebarOpen ? 256 : 64}px)`,
              }}
            >
              {children}
            </main>
          </div>
        </>
      ) : (
        // Show only main content on homepage
        <main className="flex-1">{children}</main>
      )}
    </div>
  );
}
