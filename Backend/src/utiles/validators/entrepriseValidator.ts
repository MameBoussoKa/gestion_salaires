import { z } from 'zod';

export const entrepriseSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  logo: z.string().optional(),
  adresse: z.string().optional(),
  devise: z.string().min(1, "La devise est requise"),
  // periode: z.enum(["mensuelle", "hebdo", "journalière"]),
  periode: z.string()
  .toLowerCase()
  .refine(val => ["journalière", "hebdo", "mensuelle"].includes(val), {
    message: "La période doit être journalière, hebdo ou mensuelle"
  }),
  couleur: z.string().regex(/^#[0-9A-F]{6}$/i, "La couleur doit être un code hexadécimal valide").nullable().optional()
}).strict();