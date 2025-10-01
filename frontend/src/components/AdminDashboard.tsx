import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Company {
  id: number;
  nom: string;
  logo?: string;
  adresse?: string;
  devise: string;
  periode: string;
  couleur?: string;
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [userCompany, setUserCompany] = useState<Company | null>(null);
  const [stats, setStats] = useState([
    { title: 'Employés', value: '0', change: '+0%', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { title: 'Revenus', value: '€0', change: '+0%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
  ]);
  const [employeesData, setEmployeesData] = useState<any[]>([]);

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z' },
    { id: 'employees', label: 'Employés', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'add-employee', label: 'Ajouter Employé', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6', params: userCompany?.id ? `/${userCompany.id}` : '' },
  ];

  useEffect(() => {
    fetchUserCompany();
  }, []);

  useEffect(() => {
    if (userCompany) {
      fetchStats();
      // Update menu items with company ID
      menuItems[2].params = `/${userCompany.id}`;
    }
  }, [userCompany]);

  const fetchUserCompany = async () => {
    try {
      // Get user details to find their company
      const userResponse = await fetch(`http://localhost:3000/api/v1/users/me`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        if (userData.entrepriseId) {
          const companyResponse = await fetch(`http://localhost:3000/api/v1/entreprises/${userData.entrepriseId}`);
          if (companyResponse.ok) {
            const company = await companyResponse.json();
            setUserCompany(company);
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'entreprise:', error);
    }
  };

  const fetchStats = async () => {
    if (!userCompany) return;

    try {
      // Fetch employees for this company
      const employeesResponse = await fetch(`http://localhost:3000/api/v1/employes?entrepriseId=${userCompany.id}`);
      const employees = employeesResponse.ok ? await employeesResponse.json() : [];

      setEmployeesData(employees);

      // Calculate total salary
      const totalSalary = employees.reduce((sum: number, emp: any) => sum + (emp.tauxSalaire || 0), 0);

      setStats([
        {
          title: 'Employés',
          value: employees.length.toString(),
          change: '+0%',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        },
        {
          title: 'Masse Salariale',
          value: `${totalSalary.toLocaleString()} ${userCompany.devise}`,
          change: '+0%',
          icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
        },
      ]);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  const handleMenuClick = (menuId: string, params?: string) => {
    setActiveMenu(menuId);
    if (menuId !== 'dashboard') {
      navigate(`/${menuId}${params || ''}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const primaryColor = userCompany?.couleur || '#555879';

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#F4EBD3' }}>
      {/* Sidebar */}
      <div className="w-64 shadow-lg" style={{ backgroundColor: '#DED3C4' }}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16" style={{ backgroundColor: primaryColor }}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#F4EBD3] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-[#F4EBD3] font-bold text-lg">
              {userCompany?.nom || 'Admin'}
            </span>
          </div>
        </div>

        {/* Menu */}
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.params)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeMenu === item.id
                    ? 'bg-[#F4EBD3] border-r-4'
                    : 'hover:bg-[#F4EBD3]'
                }`}
                style={{
                  color: '#555879',
                  borderRightColor: primaryColor
                }}
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
        <div className="absolute bottom-8 left-4 ">
          <button
            onClick={handleLogout}
            className="w-auto mx-auto font-medium py-1.5 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1.5 text-xs"
            style={{
              backgroundColor: primaryColor,
              color: '#F4EBD3'
            }}
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
        <header className="shadow-sm border-b" style={{ backgroundColor: '#DED3C4', borderBottomColor: '#98A1BC' }}>
          <div className="flex items-center justify-between px-6 py-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 bg-[#F4EBD3] text-[#555879] placeholder-[#98A1BC]"
                  style={{
                    borderColor: '#98A1BC',
                    '--tw-ring-color': primaryColor
                  } as React.CSSProperties}
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-[#98A1BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                  <span className="text-[#F4EBD3] font-semibold text-sm">
                    {user?.email?.charAt(0) || 'A'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#555879]">
                    {user?.email}
                  </p>
                  <p className="text-xs text-[#98A1BC] capitalize">
                    Admin - {userCompany?.nom || 'Entreprise'}
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
              <h1 className="text-2xl font-bold mb-2" style={{ color: '#555879' }}>
                Bonjour, Admin {user?.email}!
              </h1>
              <p className="text-[#98A1BC]">
                Gérez les employés de {userCompany?.nom || 'votre entreprise'}.
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="rounded-lg shadow-sm border-2 p-6" style={{ backgroundColor: '#DED3C4', borderColor: '#98A1BC' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#98A1BC]">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1" style={{ color: '#555879' }}>{stat.value}</p>
                      <p className="text-sm mt-1" style={{ color: '#555879' }}>{stat.change} depuis le mois dernier</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F4EBD3' }}>
                      <svg className="w-6 h-6" style={{ color: '#555879' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Company Info */}
            {userCompany && (
              <div className="rounded-lg shadow-sm border-2 p-6 mb-8" style={{ backgroundColor: '#DED3C4', borderColor: '#98A1BC' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#555879' }}>
                  Informations de l'entreprise
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#98A1BC]">Nom</p>
                    <p className="text-lg font-semibold" style={{ color: '#555879' }}>{userCompany.nom}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#98A1BC]">Adresse</p>
                    <p className="text-lg font-semibold" style={{ color: '#555879' }}>{userCompany.adresse || 'Non spécifiée'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#98A1BC]">Devise</p>
                    <p className="text-lg font-semibold" style={{ color: '#555879' }}>{userCompany.devise}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#98A1BC]">Période de paie</p>
                    <p className="text-lg font-semibold" style={{ color: '#555879' }}>{userCompany.periode}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Salary Distribution Chart */}
              <div className="rounded-lg shadow-sm border-2 p-6" style={{ backgroundColor: '#DED3C4', borderColor: '#98A1BC' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#555879' }}>
                  Répartition des Salaires
                </h3>
                <div className="space-y-4">
                  {employeesData.map((employee, index) => {
                    const maxSalary = Math.max(...employeesData.map(emp => emp.tauxSalaire || 0)) || 1;
                    const percentage = ((employee.tauxSalaire || 0) / maxSalary) * 100;

                    return (
                      <div key={employee.id} className="flex items-center space-x-3">
                        <div className="w-20 text-sm" style={{ color: '#555879' }} title={employee.nomComplet}>
                          {employee.nomComplet.split(' ')[0]}
                        </div>
                        <div className="flex-1 bg-[#F4EBD3] rounded-full h-4">
                          <div
                            className="h-4 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%`, backgroundColor: primaryColor }}
                          ></div>
                        </div>
                        <div className="w-16 text-sm text-right" style={{ color: '#555879' }}>
                          {(employee.tauxSalaire || 0).toLocaleString()} {userCompany?.devise}
                        </div>
                      </div>
                    );
                  })}
                  {employeesData.length === 0 && (
                    <p className="text-center text-[#98A1BC] py-4">Aucun employé trouvé</p>
                  )}
                </div>
              </div>

              {/* Contract Types Distribution */}
              <div className="rounded-lg shadow-sm border-2 p-6" style={{ backgroundColor: '#DED3C4', borderColor: '#98A1BC' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#555879' }}>
                  Types de Contrats
                </h3>
                <div className="space-y-4">
                  {[
                    { type: 'journalier', label: 'Journalier', color: primaryColor },
                    { type: 'fixe', label: 'Fixe', color: '#98A1BC' },
                    { type: 'honoraire', label: 'Honoraire', color: '#DED3C4' }
                  ].map((contractType) => {
                    const count = employeesData.filter(emp => emp.typeContrat === contractType.type).length;
                    const total = employeesData.length || 1;
                    const percentage = (count / total) * 100;

                    return (
                      <div key={contractType.type} className="flex items-center space-x-3">
                        <div className="w-20 text-sm" style={{ color: '#555879' }}>{contractType.label}</div>
                        <div className="flex-1 bg-[#F4EBD3] rounded-full h-4">
                          <div
                            className="h-4 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%`, backgroundColor: contractType.color }}
                          ></div>
                        </div>
                        <div className="w-8 text-sm text-right" style={{ color: '#555879' }}>{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Monthly Growth Chart */}
            <div className="rounded-lg shadow-sm border-2 p-6 mb-8" style={{ backgroundColor: '#DED3C4', borderColor: '#98A1BC' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#555879' }}>
                Évolution Mensuelle des Employés
              </h3>
              <div className="grid grid-cols-6 gap-4">
                {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'].map((month, index) => {
                  const baseValue = Math.max(1, employeesData.length - index);
                  const height = Math.min(baseValue * 15, 120); // Max height 120px

                  return (
                    <div key={month} className="flex flex-col items-center space-y-2">
                      <div className="text-xs" style={{ color: '#98A1BC' }}>{month}</div>
                      <div className="w-8 rounded-t transition-all duration-500" style={{ height: `${height}px`, backgroundColor: primaryColor }}></div>
                      <div className="text-xs" style={{ color: '#555879' }}>{baseValue}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg shadow-sm border-2 p-6" style={{ backgroundColor: '#DED3C4', borderColor: '#98A1BC' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#555879' }}>Actions Rapides</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => userCompany && navigate(`/add-employee/${userCompany.id}`)}
                  className="font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  style={{
                    backgroundColor: primaryColor,
                    color: '#F4EBD3'
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Ajouter un employé</span>
                </button>
                <button
                  onClick={() => navigate('/employees')}
                  className="font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  style={{
                    backgroundColor: '#98A1BC',
                    color: '#F4EBD3'
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Gérer les employés</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;