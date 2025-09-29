import { EntrepriseRepository } from "../repository/EntrepriseRepository.js";
import type { Entreprise } from "@prisma/client";

export class EntrepriseService {
  private entrepriseRepository = new EntrepriseRepository();

  // 🔹 Création d’une entreprise
  async create(
    data: Omit<Entreprise, "id" | "createdAt" | "updatedAt">
  ): Promise<Entreprise> {
    return this.entrepriseRepository.create({
      ...data,
      devise: data.devise || "XOF",
      typePeriode: data.typePeriode || "MENSUELLE"
    });
  }

  async findById(id: number): Promise<Entreprise | null> {
    return this.entrepriseRepository.findById(id);
  }

  async findAll(filters?: {
    nom?: string;
  }): Promise<Entreprise[]> {
    return this.entrepriseRepository.findAll(filters);
  }

  async update(
    id: number,
    data: Partial<Omit<Entreprise, "id" | "createdAt" | "updatedAt">>
  ): Promise<Entreprise> {
    return this.entrepriseRepository.update(id, data);
  }

  async delete(id: number): Promise<Entreprise> {
    return this.entrepriseRepository.delete(id);
  }
}