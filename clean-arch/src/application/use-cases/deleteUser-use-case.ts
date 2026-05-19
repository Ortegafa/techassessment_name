import {Inject, Injectable} from "@nestjs/common";
import type { UserRepository } from "../../domain/repositories/user.repository.port";
import { USER_REPOSITORY } from "../tokens";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class DeleteUserUseCase{
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepo:UserRepository
    ){}

    async execute(userId:number): Promise<void>{
        const existingUser = await this.userRepo.findUserById(userId);
        if (!existingUser) {
            throw new Error("User not found");
        }
        await this.userRepo.delete(userId);
    }
}