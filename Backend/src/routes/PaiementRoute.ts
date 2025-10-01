import { Router } from 'express';
import { PaiementController } from '../controllers/PaiementController.js';

const router = Router();
const paiementController = new PaiementController();

// GET /paiements - Liste des paiements
router.get('/', paiementController.getAllPaiements.bind(paiementController));

// GET /paiements/:id - Paiement par ID
router.get('/:id', paiementController.getPaiementById.bind(paiementController));

// POST /paiements - Création de paiement
router.post('/', paiementController.createPaiement.bind(paiementController));

// PUT /paiements/:id - Modification de paiement
router.put('/:id', paiementController.updatePaiement.bind(paiementController));

// DELETE /paiements/:id - Suppression de paiement
router.delete('/:id', paiementController.deletePaiement.bind(paiementController));

export default router;