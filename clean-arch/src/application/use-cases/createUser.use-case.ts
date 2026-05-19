import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity"; 
import type{ UserRepository } from "../../domain/repositories/user.repository.port";
import { CreateUserDto } from "../dto/createUser.dto";
import * as bcrypt from "bcrypt";
import { USER_REPOSITORY } from "../tokens";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository
  ){}

  async execute(userInput: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepo.findUserByEmail(userInput.email);
    if (existingUser !== null){
      throw new Error('User already exists')
    }
    const passwordHash = await bcrypt.hash(userInput.password, 10)
    const user = new User(
      null,
      userInput.username,
      passwordHash,
      userInput.roleId,
      userInput.email,
      'active',
      new Date()
    );
    return this.userRepo.save(user);
  }
}