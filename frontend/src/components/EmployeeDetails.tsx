import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

const EmployeeDetails: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (employeeId) {
      fetchEmployeeDetails();
    }
  }, [employeeId]);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/employes/${employeeId}`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des détails de l\'employé');
      }
      const data = await response.json();
      setEmployee(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4EBD3] flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-[#F4EBD3] flex items-center justify-center">
        <div className="text-[#555879]">Employé non trouvé</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EBD3]">
      <header className="bg-[#DED3C4] shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#555879]">Détails de l'employé</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate(`/edit-employee/${employee.id}`)}
              className="bg-[#98A1BC] hover:bg-[#98A1BC]/90 text-[#F4EBD3] font-bold py-2 px-4 rounded"
            >
              Modifier
            </button>
            <button
              onClick={() => navigate('/employees')}
              className="bg-[#555879] hover:bg-[#555879]/90 text-[#F4EBD3] font-bold py-2 px-4 rounded"
            >
              Retour à la liste
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-[#DED3C4] shadow-xl overflow-hidden sm:rounded-2xl border-2 border-[#98A1BC]/30">
            <div className="px-6 py-6 sm:px-8">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 h-16 w-16">
                  <div className="h-16 w-16 rounded-full bg-[#F4EBD3] flex items-center justify-center border-2 border-[#98A1BC]/30">
                    <span className="text-lg font-medium text-[#555879]">
                      {employee.nomComplet.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-[#555879]">{employee.nomComplet}</h2>
                  <p className="text-[#98A1BC]">{employee.poste}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#555879] mb-4">Informations générales</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-[#98A1BC]">Nom complet</dt>
                      <dd className="text-sm text-[#555879]">{employee.nomComplet}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[#98A1BC]">Poste</dt>
                      <dd className="text-sm text-[#555879]">{employee.poste}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[#98A1BC]">Type de contrat</dt>
                      <dd className="text-sm text-[#555879]">{employee.typeContrat}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[#98A1BC]">Salaire</dt>
                      <dd className="text-sm text-[#555879]">
                        {employee.tauxSalaire.toLocaleString()} {employee.entrepriseId === 3 ? 'XOF' : 'devise'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[#98A1BC]">Statut</dt>
                      <dd className="text-sm text-[#555879]">
                        {employee.actif ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#98A1BC] text-[#F4EBD3]">
                            Actif
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#DED3C4] text-[#555879] border border-[#98A1BC]/30">
                            Inactif
                          </span>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[#98A1BC]">Date d'embauche</dt>
                      <dd className="text-sm text-[#555879]">
                        {new Date(employee.createdAt).toLocaleDateString('fr-FR')}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#555879] mb-4">Informations bancaires</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-[#98A1BC]">Coordonnées bancaires</dt>
                      <dd className="text-sm text-[#555879]">
                        {employee.coordonneesBancaires || 'Non spécifiées'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDetails;