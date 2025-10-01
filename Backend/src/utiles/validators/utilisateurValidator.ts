import { z } from 'zod';

export const utilisateurSchema = z.object({
  nomcomplet: z.string().min(5),
  email: z.string().email("L'email doit être valide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  role: z.enum(["super-admin", "admin", "caissier"]),
  entrepriseId: z.number().nullable().optional()
}).strict();

export const utilisateurUpdateSchema = z.object({
  nomcomplet: z.string().min(5).optional(),
  email: z.string().email("L'email doit être valide").optional(),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").optional(),
  role: z.enum(["super-admin", "admin", "caissier"]).optional(),
  entrepriseId: z.number().nullable().optional()
});