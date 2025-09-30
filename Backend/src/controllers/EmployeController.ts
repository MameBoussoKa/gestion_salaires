import { Request, Response } from 'express';
import { EmployeRepository } from '../repository/EmployeRepository.js';

export class EmployeController {
    private employeRepository: EmployeRepository = new EmployeRepository();

    async getAllEmployes(req: Request, res: Response): Promise<void> {
        try {
            const employes = await this.employeRepository.findAll();
            res.json(employes);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async getEmployeById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const employe = await this.employeRepository.findById(id);
            if (!employe) {
                res.status(404).json({ error: 'Employé non trouvé' });
                return;
            }
            res.json(employe);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async createEmploye(req: Request, res: Response): Promise<void> {
        try {
            const employe = await this.employeRepository.create(req.body);
            res.status(201).json(employe);
        } catch (error: any) {
            console.error('Erreur création employé:', error);
            if (error.code === 'P2003') {
                res.status(400).json({ error: 'L\'entreprise spécifiée n\'existe pas' });
            } else {
                res.status(500).json({ error: 'Erreur serveur lors de la création de l\'employé' });
            }
        }
    }

    async updateEmploye(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const employe = await this.employeRepository.update(id, req.body);
            res.json(employe);
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }

    async deleteEmploye(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.employeRepository.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
}
