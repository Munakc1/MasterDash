'use client';

import { ReactNode, useState } from 'react';
import {
  Dashboard, People, LocalHospital, Healing, Inventory2, ShoppingCart, LocalPharmacy, SupportAgent,
  AccountCircle, HelpOutline, Calculate, Settings, ExpandLess, ExpandMore, BarChart, Analytics,
  Menu, Mail, Notifications, Logout, LightMode, DarkMode, Search, LocalShipping, AttachMoney,
} from '@mui/icons-material';

import {
  Avatar, Collapse, List, ListItemButton, ListItemIcon, ListItemText,
  Popover, Typography, IconButton, Tooltip,
} from '@mui/material';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  const [moreOpen, setMoreOpen] = useState(false);
  const [financeOpen, setFinanceOpen] = useState(false); // state for Finance dropdown
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const [mailAnchor, setMailAnchor] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleProfileMenuOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleNotifOpen = (event: any) => setNotifAnchor(event.currentTarget);
  const handleNotifClose = () => setNotifAnchor(null);
  const handleMailOpen = (event: any) => setMailAnchor(event.currentTarget);
  const handleMailClose = () => setMailAnchor(null);

  const handleMyAccount = () => router.push('/account');
  const handleLogout = () => {
    localStorage.clear();
    router.push('/logout');
  };

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
    { label: 'Ambulance Service', icon: <LocalShipping fontSize="small" />, path: '/ambulance' },
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

  const financeItems = [
    { label: 'Pharmacy Transactions', path: '/finance/pharmacy-transaction', icon: <LocalPharmacy fontSize="small" /> },
    { label: 'Patient Transactions', path: '/finance/patient-transaction', icon: <People fontSize="small" /> },
    { label: 'Doctor Transactions', path: '/finance/doctor-transaction', icon: <LocalHospital fontSize="small" /> },
  ];

  const NAVBAR_HEIGHT = 56;

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {!isHomePage && (
        <>
          {/* Navbar */}
          <nav className={`px-4 py-2 flex items-center justify-between fixed top-0 left-0 right-0 z-50 shadow-md ${darkMode ? 'bg-black text-white' : 'bg-white text-[#0077B6]'}`} style={{ height: NAVBAR_HEIGHT }}>
            <div className="flex items-center space-x-4">
              <button onClick={toggleSidebar} className="p-2 rounded hover:bg-[#CAF0F8] transition">
                <Menu />
              </button>
              <div className="font-semibold hidden sm:block text-2xl select-none">Dashboard</div>
            </div>

            <div className="flex-grow max-w-lg mx-4">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search patient and doctor…"
                  className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#62c0ec] shadow-inner"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Tooltip title="Messages">
                <IconButton onClick={handleMailOpen}>
                  <Mail className={darkMode ? 'text-white' : 'text-black'} />
                </IconButton>
              </Tooltip>
              <Popover open={Boolean(mailAnchor)} anchorEl={mailAnchor} onClose={handleMailClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <div className="p-4 w-64">
                  <Typography variant="subtitle1">Messages</Typography>
                  <p className="text-sm text-gray-500">No new messages.</p>
                </div>
              </Popover>

              <Tooltip title="Notifications">
                <IconButton onClick={handleNotifOpen}>
                  <Notifications className={darkMode ? 'text-white' : 'text-black'} />
                </IconButton>
              </Tooltip>
              <Popover open={Boolean(notifAnchor)} anchorEl={notifAnchor} onClose={handleNotifClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <div className="p-4 w-64">
                  <Typography variant="subtitle1">Notifications</Typography>
                  <p className="text-sm text-gray-500">No new notifications.</p>
                </div>
              </Popover>

              <Tooltip title="Toggle Dark Mode">
                <IconButton onClick={toggleDarkMode}>
                  {darkMode ? <DarkMode className="text-white" /> : <LightMode className="text-black" />}
                </IconButton>
              </Tooltip>

              <button onClick={handleProfileMenuOpen} className="flex items-center space-x-2 p-2 rounded hover:bg-[#CAF0F8] transition">
                <img src={userImage} alt="User" className="h-6 w-6 rounded-full" />
                <span className="hidden sm:block font-medium text-base">{userName}</span>
              </button>
            </div>

            {isMenuOpen && anchorEl && (
              <div
                className="absolute bg-gray-900 text-white rounded-lg shadow-lg w-48 z-50 ring-1 ring-gray-700"
                style={{
                  top: anchorEl.getBoundingClientRect().bottom + window.scrollY,
                  left: anchorEl.getBoundingClientRect().left + window.scrollX,
                  transform: 'translateY(8px)',
                }}
                onMouseLeave={handleMenuClose}
              >
                <div className="px-4 py-3 border-b border-white">
                  <p className="font-semibold text-base">{userName}</p>
                  <p className="text-sm text-gray-300">{userEmail}</p>
                </div>
                <button onClick={() => { handleMyAccount(); handleMenuClose(); }} className="flex items-center w-full px-4 py-2 hover:bg-blue-400 transition">
                  <AccountCircle fontSize="small" className="mr-2" />
                  <span>My account</span>
                </button>
                <button onClick={() => { handleLogout(); handleMenuClose(); }} className="flex items-center w-full px-4 py-2 hover:bg-blue-400 transition">
                  <Logout fontSize="small" className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </nav>

          {/* Layout */}
          <div className="flex flex-1" style={{ paddingTop: NAVBAR_HEIGHT }}>
            {/* Sidebar */}
            <aside className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-16'} fixed top-[56px] left-0 z-40 ${darkMode ? 'bg-black text-white border-gray-700' : 'bg-white text-black border-gray-200'} border-r`} style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
              <List dense className="flex-grow overflow-auto">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.path} passHref>
                    <ListItemButton selected={pathname === item.path} className={`py-1 px-2 ${!sidebarOpen ? 'justify-center' : ''} ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <ListItemIcon className={`${darkMode ? 'text-white' : 'text-black'} min-w-0 justify-center`}>{item.icon}</ListItemIcon>
                      {sidebarOpen && <ListItemText primary={item.label} primaryTypographyProps={{ className: `text-base font-bold ${darkMode ? 'text-white' : 'text-black'}` }} />}
                    </ListItemButton>
                  </Link>
                ))}

                {/* Finance Dropdown */}
                <ListItemButton onClick={() => setFinanceOpen(!financeOpen)} className={`py-1 px-2 ${!sidebarOpen ? 'justify-center' : ''} ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                  <ListItemIcon className={`${darkMode ? 'text-white' : 'text-black'} min-w-0 justify-center`}>
                    <AttachMoney fontSize="small" />
                  </ListItemIcon>
                  {sidebarOpen && <ListItemText primary="Finance" primaryTypographyProps={{ className: `text-base font-bold ${darkMode ? 'text-white' : 'text-black'}` }} />}
                  {sidebarOpen && (financeOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={financeOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding dense>
                    {financeItems.map((item) => (
                      <Link key={item.label} href={item.path} passHref>
                        <ListItemButton className={`pl-10 py-1 ${!sidebarOpen ? 'hidden' : ''} ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                          <ListItemIcon className={`${darkMode ? 'text-white' : 'text-black'}`}>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.label} primaryTypographyProps={{ className: `text-base font-bold ${darkMode ? 'text-white' : 'text-black'}` }} />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>

                {/* More Dropdown */}
                <ListItemButton onClick={() => setMoreOpen(!moreOpen)} className={`py-1 px-2 ${!sidebarOpen ? 'justify-center' : ''} ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                  <ListItemIcon className={`${darkMode ? 'text-white' : 'text-black'} min-w-0 justify-center`}>
                    <Inventory2 fontSize="small" />
                  </ListItemIcon>
                  {sidebarOpen && <ListItemText primary="More" primaryTypographyProps={{ className: `text-base font-bold ${darkMode ? 'text-white' : 'text-black'}` }} />}
                  {sidebarOpen && (moreOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={moreOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding dense>
                    {moreItems.map((item) => (
                      <Link key={item.label} href={item.path} passHref>
                        <ListItemButton className={`pl-10 py-1 ${!sidebarOpen ? 'hidden' : ''} ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                          <ListItemIcon className={`${darkMode ? 'text-white' : 'text-black'}`}>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.label} primaryTypographyProps={{ className: `text-base font-bold ${darkMode ? 'text-white' : 'text-black'}` }} />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </List>

              {/* Sidebar Footer */}
              <div className={`border-t mt-2 px-4 py-3 flex items-center gap-2 ${sidebarOpen ? '' : 'justify-center'} ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <Avatar alt="Mayuk Medical" src="/profile.jpg" sx={{ width: 36, height: 36 }} className={`${sidebarOpen ? '' : 'mx-auto'}`} />
                {sidebarOpen && (
                  <div className="leading-tight">
                    <div className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mayuk Medical</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Admin Dashboard</div>
                  </div>
                )}
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 min-h-[calc(100vh-56px)] transition-all duration-300 ease-in-out" style={{ marginLeft: sidebarOpen ? 256 : 64 }}>
              {children}
            </main>
          </div>
        </>
      )}
      {isHomePage && <main className="flex-1">{children}</main>}
    </div>
  );
}
