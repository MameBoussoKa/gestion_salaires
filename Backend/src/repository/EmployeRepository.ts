import { PrismaClient, Employe } from "@prisma/client";
import { IRepository } from "./IRepository.js";

export class EmployeRepository implements IRepository<Employe> {
    private prisma: PrismaClient = new PrismaClient();

    async findAll(): Promise<Employe[]> {
        return await this.prisma.employe.findMany({
            include: { entreprise: true }
        });
    }

    async findById(id: number): Promise<Employe | null> {
        return await this.prisma.employe.findUnique({
            where: { id },
            include: { entreprise: true }
        });
    }

    async create(data: { nomComplet: string; poste: string; typeContrat: string; tauxSalaire: number; coordonneesBancaires?: string | null; actif?: boolean; entrepriseId: number }): Promise<Employe> {
        return await this.prisma.employe.create({
            data,
            include: { entreprise: true }
        });
    }

    async update(id: number, data: Partial<{ nomComplet: string; poste: string; typeContrat: string; tauxSalaire: number; coordonneesBancaires?: string | null; actif?: boolean; entrepriseId: number }>): Promise<Employe> {
        return await this.prisma.employe.update({
            where: { id },
            data,
            include: { entreprise: true }
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.employe.delete({
            where: { id },
        });
    }
}
