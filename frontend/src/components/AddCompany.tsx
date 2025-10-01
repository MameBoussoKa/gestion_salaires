import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCompany: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    logo: '',
    adresse: '',
    devise: 'XOF',
    periode: 'mensuelle',
    couleur: '#555879'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/api/v1/entreprises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création de l\'entreprise');
      }

      const data = await response.json();
      setSuccess('Entreprise créée avec succès !');
      setTimeout(() => navigate('/companies'), 2000);
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
          <h1 className="text-3xl font-bold text-[#555879]">Ajouter une entreprise</h1>
          <button
            onClick={() => navigate('/dashboard')}
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
                <label htmlFor="nom" className="block text-sm font-medium text-[#555879]">
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  required
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.nom}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-[#555879]">
                  Logo (URL)
                </label>
                <input
                  type="url"
                  name="logo"
                  id="logo"
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.logo}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="adresse" className="block text-sm font-medium text-[#555879]">
                  Adresse
                </label>
                <input
                  type="text"
                  name="adresse"
                  id="adresse"
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.adresse}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="devise" className="block text-sm font-medium text-[#555879]">
                  Devise
                </label>
                <select
                  name="devise"
                  id="devise"
                  required
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.devise}
                  onChange={handleChange}
                >
                  <option value="XOF">XOF (Franc CFA)</option>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="USD">USD (Dollar)</option>
                </select>
              </div>

              <div>
                <label htmlFor="periode" className="block text-sm font-medium text-[#555879]">
                  Période de paie
                </label>
                <select
                  name="periode"
                  id="periode"
                  required
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.periode}
                  onChange={handleChange}
                >
                  <option value="mensuelle">Mensuelle</option>
                  <option value="hebdo">Hebdomadaire</option>
                  <option value="journalière">Journalière</option>
                </select>
              </div>

              <div>
                <label htmlFor="couleur" className="block text-sm font-medium text-[#555879]">
                  Couleur thème
                </label>
                <div className="mt-1 flex items-center space-x-3">
                  <input
                    type="color"
                    name="couleur"
                    id="couleur"
                    className="h-10 w-16 border-2 border-[#98A1BC]/30 rounded-md cursor-pointer"
                    value={formData.couleur}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    value={formData.couleur}
                    onChange={(e) => setFormData({...formData, couleur: e.target.value})}
                    className="flex-1 border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm px-3 py-2"
                    placeholder="#555879"
                  />
                </div>
                <p className="mt-1 text-xs text-[#98A1BC]">
                  Choisissez la couleur principale pour cette entreprise
                </p>
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              {success && (
                <div className="text-green-600 text-sm">{success}</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-[#F4EBD3] bg-[#555879] hover:bg-[#555879]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#555879] disabled:opacity-50 transform transition-all duration-200 ease-in-out hover:scale-[1.02]"
                >
                  {loading ? 'Création...' : 'Créer l\'entreprise'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddCompany;