import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../service/TokenService.js';

export class AuthMiddleware {
    private tokenService: TokenService = new TokenService();

    verifyToken(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Token manquant' });
            return;
        }

        const token = authHeader.substring(7);
        try {
            const decoded = this.tokenService.verifyToken(token);
            (req as any).user = decoded; // Ajoute l'utilisateur décodé à la requête
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token invalide' });
        }
    }
}
