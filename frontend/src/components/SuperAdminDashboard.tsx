import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SuperAdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="bg-[#344F1F] shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-[#FFFFF0] rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-[#344F1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#FFFFF0]">
              Super Admin Dashboard
            </h1>
          </div>
          <button
            onClick={logout}
            className="bg-[#FFFFF0] text-[#344F1F] font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 ease-in-out hover:scale-105"
          >
            Déconnexion
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#344F1F]/20 p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 bg-[#344F1F] rounded-full flex items-center justify-center shadow-lg">
                <svg className="h-8 w-8 text-[#FFFFF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#344F1F]">Bienvenue, {user?.email}!</h2>
                <p className="text-[#344F1F]/70 flex items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#344F1F]/10 text-[#344F1F] mr-2">
                    {user?.role === 'super-admin' ? 'Super Administrateur' : user?.role}
                  </span>
                  Accès complet au système
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div
                onClick={() => navigate('/companies')}
                className="bg-[#344F1F] rounded-xl p-6 text-[#FFFFF0] cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Gérer les entreprises</h3>
                    <p className="text-[#FFFFF0]/80 text-sm">Voir et gérer toutes les entreprises</p>
                  </div>
                  <svg className="h-8 w-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>

              <div
                onClick={() => navigate('/add-company')}
                className="bg-[#344F1F] rounded-xl p-6 text-[#FFFFF0] cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ajouter entreprise</h3>
                    <p className="text-[#FFFFF0]/80 text-sm">Créer une nouvelle entreprise</p>
                  </div>
                  <svg className="h-8 w-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>

              <div
                onClick={() => navigate('/users')}
                className="bg-[#344F1F] rounded-xl p-6 text-[#FFFFF0] cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Gérer utilisateurs</h3>
                    <p className="text-[#FFFFF0]/80 text-sm">Administrer tous les comptes</p>
                  </div>
                  <svg className="h-8 w-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;