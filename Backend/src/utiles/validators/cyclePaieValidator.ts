import { z } from 'zod';

export const cyclePaieSchema = z.object({
  periode: z.string().min(1, "La période est requise"),
  type: z.enum(["mensuel", "hebdo", "journalier"]),
  statut: z.enum(["brouillon", "approuvé", "clôturé"]),
  entrepriseId: z.number().int().positive()
}).strict();