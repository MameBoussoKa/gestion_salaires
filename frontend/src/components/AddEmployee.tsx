import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Company {
  id: number;
  nom: string;
}

const AddEmployee: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [formData, setFormData] = useState({
    nomComplet: '',
    poste: '',
    typeContrat: 'fixe',
    tauxSalaire: '',
    coordonneesBancaires: '',
    entrepriseId: companyId || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!companyId) {
      fetchCompanies();
    }
  }, [companyId]);

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
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validation côté client
      if (!formData.nomComplet.trim() || formData.nomComplet.length < 2) {
        throw new Error('Le nom complet doit contenir au moins 2 caractères');
      }
      if (!formData.poste.trim() || formData.poste.length < 2) {
        throw new Error('Le poste doit contenir au moins 2 caractères');
      }
      if (!formData.tauxSalaire || parseFloat(formData.tauxSalaire) <= 0) {
        throw new Error('Le taux de salaire doit être un nombre positif');
      }
      if (!formData.entrepriseId) {
        throw new Error('Veuillez sélectionner une entreprise');
      }

      const dataToSend: any = {
        nomComplet: formData.nomComplet.trim(),
        poste: formData.poste.trim(),
        typeContrat: formData.typeContrat,
        tauxSalaire: parseFloat(formData.tauxSalaire),
        entrepriseId: parseInt(formData.entrepriseId)
      };

      // Only include coordonneesBancaires if it's not empty
      if (formData.coordonneesBancaires.trim()) {
        dataToSend.coordonneesBancaires = formData.coordonneesBancaires.trim();
      }

      console.log('Données envoyées:', dataToSend); // Debug

      const response = await fetch('http://localhost:3000/api/v1/employes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur API:', errorData); // Debug
        throw new Error(errorData.error || 'Erreur lors de la création de l\'employé');
      }

      const data = await response.json();
      setSuccess('Employé créé avec succès !');
      setTimeout(() => navigate('/employees'), 2000);
    } catch (err: any) {
      console.error('Erreur:', err); // Debug
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EBD3]">
      <header className="bg-[#DED3C4] shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#555879]">Ajouter un employé</h1>
          <button
            onClick={() => navigate('/employees')}
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
                <label htmlFor="nomComplet" className="block text-sm font-medium text-[#555879]">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="nomComplet"
                  id="nomComplet"
                  required
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.nomComplet}
                  onChange={handleChange}
                  placeholder="Nom complet de l'employé"
                />
              </div>

              <div>
                <label htmlFor="poste" className="block text-sm font-medium text-[#555879]">
                  Poste
                </label>
                <input
                  type="text"
                  name="poste"
                  id="poste"
                  required
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.poste}
                  onChange={handleChange}
                  placeholder="Ex: Développeur, Comptable, etc."
                />
              </div>

              <div>
                <label htmlFor="typeContrat" className="block text-sm font-medium text-[#555879]">
                  Type de contrat
                </label>
                <select
                  name="typeContrat"
                  id="typeContrat"
                  required
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.typeContrat}
                  onChange={handleChange}
                >
                  <option value="fixe">Contrat fixe</option>
                  <option value="journalier">Journalier</option>
                  <option value="honoraire">Honoraire</option>
                </select>
              </div>

              <div>
                <label htmlFor="tauxSalaire" className="block text-sm font-medium text-[#555879]">
                  Taux de salaire (XOF)
                </label>
                <input
                  type="number"
                  name="tauxSalaire"
                  id="tauxSalaire"
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.tauxSalaire}
                  onChange={handleChange}
                  placeholder="Ex: 50000"
                />
              </div>

              <div>
                <label htmlFor="coordonneesBancaires" className="block text-sm font-medium text-[#555879]">
                  Coordonnées bancaires (optionnel)
                </label>
                <input
                  type="text"
                  name="coordonneesBancaires"
                  id="coordonneesBancaires"
                  className="mt-1 block w-full border-2 border-[#98A1BC]/30 rounded-md shadow-sm focus:ring-2 focus:ring-[#555879] focus:border-[#555879] bg-[#F4EBD3] text-[#555879] sm:text-sm"
                  value={formData.coordonneesBancaires}
                  onChange={handleChange}
                  placeholder="IBAN, numéro de compte, etc."
                />
              </div>

              {!companyId && (
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
                  {loading ? 'Création...' : 'Créer l\'employé'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddEmployee;