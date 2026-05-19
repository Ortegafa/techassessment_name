import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { UsersController } from "../controllers/users.controller";
import { TOKEN_SERVICE, USER_REPOSITORY } from "../../application/tokens";
import { UserRepository } from "../../domain/repositories/user.repository.port";
import { TokenServicePort } from "../../domain/repositories/token.repository.port";

import { PrismaService } from "../../infrastructure/database/prisma.service";
import { PrismaUserRepository } from "../../infrastructure/database/prisma-user.repository";
import { JwtTokenService } from "../../infrastructure/database/prisma-token.repository";

import { CreateUserUseCase } from "../../application/use-cases/createUser.use-case";
import { GetUserUseCase } from "../../application/use-cases/get-user.use-case";
import { UpdateUserUseCase } from "../../application/use-cases/updateUser.use-case";
import { BlockUserUseCase } from "src/application/use-cases/blockUser.user-case";
import { InactivateUserUseCase } from "src/application/use-cases/inactivateUser.use-case";
import { ActivateUserUseCase } from "../../application/use-cases/activateUser.user-case";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { DeleteUserUseCase } from "src/application/use-cases/deleteUser-use-case";

@Module({
  imports: [

    // 👇 Usa ConfigService para leer el secret después de cargar el .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [
    PrismaService,

    {
      provide: USER_REPOSITORY,
      useFactory: (prisma: PrismaService) => new PrismaUserRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenService,
    },

    {
      provide: CreateUserUseCase,
      useFactory: (repo: UserRepository) => new CreateUserUseCase(repo),
      inject: [USER_REPOSITORY],
    },
    {
      provide: GetUserUseCase,
      useFactory: (repo: UserRepository) => new GetUserUseCase(repo),
      inject: [USER_REPOSITORY],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (repo: UserRepository) => new UpdateUserUseCase(repo),
      inject: [USER_REPOSITORY],
    },
    {
      provide: BlockUserUseCase,
      useFactory: (repo: UserRepository) => new BlockUserUseCase(repo),
      inject: [USER_REPOSITORY],
    },
    {
      provide: InactivateUserUseCase,
      useFactory: (repo: UserRepository) => new InactivateUserUseCase(repo),
      inject: [USER_REPOSITORY],
    },
    {
      provide: ActivateUserUseCase,
      useFactory: (repo: UserRepository) => new ActivateUserUseCase(repo),
      inject: [USER_REPOSITORY],
    },
    {
        provide: DeleteUserUseCase,
        useFactory: (repo: UserRepository) => new DeleteUserUseCase(repo),
        inject: [USER_REPOSITORY],
    },
    {
      provide: LoginUseCase,
      useFactory: (repo: UserRepository, token: TokenServicePort) =>
        new LoginUseCase(repo, token),
      inject: [USER_REPOSITORY, TOKEN_SERVICE],
    },
  ],
})
export class UsersModule {}