import { Router } from 'express';
import { CyclePaieController } from '../controllers/CyclePaieController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { cyclePaieSchema } from '../utiles/validators/cyclePaieValidator.js';

const router = Router();
const cyclePaieController = new CyclePaieController();

// GET /cycles-paie - Liste des cycles de paie
router.get('/', cyclePaieController.getAllCyclesPaie.bind(cyclePaieController));

// GET /cycles-paie/:id - Cycle de paie par ID
router.get('/:id', cyclePaieController.getCyclePaieById.bind(cyclePaieController));

// POST /cycles-paie - Création de cycle de paie
router.post('/', validateSchema(cyclePaieSchema), cyclePaieController.createCyclePaie.bind(cyclePaieController));

// PUT /cycles-paie/:id - Modification de cycle de paie
router.put('/:id', validateSchema(cyclePaieSchema), cyclePaieController.updateCyclePaie.bind(cyclePaieController));

// DELETE /cycles-paie/:id - Suppression de cycle de paie
router.delete('/:id', cyclePaieController.deleteCyclePaie.bind(cyclePaieController));

export default router;
