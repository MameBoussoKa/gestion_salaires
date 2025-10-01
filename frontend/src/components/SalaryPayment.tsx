import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: number;
  nomComplet: string;
  poste: string;
  tauxSalaire: number;
  entrepriseId: number;
}

const SalaryPayment: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [montant, setMontant] = useState('');
  const [mode, setMode] = useState('espèces');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/employes');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des employés');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !montant) {
      setError('Veuillez sélectionner un employé et saisir un montant');
      return;
    }

    setLoading(true);
    try {
      // Create bulletin first
      const bulletinResponse = await fetch('http://localhost:3000/api/v1/bulletins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeId: selectedEmployee.id,
          cyclePaieId: 1, // Assuming a default cycle exists
          brut: parseFloat(montant),
          deductions: 0,
          netAPayer: parseFloat(montant),
          statut: 'en attente',
        }),
      });

      if (!bulletinResponse.ok) {
        throw new Error('Erreur lors de la création du bulletin');
      }

      const bulletin = await bulletinResponse.json();

      // Create payment
      const paymentResponse = await fetch('http://localhost:3000/api/v1/paiements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          montant: parseFloat(montant),
          mode,
          bulletinId: bulletin.id,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Erreur lors du paiement');
      }

      setError('');
      alert('Paiement effectué avec succès');
      setSelectedEmployee(null);
      setMontant('');
      setMode('espèces');
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
          <h1 className="text-3xl font-bold text-[#555879]">Paiement de salaire</h1>
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
          <div className="bg-[#DED3C4] shadow-xl overflow-hidden sm:rounded-2xl border-2 border-[#98A1BC]/30">
            <div className="px-6 py-6 sm:px-8">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handlePayment}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#555879] mb-2">
                    Sélectionner un employé
                  </label>
                  <select
                    value={selectedEmployee?.id || ''}
                    onChange={(e) => {
                      const emp = employees.find(emp => emp.id === parseInt(e.target.value));
                      setSelectedEmployee(emp || null);
                    }}
                    className="w-full px-3 py-2 border border-[#98A1BC]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#98A1BC] bg-[#F4EBD3] text-[#555879]"
                    required
                  >
                    <option value="">Choisir un employé</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.nomComplet} - {employee.poste}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#555879] mb-2">
                    Montant
                  </label>
                  <input
                    type="number"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    className="w-full px-3 py-2 border border-[#98A1BC]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#98A1BC] bg-[#F4EBD3] text-[#555879]"
                    placeholder="Montant du paiement"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#555879] mb-2">
                    Mode de paiement
                  </label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full px-3 py-2 border border-[#98A1BC]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#98A1BC] bg-[#F4EBD3] text-[#555879]"
                  >
                    <option value="espèces">Espèces</option>
                    <option value="virement">Virement</option>
                    <option value="Orange Money">Orange Money</option>
                    <option value="Wave">Wave</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#98A1BC] hover:bg-[#98A1BC]/90 text-[#F4EBD3] font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                  {loading ? 'Traitement...' : 'Effectuer le paiement'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalaryPayment;