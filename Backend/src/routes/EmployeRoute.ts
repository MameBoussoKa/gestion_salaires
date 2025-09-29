import { Router } from 'express';
import { EmployeController } from '../controllers/EmployeController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { employeSchema } from '../utiles/validators/employeValidator.js';

const router = Router();
const employeController = new EmployeController();

// GET /employes - Liste des employés
router.get('/', employeController.getAllEmployes.bind(employeController));

// GET /employes/:id - Employé par ID
router.get('/:id', employeController.getEmployeById.bind(employeController));

// POST /employes - Création d'employé
router.post('/', validateSchema(employeSchema), employeController.createEmploye.bind(employeController));

// PUT /employes/:id - Modification d'employé
router.put('/:id', validateSchema(employeSchema), employeController.updateEmploye.bind(employeController));

// DELETE /employes/:id - Suppression d'employé
router.delete('/:id', employeController.deleteEmploye.bind(employeController));

export default router;
