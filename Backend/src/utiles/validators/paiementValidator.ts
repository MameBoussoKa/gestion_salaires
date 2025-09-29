import { z } from 'zod';


export const paiementSchema = z.object({
  montant: z.number().positive("Le montant doit être positif"),
  mode: z.string().min(1, "Le mode de paiement est requis"),
  bulletinId: z.number().int().positive(),
  recuPDF: z.string().nullable().optional()
}).strict();

