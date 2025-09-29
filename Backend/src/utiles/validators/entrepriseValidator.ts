import { z } from 'zod';

export const entrepriseSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  logo: z.string().url("L'URL du logo doit être valide").nullable().optional(),
  adresse: z.string().nullable().optional(),
  devise: z.string().min(1, "La devise est requise"),
  periode: z.enum(["mensuelle", "hebdo", "journalière"])
}).strict();