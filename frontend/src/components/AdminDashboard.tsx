import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="bg-[#344F1F] shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-[#FFFFF0] rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-[#344F1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#FFFFF0]">
              Admin Dashboard
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
                    {user?.role === 'admin' ? 'Administrateur' : user?.role === 'caissier' ? 'Caissier' : user?.role}
                  </span>
                  Gestion de votre entreprise
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div
                onClick={() => navigate('/employees')}
                className="bg-[#344F1F] rounded-xl p-6 text-[#FFFFF0] cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Gérer les employés</h3>
                    <p className="text-[#FFFFF0]/80 text-sm">Voir et gérer les employés de l'entreprise</p>
                  </div>
                  <svg className="h-8 w-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>

              <div
                onClick={() => navigate('/add-user')}
                className="bg-[#344F1F] rounded-xl p-6 text-[#FFFFF0] cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ajouter utilisateur</h3>
                    <p className="text-[#FFFFF0]/80 text-sm">Créer un nouveau compte utilisateur</p>
                  </div>
                  <svg className="h-8 w-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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

export default AdminDashboard;