import { PrismaClient } from "@prisma/client";
export class PaymentRepository {
    getPrismaClient() {
        return new PrismaClient();
    }
    // 🔹 Création d’un paiement
    async create(data) {
        const prismaClient = this.getPrismaClient();
        try {
            return await prismaClient.payment.create({ data });
        }
        finally {
            await prismaClient.$disconnect();
        }
    }
    // 🔹 Recherche par ID
    async findById(id) {
        const prismaClient = this.getPrismaClient();
        try {
            return await prismaClient.payment.findUnique({
                where: { id },
                include: {
                    payslip: {
                        include: {
                            employee: true,
                            payRun: { include: { entreprise: true } }
                        }
                    },
                    createdBy: true
                }
            });
        }
        finally {
            await prismaClient.$disconnect();
        }
    }
    // 🔹 Recherche avec filtres
    async findAll(filters) {
        const prismaClient = this.getPrismaClient();
        try {
            const where = {};
            if (filters?.payslipId) {
                where.payslipId = filters.payslipId;
            }
            if (filters?.createdById) {
                where.createdById = filters.createdById;
            }
            if (filters?.entrepriseId) {
                where.payslip = {
                    employee: {
                        entrepriseId: filters.entrepriseId
                    }
                };
            }
            return await prismaClient.payment.findMany({
                where,
                include: {
                    payslip: {
                        include: {
                            employee: true,
                            payRun: { include: { entreprise: true } }
                        }
                    },
                    createdBy: true
                },
                orderBy: { createdAt: "desc" }
            });
        }
        finally {
            await prismaClient.$disconnect();
        }
    }
    // 🔹 Mise à jour d’un paiement
    async update(id, data) {
        const prismaClient = this.getPrismaClient();
        try {
            return await prismaClient.payment.update({
                where: { id },
                data,
                include: { payslip: { include: { employee: true } }, createdBy: true }
            });
        }
        finally {
            await prismaClient.$disconnect();
        }
    }
    // 🔹 Suppression
    async delete(id) {
        const prismaClient = this.getPrismaClient();
        try {
            return await prismaClient.payment.delete({
                where: { id }
            });
        }
        finally {
            await prismaClient.$disconnect();
        }
    }
}
//# sourceMappingURL=PaymentRepository.js.map