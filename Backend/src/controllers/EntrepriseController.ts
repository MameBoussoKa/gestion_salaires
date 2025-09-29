import { Request, Response } from 'express';
import { EntrepriseRepository } from '../repository/EntrepriseRepository.js';

export class EntrepriseController {
    private entrepriseRepository: EntrepriseRepository = new EntrepriseRepository();

    async getAllEntreprises(req: Request, res: Response): Promise<void> {
        try {
            const entreprises = await this.entrepriseRepository.findAll();
            res.json(entreprises);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async getEntrepriseById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const entreprise = await this.entrepriseRepository.findById(id);
            if (!entreprise) {
                res.status(404).json({ error: 'Entreprise non trouvée' });
                return;
            }
            res.json(entreprise);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async createEntreprise(req: Request, res: Response): Promise<void> {
        try {
            const entreprise = await this.entrepriseRepository.create(req.body);
            res.status(201).json(entreprise);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async updateEntreprise(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const entreprise = await this.entrepriseRepository.update(id, req.body);
            res.json(entreprise);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async deleteEntreprise(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.entrepriseRepository.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
}
