import { User } from "../entities/user.entity";

export interface UserRepository {
    delete(userId: number): Promise<void>;
    save(user: User): Promise<User>;
    findUserById(userId: number): Promise<User | null>;
    update(user: User): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
}