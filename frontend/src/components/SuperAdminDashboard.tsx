import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SuperAdminDashboard: React.FC = () => {
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

  const [chartData, setChartData] = useState<{
    companies: any[];
    users: any[];
    employees: any[];
  }>({
    companies: [],
    users: [],
    employees: []
  });

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
    fetchChartData();
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

  const fetchChartData = async () => {
    try {
      const [companiesRes, usersRes, employeesRes] = await Promise.all([
        fetch('http://localhost:3000/api/v1/entreprises'),
        fetch('http://localhost:3000/api/v1/users'),
        fetch('http://localhost:3000/api/v1/employes')
      ]);

      const companies = companiesRes.ok ? await companiesRes.json() : [];
      const users = usersRes.ok ? await usersRes.json() : [];
      const employees = employeesRes.ok ? await employeesRes.json() : [];

      setChartData({
        companies: Array.isArray(companies) ? companies : [],
        users: Array.isArray(users) ? users : [],
        employees: Array.isArray(employees) ? employees : []
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données des graphiques:', error);
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
            <span className="text-[#F4EBD3] font-bold text-lg">Super Admin</span>
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

        {/* Logout Button */}
        <div className="absolute bottom-8 height-20 left-4 ">
          <button
            onClick={handleLogout}
            className="w-auto mx-auto bg-[#555879] hover:bg-[#555879]/90 text-[#F4EBD3] font-medium py-1.5 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1.5 text-xs"
            title="Déconnexion"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>
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
                    {user?.email?.charAt(0) || 'S'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#555879]">
                    {user?.email}
                  </p>
                  <p className="text-xs text-[#98A1BC] capitalize">
                    Super Admin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#555879] mb-2">
                Bonjour, Super Admin {user?.email}!
              </h1>
              <p className="text-[#98A1BC]">
                Vous avez accès à toutes les fonctionnalités du système de gestion des salaires.
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Employees by Company Chart */}
              <div className="bg-[#DED3C4] rounded-lg shadow-sm border-2 border-[#98A1BC]/30 p-6">
                <h3 className="text-lg font-semibold text-[#555879] mb-4">Employés par Entreprise</h3>
                <div className="space-y-4">
                  {chartData.companies.map((company, index) => {
                    const employeeCount = chartData.employees.filter(emp => emp.entrepriseId === company.id).length;
                    const maxEmployees = Math.max(...chartData.companies.map(c =>
                      chartData.employees.filter(emp => emp.entrepriseId === c.id).length
                    )) || 1;
                    const percentage = (employeeCount / maxEmployees) * 100;

                    return (
                      <div key={company.id} className="flex items-center space-x-3">
                        <div className="w-24 text-sm text-[#555879] truncate">{company.nom}</div>
                        <div className="flex-1 bg-[#F4EBD3] rounded-full h-4">
                          <div
                            className="bg-[#555879] h-4 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-8 text-sm text-[#555879] text-right">{employeeCount}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* User Roles Distribution */}
              <div className="bg-[#DED3C4] rounded-lg shadow-sm border-2 border-[#98A1BC]/30 p-6">
                <h3 className="text-lg font-semibold text-[#555879] mb-4">Répartition des Rôles</h3>
                <div className="space-y-4">
                  {[
                    { role: 'super-admin', label: 'Super Admin', color: '#555879' },
                    { role: 'admin', label: 'Admin', color: '#98A1BC' },
                    { role: 'caissier', label: 'Caissier', color: '#DED3C4' }
                  ].map((roleInfo) => {
                    const count = chartData.users.filter(user => user.role === roleInfo.role).length;
                    const total = chartData.users.length || 1;
                    const percentage = (count / total) * 100;

                    return (
                      <div key={roleInfo.role} className="flex items-center space-x-3">
                        <div className="w-20 text-sm text-[#555879]">{roleInfo.label}</div>
                        <div className="flex-1 bg-[#F4EBD3] rounded-full h-4">
                          <div
                            className="h-4 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%`, backgroundColor: roleInfo.color }}
                          ></div>
                        </div>
                        <div className="w-8 text-sm text-[#555879] text-right">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Growth Trend Chart */}
            <div className="bg-[#DED3C4] rounded-lg shadow-sm border-2 border-[#98A1BC]/30 p-6 mb-8">
              <h3 className="text-lg font-semibold text-[#555879] mb-4">Évolution Mensuelle</h3>
              <div className="grid grid-cols-6 gap-4">
                {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'].map((month, index) => {
                  const baseValue = 5 + index * 2;
                  const height = Math.min(baseValue * 8, 120); // Max height 120px

                  return (
                    <div key={month} className="flex flex-col items-center space-y-2">
                      <div className="text-xs text-[#98A1BC]">{month}</div>
                      <div className="w-8 bg-[#555879] rounded-t transition-all duration-500" style={{ height: `${height}px` }}></div>
                      <div className="text-xs text-[#555879]">{baseValue}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#DED3C4] rounded-lg shadow-sm border-2 border-[#98A1BC]/30 p-6">
              <h3 className="text-lg font-semibold text-[#555879] mb-4">Actions Rapides</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate('/add-company')}
                  className="bg-[#555879] hover:bg-[#555879]/90 text-[#F4EBD3] font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Nouvelle Entreprise</span>
                </button>
                <button
                  onClick={() => navigate('/companies')}
                  className="bg-[#98A1BC] hover:bg-[#98A1BC]/90 text-[#F4EBD3] font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Gérer Entreprises</span>
                </button>
                <button
                  onClick={() => navigate('/users')}
                  className="bg-[#555879] hover:bg-[#555879]/90 text-[#F4EBD3] font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span>Gérer Utilisateurs</span>
                </button>
                <button
                  onClick={() => navigate('/employees')}
                  className="bg-[#98A1BC] hover:bg-[#98A1BC]/90 text-[#F4EBD3] font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Gérer Employés</span>
                </button>
                <button
                  onClick={() => navigate('/add-user')}
                  className="bg-[#555879] hover:bg-[#555879]/90 text-[#F4EBD3] font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Ajouter Utilisateur</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;