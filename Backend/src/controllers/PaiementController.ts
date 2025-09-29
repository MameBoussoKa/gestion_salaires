import { Request, Response } from 'express';
import { PaiementRepository } from '../repository/PaiementRepository.js';

export class PaiementController {
    private paiementRepository: PaiementRepository = new PaiementRepository();

    async getAllPaiements(req: Request, res: Response): Promise<void> {
        try {
            const paiements = await this.paiementRepository.findAll();
            res.json(paiements);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async getPaiementById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const paiement = await this.paiementRepository.findById(id);
            if (!paiement) {
                res.status(404).json({ error: 'Paiement non trouvé' });
                return;
            }
            res.json(paiement);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async createPaiement(req: Request, res: Response): Promise<void> {
        try {
            const paiement = await this.paiementRepository.create(req.body);
            res.status(201).json(paiement);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async updatePaiement(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const paiement = await this.paiementRepository.update(id, req.body);
            res.json(paiement);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async deletePaiement(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.paiementRepository.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
}
