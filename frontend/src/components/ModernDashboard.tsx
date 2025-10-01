import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ModernDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState([
    { title: 'Entreprises', value: '0', change: '+0%', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { title: 'Utilisateurs', value: '0', change: '+0%', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
    { title: 'Employés', value: '0', change: '+0%', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { title: 'Revenus', value: '€0', change: '+0%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z' },
    { id: 'companies', label: 'Entreprises', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'users', label: 'Utilisateurs', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
    { id: 'employees', label: 'Employés', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'add-company', label: 'Nouvelle Entreprise', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
    { id: 'add-user', label: 'Nouveau Utilisateur', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch companies count
      const companiesResponse = await fetch('http://localhost:3000/api/v1/entreprises');
      const companies = companiesResponse.ok ? await companiesResponse.json() : [];

      // Fetch users count
      const usersResponse = await fetch('http://localhost:3000/api/v1/users');
      const users = usersResponse.ok ? await usersResponse.json() : [];

      // Fetch employees count
      const employeesResponse = await fetch('http://localhost:3000/api/v1/employes');
      const employees = employeesResponse.ok ? await employeesResponse.json() : [];

      setStats([
        {
          title: 'Entreprises',
          value: companies.length.toString(),
          change: '+0%',
          icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
        },
        {
          title: 'Utilisateurs',
          value: users.length.toString(),
          change: '+0%',
          icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
        },
        {
          title: 'Employés',
          value: employees.length.toString(),
          change: '+0%',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        },
        {
          title: 'Revenus',
          value: '€0',
          change: '+0%',
          icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
        },
      ]);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };


  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
    if (menuId !== 'dashboard') {
      navigate(`/${menuId}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#F4EBD3]">
      {/* Sidebar */}
      <div className="w-64 bg-[#DED3C4] shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 bg-[#555879]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#F4EBD3] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#555879]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-[#F4EBD3] font-bold text-lg">Gestion</span>
          </div>
        </div>

        {/* Menu */}
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeMenu === item.id
                    ? 'bg-[#F4EBD3] text-[#555879] border-r-4 border-[#555879]'
                    : 'text-[#555879] hover:bg-[#F4EBD3] hover:text-[#555879]'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>


      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#DED3C4] shadow-sm border-b border-[#98A1BC]/30">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-[#98A1BC]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] placeholder-[#98A1BC]"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-[#98A1BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#555879] rounded-full flex items-center justify-center">
                  <span className="text-[#F4EBD3] font-semibold text-sm">
                    {user?.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#555879]">
                    {user?.email}
                  </p>
                  <p className="text-xs text-[#98A1BC] capitalize">
                    {user?.role === 'super-admin' ? 'Super Admin' : user?.role}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-[#796055] hover:bg-[#555879]/90 text-[#F4EBD3] font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                title="Déconnexion"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#555879] mb-2">
                Bonjour, {user?.email}!
              </h1>
              <p className="text-[#98A1BC]">
                Voici un aperçu de votre système de gestion des salaires.
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-[#DED3C4] rounded-lg shadow-sm border-2 border-[#98A1BC]/30 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#98A1BC]">{stat.title}</p>
                      <p className="text-2xl font-bold text-[#555879] mt-1">{stat.value}</p>
                      <p className="text-sm text-[#555879] mt-1">{stat.change} depuis le mois dernier</p>
                    </div>
                    <div className="w-12 h-12 bg-[#F4EBD3] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#555879]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Area Chart */}
              <div className="lg:col-span-2 bg-[#DED3C4] rounded-lg shadow-sm border-2 border-[#98A1BC]/30 p-6">
                <h3 className="text-lg font-semibold text-[#555879] mb-4">Évolution Annuelle</h3>
                <div className="h-64 bg-[#F4EBD3] rounded-lg p-4">
                  <div className="flex justify-between items-end h-full">
                    {/* Janvier */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-[#555879] rounded-t-sm mb-2" style={{height: '40px'}}></div>
                      <span className="text-xs text-[#98A1BC] font-medium">Jan</span>
                    </div>
                    {/* Février */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-[#555879] rounded-t-sm mb-2" style={{height: '55px'}}></div>
                      <span className="text-xs text-[#98A1BC] font-medium">Fév</span>
                    </div>
                    {/* Mars */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-[#98A1BC] rounded-t-sm mb-2" style={{height: '70px'}}></div>
                      <span className="text-xs text-[#98A1BC] font-medium">Mar</span>
                    </div>
                    {/* Avril */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-[#98A1BC] rounded-t-sm mb-2" style={{height: '85px'}}></div>
                      <span className="text-xs text-[#98A1BC] font-medium">Avr</span>
                    </div>
                    {/* Mai */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-[#555879] rounded-t-sm mb-2" style={{height: '95px'}}></div>
                      <span className="text-xs text-[#98A1BC] font-medium">Mai</span>
                    </div>
                    {/* Juin */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-[#555879] rounded-t-sm mb-2" style={{height: '110px'}}></div>
                      <span className="text-xs text-[#98A1BC] font-medium">Jun</span>
                    </div>
                    {/* Juillet */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-[#DED3C4] rounded-t-sm mb-2 border border-[#98A1BC]/30" style={{height: '125px'}}></div>
                      <span className="text-xs text-[#98A1BC] font-medium">Jul</span>
                    </div>
                    {/* Août */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-[#DED3C4] rounded-t-sm mb-2 border border-[#98A1BC]/30" style={{height: '140px'}}></div>
                      <span className="text-xs text-[#98A1BC] font-medium">Aoû</span>
                    </div>
                    {/* Septembre */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-[#555879] rounded-t-sm mb-2" style={{height: '155px'}}></div>
                      <span className="text-xs text-[#98A1BC] font-medium">Sep</span>
                    </div>
                    {/* Octobre */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-[#555879] rounded-t-sm mb-2" style={{height: '170px'}}></div>
                      <span className="text-xs text-[#98A1BC] font-medium">Oct</span>
                    </div>
                    {/* Novembre */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-[#98A1BC] rounded-t-sm mb-2" style={{height: '185px'}}></div>
                      <span className="text-xs text-[#98A1BC] font-medium">Nov</span>
                    </div>
                    {/* Décembre */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-[#98A1BC] rounded-t-sm mb-2" style={{height: '200px'}}></div>
                      <span className="text-xs text-[#98A1BC] font-medium">Déc</span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 space-x-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#555879] rounded-sm mr-2"></div>
                      <span className="text-xs text-[#98A1BC]">Revenus</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#98A1BC] rounded-sm mr-2"></div>
                      <span className="text-xs text-[#98A1BC]">Dépenses</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#DED3C4] rounded-sm mr-2 border border-[#98A1BC]/30"></div>
                      <span className="text-xs text-[#98A1BC]">Bénéfices</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Widget */}
              <div className="bg-[#DED3C4] rounded-lg shadow-sm border-2 border-[#98A1BC]/30 p-6">
                <h3 className="text-lg font-semibold text-[#555879] mb-4">Calendrier</h3>
                <div className="text-center">
                  <div className="text-sm font-medium text-[#555879] mb-2">Janvier 2025</div>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                      <div key={i} className="p-2 text-[#98A1BC] font-medium">{day}</div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => (
                      <div
                        key={i + 1}
                        className={`p-2 rounded hover:bg-[#F4EBD3] cursor-pointer ${
                          i + 1 === 15 ? 'bg-[#555879] text-[#F4EBD3] font-semibold' : 'text-[#555879]'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Donut Chart */}
              <div className="bg-[#DED3C4] rounded-lg shadow-sm border-2 border-[#98A1BC]/30 p-6">
                <h3 className="text-lg font-semibold text-[#555879] mb-4">Top Produits</h3>
                <div className="flex items-center justify-center h-48">
                  <div className="relative">
                    <svg className="w-32 h-32" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#555879"
                        strokeWidth="3"
                        strokeDasharray="60, 100"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#98A1BC"
                        strokeWidth="3"
                        strokeDasharray="25, 100"
                        strokeDashoffset="-60"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#DED3C4"
                        strokeWidth="3"
                        strokeDasharray="15, 100"
                        strokeDashoffset="-85"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#555879]">95K</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#98A1BC]">Vector</span>
                    <span className="font-semibold text-[#555879]">45%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#98A1BC]">Template</span>
                    <span className="font-semibold text-[#555879]">30%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#98A1BC]">Presentation</span>
                    <span className="font-semibold text-[#555879]">25%</span>
                  </div>
                </div>
              </div>

              {/* Traffic Source */}
              <div className="bg-[#DED3C4] rounded-lg shadow-sm border-2 border-[#98A1BC]/30 p-6">
                <h3 className="text-lg font-semibold text-[#555879] mb-4">Sources de Trafic</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#98A1BC]">Direct</span>
                      <span className="font-semibold text-[#555879]">45%</span>
                    </div>
                    <div className="w-full bg-[#F4EBD3] rounded-full h-2">
                      <div className="bg-[#555879] h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#98A1BC]">Social</span>
                      <span className="font-semibold text-[#555879]">25%</span>
                    </div>
                    <div className="w-full bg-[#F4EBD3] rounded-full h-2">
                      <div className="bg-[#98A1BC] h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#98A1BC]">Email</span>
                      <span className="font-semibold text-[#555879]">30%</span>
                    </div>
                    <div className="w-full bg-[#F4EBD3] rounded-full h-2">
                      <div className="bg-[#DED3C4] h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#DED3C4] rounded-lg shadow-sm border-2 border-[#98A1BC]/30 p-6">
                <h3 className="text-lg font-semibold text-[#555879] mb-4">Actions Rapides</h3>
                <div className="space-y-3">
                  {user?.role === 'super-admin' ? (
                    <>
                      <button
                        onClick={() => navigate('/add-company')}
                        className="w-full bg-[#555879] hover:bg-[#555879]/90 text-[#F4EBD3] font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Nouvelle Entreprise</span>
                      </button>
                      <button
                        onClick={() => navigate('/users')}
                        className="w-full bg-[#98A1BC] hover:bg-[#98A1BC]/90 text-[#F4EBD3] font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <span>Gérer Utilisateurs</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate('/employees')}
                        className="w-full bg-[#555879] hover:bg-[#555879]/90 text-[#F4EBD3] font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Gérer Employés</span>
                      </button>
                      <button
                        onClick={() => navigate('/add-user')}
                        className="w-full bg-[#98A1BC] hover:bg-[#98A1BC]/90 text-[#F4EBD3] font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <span>Ajouter Utilisateur</span>
                      </button>
                      <button
                        onClick={() => navigate('/salary-payment')}
                        className="w-full bg-[#DED3C4] hover:bg-[#DED3C4]/90 text-[#555879] font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 border border-[#98A1BC]/30"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span>Paiement de Salaire</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModernDashboard;