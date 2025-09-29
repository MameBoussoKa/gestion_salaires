import { Router } from 'express';
import { EntrepriseController } from '../controllers/EntrepriseController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { entrepriseSchema } from '../utiles/validators/entrepriseValidator.js';

const router = Router();
const entrepriseController = new EntrepriseController();

// GET /entreprises - Liste des entreprises
router.get('/', entrepriseController.getAllEntreprises.bind(entrepriseController));

// GET /entreprises/:id - Entreprise par ID
router.get('/:id', entrepriseController.getEntrepriseById.bind(entrepriseController));

// POST /entreprises - Création d'entreprise
router.post('/', validateSchema(entrepriseSchema), entrepriseController.createEntreprise.bind(entrepriseController));

// PUT /entreprises/:id - Modification d'entreprise
router.put('/:id', validateSchema(entrepriseSchema), entrepriseController.updateEntreprise.bind(entrepriseController));

// DELETE /entreprises/:id - Suppression d'entreprise
router.delete('/:id', entrepriseController.deleteEntreprise.bind(entrepriseController));

export default router;
