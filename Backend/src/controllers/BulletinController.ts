import { Request, Response } from 'express';
import { BulletinRepository } from '../repository/BulletinRepository.js';

export class BulletinController {
    private bulletinRepository: BulletinRepository = new BulletinRepository();

    async getAllBulletins(req: Request, res: Response): Promise<void> {
        try {
            const bulletins = await this.bulletinRepository.findAll();
            res.json(bulletins);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async getBulletinById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const bulletin = await this.bulletinRepository.findById(id);
            if (!bulletin) {
                res.status(404).json({ error: 'Bulletin non trouvé' });
                return;
            }
            res.json(bulletin);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async createBulletin(req: Request, res: Response): Promise<void> {
        try {
            const bulletin = await this.bulletinRepository.create(req.body);
            res.status(201).json(bulletin);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async updateBulletin(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const bulletin = await this.bulletinRepository.update(id, req.body);
            res.json(bulletin);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async deleteBulletin(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.bulletinRepository.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async updateStatut(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const { statut } = req.body;
            const bulletin = await this.bulletinRepository.update(id, { statut });
            res.json(bulletin);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
}
