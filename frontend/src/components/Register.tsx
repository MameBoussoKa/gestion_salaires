import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Company {
  id: number;
  nom: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    nomcomplet: '',
    email: '',
    password: '',
    role: 'admin',
    entrepriseId: '3' // ID de l'entreprise de test
  });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
      console.error('Erreur chargement entreprises:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Définir automatiquement l'entrepriseId pour admin/caissier
      ...(name === 'role' && (value === 'admin' || value === 'caissier') ? { entrepriseId: '3' } : {}),
      ...(name === 'role' && value === 'super-admin' ? { entrepriseId: '' } : {})
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        entrepriseId: formData.role === 'super-admin' ? null : parseInt(formData.entrepriseId)
      };

      const response = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'inscription');
      }

      const data = await response.json();
      setSuccess('Utilisateur créé avec succès !');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EBD3] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-[#555879] rounded-full flex items-center justify-center shadow-lg">
            <svg className="h-8 w-8 text-[#F4EBD3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#555879]">
            Créer un compte
          </h2>
          <p className="mt-2 text-center text-sm text-[#98A1BC]">
            Rejoignez la plateforme de gestion des salaires
          </p>
        </div>
        <form className="mt-8 space-y-6 bg-[#DED3C4] p-8 rounded-2xl shadow-xl border-2 border-[#98A1BC]/30" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="nomcomplet" className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <input
                  id="nomcomplet"
                  name="nomcomplet"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-2 border-[#98A1BC]/30 placeholder-[#98A1BC] text-[#555879] bg-[#F4EBD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#555879] focus:border-[#555879] transition-all duration-200 ease-in-out"
                  placeholder="Votre nom complet"
                  value={formData.nomcomplet}
                  onChange={handleChange}
                />
                <svg className="absolute right-3 top-3.5 h-5 w-5 text-[#98A1BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-2 border-[#98A1BC]/30 placeholder-[#98A1BC] text-[#555879] bg-[#F4EBD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#555879] focus:border-[#555879] transition-all duration-200 ease-in-out"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <svg className="absolute right-3 top-3.5 h-5 w-5 text-[#98A1BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-2 border-[#98A1BC]/30 placeholder-[#98A1BC] text-[#555879] bg-[#F4EBD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#555879] focus:border-[#555879] transition-all duration-200 ease-in-out"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <svg className="absolute right-3 top-3.5 h-5 w-5 text-[#98A1BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Rôle
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-2 border-[#98A1BC]/30 placeholder-[#98A1BC] text-[#555879] bg-[#F4EBD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#555879] focus:border-[#555879] transition-all duration-200 ease-in-out"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="super-admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="caissier">Caissier</option>
                </select>
                <svg className="absolute right-3 top-3.5 h-5 w-5 text-[#98A1BC] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {formData.role !== 'super-admin' && (
              <div>
                <label htmlFor="entrepriseId" className="block text-sm font-medium text-gray-700 mb-2">
                  Entreprise
                </label>
                <div className="relative">
                  <select
                    id="entrepriseId"
                    name="entrepriseId"
                    required
                    className="appearance-none relative block w-full px-4 py-3 border-2 border-[#98A1BC]/30 placeholder-[#98A1BC] text-[#555879] bg-[#F4EBD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#555879] focus:border-[#555879] transition-all duration-200 ease-in-out"
                    value={formData.entrepriseId}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner une entreprise</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.nom}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-3.5 h-5 w-5 text-[#98A1BC] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm text-center">
              {success}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-[#F4EBD3] bg-[#555879] hover:bg-[#555879]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#555879] transform transition-all duration-200 ease-in-out hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              S'inscrire
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[#555879] hover:text-[#98A1BC] font-medium transition-colors duration-200"
            >
              Déjà un compte ? Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;