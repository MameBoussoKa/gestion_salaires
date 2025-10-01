import { PrismaClient, Entreprise } from "@prisma/client";
import { IRepository } from "./IRepository.js";

export class EntrepriseRepository implements IRepository<Entreprise> {
    private prisma: PrismaClient = new PrismaClient();

    async findAll(): Promise<Entreprise[]> {
        return await this.prisma.entreprise.findMany();
    }

    async findById(id: number): Promise<Entreprise | null> {
        console.log('Repository: Recherche entreprise ID:', id);
        try {
            const result = await this.prisma.entreprise.findUnique({
                where: { id },
            });
            console.log('Repository: Résultat:', result);
            return result;
        } catch (error) {
            console.error('Repository: Erreur Prisma:', error);
            throw error;
        }
    }

    async create(data: { nom: string; logo?: string | null; adresse?: string | null; devise: string; periode: string; couleur?: string | null }): Promise<Entreprise> {
        return await this.prisma.entreprise.create({
            data,
        });
    }

    async update(id: number, data: Partial<{ nom: string; logo?: string; adresse?: string; devise: string; periode: string; couleur?: string }>): Promise<Entreprise> {
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
