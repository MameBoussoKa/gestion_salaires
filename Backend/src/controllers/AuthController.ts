import { Request, Response } from 'express';
import { AuthService } from '../service/AuthService.js';

export class AuthController {
    private authService: AuthService = new AuthService();

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { nomcomplet, email, password, role, entrepriseId } = req.body;
            const { user, token } = await this.authService.register(nomcomplet, email, password, role, entrepriseId);
            res.status(201).json({
                message: 'Utilisateur créé avec succès',
                user: { id: user.id, email: user.email, role: user.role },
                token
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message || 'Erreur lors de l\'inscription' });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const { user, token } = await this.authService.login(email, password);
            res.json({
                message: 'Connexion réussie',
                user: { id: user.id, email: user.email, role: user.role },
                token
            });
        } catch (error: any) {
            res.status(401).json({ error: error.message || 'Email ou mot de passe incorrect' });
        }
    }
}
