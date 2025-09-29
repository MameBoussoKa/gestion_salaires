import { Request, Response } from 'express';
import { CyclePaieRepository } from '../repository/CyclePaieRepository.js';

export class CyclePaieController {
    private cyclePaieRepository: CyclePaieRepository = new CyclePaieRepository();

    async getAllCyclesPaie(req: Request, res: Response): Promise<void> {
        try {
            const cycles = await this.cyclePaieRepository.findAll();
            res.json(cycles);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async getCyclePaieById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const cycle = await this.cyclePaieRepository.findById(id);
            if (!cycle) {
                res.status(404).json({ error: 'Cycle de paie non trouvé' });
                return;
            }
            res.json(cycle);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async createCyclePaie(req: Request, res: Response): Promise<void> {
        try {
            const cycle = await this.cyclePaieRepository.create(req.body);
            res.status(201).json(cycle);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async updateCyclePaie(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const cycle = await this.cyclePaieRepository.update(id, req.body);
            res.json(cycle);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async deleteCyclePaie(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.cyclePaieRepository.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
}
