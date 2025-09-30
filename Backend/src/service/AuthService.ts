import { UserRepository } from '../repository/UtilisateurRepository.js';
import { EntrepriseRepository } from '../repository/EntrepriseRepository.js';
import { TokenService } from './TokenService.js';

export class AuthService {
    private userRepository: UserRepository;
    private entrepriseRepository: EntrepriseRepository;
    private tokenService: TokenService;

    constructor() {
        this.userRepository = new UserRepository();
        this.entrepriseRepository = new EntrepriseRepository();
        this.tokenService = new TokenService();
    }

    async register(nomcomplet: string, email: string, password: string, role: string, entrepriseId?: number | null): Promise<{ user: any; token: string }> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Utilisateur déjà existant');
        }

        // Validation des rôles
        if (role === 'super-admin') {
            if (entrepriseId !== null && entrepriseId !== undefined) {
                throw new Error('Le super-admin ne peut pas être lié à une entreprise');
            }
            entrepriseId = null;
        } else if (role === 'admin' || role === 'caissier') {
            if (!entrepriseId) {
                throw new Error('L\'admin et le caissier doivent être liés à une entreprise');
            }
            // Vérifier que l'entreprise existe
            const entreprise = await this.entrepriseRepository.findById(entrepriseId);
            if (!entreprise) {
                throw new Error('L\'entreprise spécifiée n\'existe pas');
            }
        } else {
            throw new Error('Rôle invalide');
        }

        const user = await this.userRepository.create({ nomcomplet, email, password, role, entrepriseId });
        const token = this.tokenService.generateToken({ id: user.id, email: user.email, role: user.role });

        return { user, token };
    }

    async login(email: string, password: string): Promise<{ user: any; token: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Identifiants invalides');
        }

        const isPasswordValid = await this.userRepository.verifyPassword(user, password);
        if (!isPasswordValid) {
            throw new Error('Identifiants invalides');
        }

        const token = this.tokenService.generateToken({ id: user.id, email: user.email, role: user.role });

        return { user, token };
    }
}
