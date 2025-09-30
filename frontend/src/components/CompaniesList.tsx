import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Company {
  id: number;
  nom: string;
  logo?: string;
  adresse?: string;
  devise: string;
  periode: string;
  createdAt: string;
}

const CompaniesList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/entreprises');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des entreprises');
      }
      const data = await response.json();
      setCompanies(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyClick = (companyId: number) => {
    // Redirect to admin dashboard for this company
    navigate('/dashboard');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

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
              Liste des entreprises
            </h1>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-[#FFFFF0] text-[#344F1F] font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 ease-in-out hover:scale-105"
          >
            Retour
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-6 shadow-sm">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white overflow-hidden shadow-xl rounded-2xl cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl border-2 border-[#344F1F]/20"
                onClick={() => handleCompanyClick(company.id)}
              >
                <div className="bg-[#344F1F] p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#FFFFF0]">{company.nom}</h3>
                    <svg className="h-6 w-6 text-[#FFFFF0] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-[#344F1F]/70">
                      <svg className="h-5 w-5 mr-3 text-[#344F1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="text-sm font-medium">Devise: <span className="text-[#344F1F] font-semibold">{company.devise}</span></span>
                    </div>
                    <div className="flex items-center text-[#344F1F]/70">
                      <svg className="h-5 w-5 mr-3 text-[#344F1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">Période: <span className="text-[#344F1F] font-semibold">{company.periode}</span></span>
                    </div>
                    {company.adresse && (
                      <div className="flex items-center text-[#344F1F]/70">
                        <svg className="h-5 w-5 mr-3 text-[#344F1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm font-medium">{company.adresse}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {companies.length === 0 && (
            <div className="text-center py-16">
              <div className="mx-auto h-24 w-24 bg-[#344F1F] rounded-full flex items-center justify-center mb-4">
                <svg className="h-12 w-12 text-[#FFFFF0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#344F1F] mb-2">Aucune entreprise trouvée</h3>
              <p className="text-[#344F1F]/70">Les entreprises apparaîtront ici une fois créées.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CompaniesList;