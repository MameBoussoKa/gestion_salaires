import { z } from 'zod';

export const bulletinSchema = z.object({
  employeId: z.number().int().positive(),
  cyclePaieId: z.number().int().positive(),
  brut: z.number().positive("Le montant brut doit être positif"),
  deductions: z.number().min(0, "Les déductions ne peuvent pas être négatives"),
  netAPayer: z.number().positive("Le net à payer doit être positif"),
  statut: z.enum(["payé", "partiel", "en attente"])
}).strict();