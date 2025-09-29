import { PrismaClient, Utilisateur } from "@prisma/client";

import { IRepository } from "./IRepository.js";
import bcrypt from "bcrypt";
export class UserRepository implements IRepository<Utilisateur> {
    private MBK_prisma: PrismaClient = new PrismaClient();


    async findAll(): Promise<Utilisateur[]> {
        return await this.MBK_prisma.utilisateur.findMany({


        })


    }
    async findById(id: number): Promise<Utilisateur | null> {
        return await this.MBK_prisma.utilisateur.findUnique({
            where: { id },
            
        })
    }

    async findByEmail(email: string): Promise<Utilisateur | null> {
        return await this.MBK_prisma.utilisateur.findUnique({
            where: { email },


        })
    }



    async create(data: { nomcomplet: string; email: string; password: string; role: string; entrepriseId?: number | null }): Promise<Utilisateur> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return await this.MBK_prisma.utilisateur.create({
            data: { ...data, password: hashedPassword },

        });

    }
    async update(id: number, data: Partial<{ email: string; password: string; role: string; entrepriseId?: number }>): Promise<Utilisateur> {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);

        }
        return await this.MBK_prisma.utilisateur.update({
            where: { id },
            data,
            
        })
    }
    async delete(id: number): Promise<void> {
        await this.MBK_prisma.utilisateur.delete({
            where: { id }
        })
    }
    async verifyPassword(utilisateur: Utilisateur, password: string): Promise<boolean> {
        return bcrypt.compare(password, utilisateur.password)
    }

}