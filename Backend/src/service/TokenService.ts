import jwt from 'jsonwebtoken';

export class TokenService {
    private secretKey: string = process.env.JWT_SECRET || 'default_secret';

    generateToken(payload: object): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
