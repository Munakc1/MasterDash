'use client';

import { ReactNode, useState } from 'react';
import {
<<<<<<< HEAD
  Dashboard, People, LocalHospital, Healing, Inventory2, ShoppingCart, LocalPharmacy,
  SupportAgent, BarChart, LocalShipping,
  Menu, Mail, Notifications, LightMode, DarkMode, Search, ChevronRight,
=======
  Dashboard, People, LocalHospital, Healing, Inventory2, ShoppingCart, LocalPharmacy, SupportAgent,
  AccountCircle, HelpOutline, Calculate, Settings, ExpandLess, ExpandMore, BarChart, Analytics,
  Menu, Mail, Notifications, Logout, LightMode, DarkMode, Search, LocalShipping, AttachMoney,
>>>>>>> 9c7c356d3319422773f60c84f16195ebf327654d
} from '@mui/icons-material';

import {
  List, ListItemButton, ListItemIcon, ListItemText,
  Popover, Typography, IconButton, Tooltip,
} from '@mui/material';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

<<<<<<< HEAD
=======
  const [moreOpen, setMoreOpen] = useState(false);
  const [financeOpen, setFinanceOpen] = useState(false); // state for Finance dropdown
>>>>>>> 9c7c356d3319422773f60c84f16195ebf327654d
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const [mailAnchor, setMailAnchor] = useState<null | HTMLElement>(null);
  const [financeOpen, setFinanceOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const handleNotifOpen = (event: React.MouseEvent<HTMLElement>) => setNotifAnchor(event.currentTarget);
  const handleNotifClose = () => setNotifAnchor(null);
  const handleMailOpen = (event: React.MouseEvent<HTMLElement>) => setMailAnchor(event.currentTarget);
  const handleMailClose = () => setMailAnchor(null);

  const navItems = [
    { label: 'Analysis', icon: <Dashboard fontSize="small" />, path: '/analysis' },
    { label: 'Patient', icon: <People fontSize="small" />, path: '/patient' },
    { label: 'Doctor', icon: <LocalHospital fontSize="small" />, path: '/doctor' },
    { label: 'Nurse', icon: <Healing fontSize="small" />, path: '/nurse' },
    { label: 'Stock', icon: <Inventory2 fontSize="small" />, path: '/medicine-stock' },
    { label: 'Medicine Orders', icon: <ShoppingCart fontSize="small" />, path: '/orders' },
    { label: 'Pharmacy', icon: <LocalPharmacy fontSize="small" />, path: '/pharmacy' },
<<<<<<< HEAD
    { label: 'Finance', icon: <BarChart fontSize="small" /> }, // submenu
=======
>>>>>>> 9c7c356d3319422773f60c84f16195ebf327654d
    { label: 'Ambulance Service', icon: <LocalShipping fontSize="small" />, path: '/ambulance' },
    { label: 'Support', icon: <SupportAgent fontSize="small" />, path: '/support' },
  ];

  const financeSubItems = [
    { label: 'Pharmacy Transaction', path: '/finance/pharmacy-transaction' },
    { label: 'Patient Transaction', path: '/finance/patient-transaction' },
    { label: 'Doctor Transaction', path: '/finance/doctor-transaction' },
    { label: 'Nurse Transaction', path: '/finance/nurse-transaction' },
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
          <nav
            className={`px-4 py-2 flex items-center justify-between fixed top-0 left-0 right-0 z-50 shadow-md ${
              darkMode ? 'bg-black text-white' : 'bg-white text-[#0077B6]'
            }`}
            style={{ height: NAVBAR_HEIGHT }}
          >
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
              <Popover
                open={Boolean(mailAnchor)}
                anchorEl={mailAnchor}
                onClose={handleMailClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
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
              <Popover
                open={Boolean(notifAnchor)}
                anchorEl={notifAnchor}
                onClose={handleNotifClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
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
            </div>
<<<<<<< HEAD
=======

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
>>>>>>> 9c7c356d3319422773f60c84f16195ebf327654d
          </nav>

          <div className="flex flex-1" style={{ paddingTop: NAVBAR_HEIGHT }}>
            <aside
              className={`transition-all duration-300 ease-in-out ${
                sidebarOpen ? 'w-64' : 'w-16'
              } fixed top-[56px] left-0 z-40 flex flex-col justify-between ${
                darkMode ? 'bg-black text-white border-gray-700' : 'bg-white text-black border-gray-200'
              } border-r`}
              style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
            >
              <List dense className="flex-grow overflow-auto">
                {navItems.map((item) => {
                  if (item.label === 'Finance') {
                    return (
                      <div key={item.label}>
                        <ListItemButton
                          onClick={() => setFinanceOpen(prev => !prev)}
                          className={`py-1 px-2 cursor-pointer ${
                            !sidebarOpen ? 'justify-center' : ''
                          } ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                          selected={pathname.startsWith('/finance')}
                        >
                          <ListItemIcon
                            className={`${darkMode ? 'text-white' : 'text-black'} min-w-0 justify-center`}
                          >
                            {item.icon}
                          </ListItemIcon>
                          {sidebarOpen && (
                            <>
                              <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                  className: `text-base font-bold ${darkMode ? 'text-white' : 'text-black'}`,
                                }}
                              />
                              <ChevronRight
                                className={`ml-auto mr-2 transition-transform ${financeOpen ? 'rotate-90' : ''}`}
                              />
                            </>
                          )}
                        </ListItemButton>

<<<<<<< HEAD
                        {/* Finance submenu */}
                        {financeOpen && sidebarOpen && (
  <List component="div" disablePadding className="pl-0">
    {financeSubItems.map((subItem) => (
      <Link key={subItem.label} href={subItem.path} passHref>
        <ListItemButton
          selected={pathname === subItem.path}
          className={`py-1 px-2 ${
            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
          }`}
        >
          <ListItemText
            primary={subItem.label}
            primaryTypographyProps={{
              className: `text-sm ${darkMode ? 'text-white' : 'text-black'}`,
            }}
          />
        </ListItemButton>
      </Link>
    ))}
  </List>
)}

                      </div>
                    );
                  } else {
                    return (
                      <Link key={item.label} href={item.path ?? '#'} passHref>
                        <ListItemButton
                          selected={pathname === item.path}
                          className={`py-1 px-2 ${!sidebarOpen ? 'justify-center' : ''} ${
                            darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                          }`}
                        >
                          <ListItemIcon
                            className={`${darkMode ? 'text-white' : 'text-black'} min-w-0 justify-center`}
                          >
                            {item.icon}
                          </ListItemIcon>
                          {sidebarOpen && (
                            <ListItemText
                              primary={item.label}
                              primaryTypographyProps={{
                                className: `text-base font-bold ${darkMode ? 'text-white' : 'text-black'}`,
                              }}
                            />
                          )}
=======
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
>>>>>>> 9c7c356d3319422773f60c84f16195ebf327654d
                        </ListItemButton>
                      </Link>
                    );
                  }
                })}
              </List>

              {/* Profile section can be added here if needed */}
            </aside>

            <main
              className="flex-grow p-4 transition-all duration-300 ease-in-out"
              style={{ marginLeft: sidebarOpen ? 256 : 64, marginTop: NAVBAR_HEIGHT }}
            >
              {children}
            </main>
          </div>
        </>
      )}

      {isHomePage && <main className="flex-grow p-4">{children}</main>}

      <style jsx>{`
        .rotate-90 {
          transform: rotate(90deg);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
}
