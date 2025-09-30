import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EBD3] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-[#555879] rounded-full flex items-center justify-center shadow-lg">
            <svg className="h-8 w-8 text-[#F4EBD3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#555879]">
            Connexion à votre compte
          </h2>
          <p className="mt-2 text-center text-sm text-[#98A1BC]">
            Gestion des Salaires - Système de paie
          </p>
        </div>
        <form className="mt-8 space-y-6 bg-[#DED3C4] p-8 rounded-2xl shadow-xl border-2 border-[#98A1BC]/30" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <svg className="absolute right-3 top-3.5 h-5 w-5 text-[#98A1BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-[#F4EBD3] bg-[#555879] hover:bg-[#555879]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#555879] transform transition-all duration-200 ease-in-out hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Se connecter
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-[#555879] hover:text-[#98A1BC] font-medium transition-colors duration-200"
            >
              Pas de compte ? S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;