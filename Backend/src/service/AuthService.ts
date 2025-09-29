import { UserRepository } from '../repository/UtilisateurRepository.js';
import { TokenService } from './TokenService.js';

export class AuthService {
    private userRepository: UserRepository;
    private tokenService: TokenService;

    constructor() {
        this.userRepository = new UserRepository();
        this.tokenService = new TokenService();
    }

    async register(nomcomplet: string, email: string, password: string, role: string, entrepriseId?: number | null): Promise<{ user: any; token: string }> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const user = await this.userRepository.create({ nomcomplet, email, password, role, entrepriseId });
        const token = this.tokenService.generateToken({ id: user.id, email: user.email, role: user.role });

        return { user, token };
    }

    async login(email: string, password: string): Promise<{ user: any; token: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await this.userRepository.verifyPassword(user, password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = this.tokenService.generateToken({ id: user.id, email: user.email, role: user.role });

        return { user, token };
    }
}
