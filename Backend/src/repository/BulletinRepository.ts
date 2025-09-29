import { PrismaClient, Bulletin } from "@prisma/client";
import { IRepository } from "./IRepository.js";

export class BulletinRepository implements IRepository<Bulletin> {
    private prisma: PrismaClient = new PrismaClient();

    async findAll(): Promise<Bulletin[]> {
        return await this.prisma.bulletin.findMany({
            include: { employe: true, cyclePaie: true, paiements: true }
        });
    }

    async findById(id: number): Promise<Bulletin | null> {
        return await this.prisma.bulletin.findUnique({
            where: { id },
            include: { employe: true, cyclePaie: true, paiements: true }
        });
    }

    async create(data: { employeId: number; cyclePaieId: number; brut: number; deductions: number; netAPayer: number; statut: string }): Promise<Bulletin> {
        return await this.prisma.bulletin.create({
            data,
            include: { employe: true, cyclePaie: true, paiements: true }
        });
    }

    async update(id: number, data: Partial<{ employeId: number; cyclePaieId: number; brut: number; deductions: number; netAPayer: number; statut: string }>): Promise<Bulletin> {
        return await this.prisma.bulletin.update({
            where: { id },
            data,
            include: { employe: true, cyclePaie: true, paiements: true }
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.bulletin.delete({
            where: { id },
        });
    }
}
