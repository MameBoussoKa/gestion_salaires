import { PrismaClient, CyclePaie } from "@prisma/client";
import { IRepository } from "./IRepository.js";

export class CyclePaieRepository implements IRepository<CyclePaie> {
    private prisma: PrismaClient = new PrismaClient();

    async findAll(): Promise<CyclePaie[]> {
        return await this.prisma.cyclePaie.findMany({
            include: { entreprise: true, bulletins: true }
        });
    }

    async findById(id: number): Promise<CyclePaie | null> {
        return await this.prisma.cyclePaie.findUnique({
            where: { id },
            include: { entreprise: true, bulletins: true }
        });
    }

    async create(data: { periode: string; type: string; statut: string; entrepriseId: number }): Promise<CyclePaie> {
        return await this.prisma.cyclePaie.create({
            data,
            include: { entreprise: true, bulletins: true }
        });
    }

    async update(id: number, data: Partial<{ periode: string; type: string; statut: string; entrepriseId: number }>): Promise<CyclePaie> {
        return await this.prisma.cyclePaie.update({
            where: { id },
            data,
            include: { entreprise: true, bulletins: true }
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.cyclePaie.delete({
            where: { id },
        });
    }
}
