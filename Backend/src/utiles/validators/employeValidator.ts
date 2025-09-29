import { z } from 'zod';

export const employeSchema = z.object({
  nomComplet: z.string().min(2, "Le nom complet doit contenir au moins 2 caractères"),
  poste: z.string().min(2, "Le poste doit contenir au moins 2 caractères"),
  typeContrat: z.enum(["journalier", "fixe", "honoraire"]),
  tauxSalaire: z.number().positive("Le taux de salaire doit être positif"),
  coordonneesBancaires: z.string().nullable().optional(),
  actif: z.boolean().default(true),
  entrepriseId: z.number().int().positive()
}).strict();