import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { utilisateurSchema } from '../utiles/validators/utilisateurValidator.js';

export const validateSchema = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            res.status(400).json({ error: 'Validation failed', details: error });
        }
    };
};

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    try {
        utilisateurSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: 'Validation failed', details: error });
    }
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginSchema = utilisateurSchema.pick({ email: true, password: true });
        loginSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: 'Validation failed', details: error });
    }
};
