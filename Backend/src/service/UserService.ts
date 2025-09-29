import { Utilisateur } from '@prisma/client';
import { UserRepository } from '../repository/UtilisateurRepository.js';
import { TokenService } from './TokenService.js';

export class UserService {
    private userRepository: UserRepository = new UserRepository();
    private tokenService: TokenService = new TokenService();

    async createUser(data: { email: string; password: string; role: string; entrepriseId?: number }): Promise<Utilisateur> {
        return await this.userRepository.create(data);
    }

    async findAllUsers(): Promise<Utilisateur[]> {
        return await this.userRepository.findAll();
    }

    async findUserById(id: number): Promise<Utilisateur | null> {
        return await this.userRepository.findById(id);
    }

    async findUserByEmail(email: string): Promise<Utilisateur | null> {
        return await this.userRepository.findByEmail(email);
    }

    async updateUser(id: number, data: Partial<{ email: string; password?: string; role: string; entrepriseId?: number }>): Promise<Utilisateur> {
        return await this.userRepository.update(id, data);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async login(email: string, password: string): Promise<{ user: Utilisateur; token: string } | null> {
        const user = await this.userRepository.findByEmail(email);
        if (user && await this.userRepository.verifyPassword(user, password)) {
            const token = this.tokenService.generateToken({ id: user.id, email: user.email, role: user.role });
            return { user, token };
        }
        return null;
    }
}
