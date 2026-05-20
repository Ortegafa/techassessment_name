import { Injectable } from "@nestjs/common";
import type { RoleRepository } from "../../domain/repositories/role.repository.port";
import { Role } from "../../domain/entities/role.entity";
import { PrismaService } from "./prisma.service";

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
    constructor(
        private readonly prisma: PrismaService) {}

    async save(role: Role): Promise<Role> {
        const saved = await this.prisma.role.create({
            data: {
                name: role.name,
            },
        });
        return new Role(saved.roleId, 
            saved.name);
    }

    async findRoleById(roleId: number): Promise<Role | null> {
        const role = await this.prisma.role.findUnique({
            where: { roleId: Number(roleId) },
        });
        return role
    }
    }