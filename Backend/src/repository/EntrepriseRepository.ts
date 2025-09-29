import { PrismaClient, Entreprise } from "@prisma/client";
import { IRepository } from "./IRepository.js";

export class EntrepriseRepository implements IRepository<Entreprise> {
    private prisma: PrismaClient = new PrismaClient();

    async findAll(): Promise<Entreprise[]> {
        return await this.prisma.entreprise.findMany();
    }

    async findById(id: number): Promise<Entreprise | null> {
        return await this.prisma.entreprise.findUnique({
            where: { id },
        });
    }

    async create(data: { nom: string; logo?: string | null; adresse?: string | null; devise: string; periode: string }): Promise<Entreprise> {
        return await this.prisma.entreprise.create({
            data,
        });
    }

    async update(id: number, data: Partial<{ nom: string; logo?: string; adresse?: string; devise: string; periode: string }>): Promise<Entreprise> {
        return await this.prisma.entreprise.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.entreprise.delete({
            where: { id },
        });
    }
}
