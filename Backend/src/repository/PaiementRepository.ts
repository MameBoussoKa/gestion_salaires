import { PrismaClient, Paiement } from "@prisma/client";
import { IRepository } from "./IRepository.js";

export class PaiementRepository implements IRepository<Paiement> {
    private prisma: PrismaClient = new PrismaClient();

    async findAll(): Promise<Paiement[]> {
        return await this.prisma.paiement.findMany({
            include: { bulletin: true }
        });
    }

    async findById(id: number): Promise<Paiement | null> {
        return await this.prisma.paiement.findUnique({
            where: { id },
            include: { bulletin: true }
        });
    }

    async create(data: { montant: number; mode: string; date?: Date; bulletinId: number }): Promise<Paiement> {
        return await this.prisma.paiement.create({
            data,
            include: { bulletin: true }
        });
    }

    async update(id: number, data: Partial<{ montant: number; mode: string; date?: Date; bulletinId: number }>): Promise<Paiement> {
        return await this.prisma.paiement.update({
            where: { id },
            data,
            include: { bulletin: true }
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.paiement.delete({
            where: { id },
        });
    }
}
