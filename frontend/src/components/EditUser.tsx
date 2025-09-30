import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Company {
  id: number;
  nom: string;
}

const EditUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [formData, setFormData] = useState({
    nomcomplet: '',
    email: '',
    role: 'admin',
    entrepriseId: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
    if (userId) {
      fetchUser();
    }
  }, [userId]);

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

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement de l\'utilisateur');
      }
      const user = await response.json();
      setFormData({
        nomcomplet: user.nomcomplet || '',
        email: user.email || '',
        role: user.role || 'admin',
        entrepriseId: user.entrepriseId ? user.entrepriseId.toString() : ''
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Reset entrepriseId if role is super-admin
      ...(name === 'role' && value === 'super-admin' ? { entrepriseId: '' } : {})
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validation
      if (!formData.nomcomplet.trim() || formData.nomcomplet.length < 5) {
        throw new Error('Le nom complet doit contenir au moins 5 caractères');
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        throw new Error('Veuillez entrer un email valide');
      }
      if (formData.role !== 'super-admin' && !formData.entrepriseId) {
        throw new Error('Veuillez sélectionner une entreprise pour ce rôle');
      }

      const dataToSend: any = {
        nomcomplet: formData.nomcomplet.trim(),
        email: formData.email.trim(),
        role: formData.role
      };

      if (formData.role !== 'super-admin' && formData.entrepriseId) {
        dataToSend.entrepriseId = parseInt(formData.entrepriseId);
      }

      const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la modification de l\'utilisateur');
      }

      const data = await response.json();
      setSuccess('Utilisateur modifié avec succès !');
      setTimeout(() => navigate('/users'), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EBD3]">
      <header className="bg-[#DED3C4] shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#555879]">Modifier l'utilisateur</h1>
          <button
            onClick={() => navigate('/users')}
            className="bg-[#555879] hover:bg-[#555879]/90 text-[#F4EBD3] font-bold py-2 px-4 rounded"
          >
            Retour
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6 bg-[#DED3C4] p-8 rounded-2xl shadow-xl border-2 border-[#98A1BC]/30">
              <div>
                <label htmlFor="nomcomplet" className="block text-sm font-medium text-[#555879]">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="nomcomplet"
                  id="nomcomplet"
                  required
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.nomcomplet}
                  onChange={handleChange}
                  placeholder="Nom complet de l'utilisateur"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#555879]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-[#555879]">
                  Rôle
                </label>
                <select
                  name="role"
                  id="role"
                  required
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="super-admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="caissier">Caissier</option>
                </select>
              </div>

              {formData.role !== 'super-admin' && (
                <div>
                  <label htmlFor="entrepriseId" className="block text-sm font-medium text-[#555879]">
                    Entreprise
                  </label>
                  <select
                    name="entrepriseId"
                    id="entrepriseId"
                    required
                    className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
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
                </div>
              )}

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
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-[#F4EBD3] bg-[#555879] hover:bg-[#555879]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#555879] disabled:opacity-50 transform transition-all duration-200 ease-in-out hover:scale-[1.02]"
                >
                  {loading ? 'Modification...' : 'Modifier l\'utilisateur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditUser;