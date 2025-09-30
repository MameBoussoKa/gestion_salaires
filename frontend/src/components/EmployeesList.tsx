import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: number;
  nomComplet: string;
  poste: string;
  typeContrat: string;
  tauxSalaire: number;
  coordonneesBancaires?: string;
  actif: boolean;
  entrepriseId: number;
  createdAt: string;
}

const EmployeesList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (employeeId: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/employes/${employeeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'employé');
      }

      // Refresh the list
      fetchEmployees();
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F4EBD3]">
      <header className="bg-[#DED3C4] shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#555879]">Liste des employés</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/add-employee')}
              className="bg-[#98A1BC] hover:bg-[#98A1BC]/90 text-[#F4EBD3] font-bold py-2 px-4 rounded"
            >
              Ajouter employé
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-[#555879] hover:bg-[#555879]/90 text-[#F4EBD3] font-bold py-2 px-4 rounded"
            >
              Retour
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <div className="bg-[#DED3C4] shadow-xl overflow-hidden sm:rounded-2xl border-2 border-[#98A1BC]/30">
            <ul className="divide-y divide-[#98A1BC]/30">
              {employees.map((employee) => (
                <li key={employee.id}>
                  <div className="px-6 py-4 sm:px-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 rounded-full bg-[#F4EBD3] flex items-center justify-center border-2 border-[#98A1BC]/30">
                            <span className="text-sm font-medium text-[#555879]">
                              {employee.nomComplet.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-[#555879]">{employee.nomComplet}</div>
                          <div className="text-sm text-[#98A1BC]">{employee.poste}</div>
                          <div className="text-sm text-[#98A1BC]">Contrat: {employee.typeContrat}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-[#555879]">
                            {employee.tauxSalaire.toLocaleString()} {employee.entrepriseId === 3 ? 'XOF' : 'devise'}
                          </div>
                          <div className="text-sm text-[#98A1BC]">
                            {employee.actif ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#98A1BC] text-[#F4EBD3]">
                                Actif
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#DED3C4] text-[#555879] border border-[#98A1BC]/30">
                                Inactif
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/edit-employee/${employee.id}`);
                            }}
                            className="bg-[#98A1BC] hover:bg-[#98A1BC]/90 text-[#F4EBD3] p-2 rounded-lg transition-colors duration-200"
                            title="Modifier l'employé"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEmployee(employee.id);
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
                            title="Supprimer l'employé"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {employees.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#98A1BC]">Aucun employé trouvé.</p>
              <p className="text-sm text-[#98A1BC]/70 mt-2">Vous pouvez ajouter des employés via l'interface d'administration.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployeesList;