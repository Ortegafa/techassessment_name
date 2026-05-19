import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import type{ UserRepository } from "../../domain/repositories/user.repository.port";
import { USER_REPOSITORY } from "../tokens";

@Injectable()
export class ActivateUserUseCase{
    constructor(
     @Inject(USER_REPOSITORY)   private readonly userRepo:UserRepository
    ){}

    async execute(userId:number): Promise<User>{
        const existingUser = await this.userRepo.findUserById(userId);
        if (existingUser === null){
            throw new Error("Id not found")
        }
        const user = new User(
            existingUser.userId,
            existingUser.username,
            existingUser.passwordHash,
            existingUser.roleId,
            existingUser.email,
            'active',
            new Date()
        )
        const updatedUser = await this.userRepo.update(user);
        return updatedUser;
    }

}