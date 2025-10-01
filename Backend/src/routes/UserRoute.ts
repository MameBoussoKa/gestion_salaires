import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { utilisateurSchema, utilisateurUpdateSchema } from '../utiles/validators/utilisateurValidator.js';

const router = Router();
const userController = new UserController();
const authMiddleware = new AuthMiddleware();

// GET /users/me - Profil utilisateur connecté (authentifié)
router.get('/me', authMiddleware.verifyToken.bind(authMiddleware), userController.getMe.bind(userController));

// GET /users - Liste des utilisateurs (admin)
router.get('/', userController.getAllUsers.bind(userController));

// GET /users/:id - Utilisateur par ID (admin)
router.get('/:id', userController.getUserById.bind(userController));

// POST /users - Création d'utilisateur (admin)
router.post('/', validateSchema(utilisateurSchema), userController.createUser.bind(userController));

// PUT /users/:id - Modification d'utilisateur (admin)
router.put('/:id', userController.updateUser.bind(userController));

// DELETE /users/:id - Suppression d'utilisateur (admin)
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;
