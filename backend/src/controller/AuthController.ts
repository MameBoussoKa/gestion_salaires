import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AuthService } from "../service/AuthService.js";
import { loginSchema, registerSchema } from "../validation/validation.ts";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export class AuthController {
    private authService = new AuthService();

    async login(req: Request, res: Response) {
        try {
                        console.log('Login attempt:', req.body);
            const validatedData = loginSchema.parse(req.body);
            const { email, motDePasse } = validatedData;
            const result = await this.authService.login(email, motDePasse);
             console.log('Login successful:', { ...result, motDePasse: undefined });

            res.json(result);
        } catch (err) {
                        console.error('Login error:', err);

            res.status(400).json({ error: (err as Error).message });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const validatedData = registerSchema.parse(req.body);
            const { nom, email, motDePasse, nomEntreprise, adresseEntreprise, role } = validatedData;
            const user = await this.authService.register(nom, email, motDePasse, nomEntreprise, adresseEntreprise, role);
            const token = jwt.sign(
                { id: user.id, role: user.role, entrepriseId: user.entrepriseId },
                JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.json({ token, user: { ...user, motDePasse: undefined } });
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    }

}