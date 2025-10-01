import { Request, Response } from 'express';
import { UserService } from '../service/UserService.js';

export class UserController {
    private userService: UserService = new UserService();

    async getMe(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).user.id;
            const user = await this.userService.findUserById(userId);
            if (!user) {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.findAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.findUserById(id);
            if (!user) {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            // Filter out undefined values for partial updates
            const updateData = Object.fromEntries(
                Object.entries(req.body).filter(([_, value]) => value !== undefined)
            );
            const user = await this.userService.updateUser(id, updateData);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.userService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
}
