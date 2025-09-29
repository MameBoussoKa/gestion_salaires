import { Router } from 'express';
import { BulletinController } from '../controllers/BulletinController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { bulletinSchema } from '../utiles/validators/bulletinValidator.js';

const router = Router();
const bulletinController = new BulletinController();

// GET /bulletins - Liste des bulletins
router.get('/', bulletinController.getAllBulletins.bind(bulletinController));

// GET /bulletins/:id - Bulletin par ID
router.get('/:id', bulletinController.getBulletinById.bind(bulletinController));

// POST /bulletins - Création de bulletin
router.post('/', validateSchema(bulletinSchema), bulletinController.createBulletin.bind(bulletinController));

// PUT /bulletins/:id - Modification de bulletin
router.put('/:id', validateSchema(bulletinSchema), bulletinController.updateBulletin.bind(bulletinController));

// DELETE /bulletins/:id - Suppression de bulletin
router.delete('/:id', bulletinController.deleteBulletin.bind(bulletinController));

// PATCH /bulletins/:id/statut - Mise à jour du statut du bulletin
router.patch('/:id/statut', bulletinController.updateStatut.bind(bulletinController));

export default router;
