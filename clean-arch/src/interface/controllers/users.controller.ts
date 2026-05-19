import { Controller, Get, Post, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from '../../application/dto/createUser.dto';
import { GetUserDto } from 'src/application/dto/getUser.dto';
import { UpdateUserDto } from '../../application/dto/updateUser.dto';
import { CreateUserUseCase } from '../../application/use-cases/createUser.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/updateUser.use-case';
import { BlockUserUseCase } from 'src/application/use-cases/blockUser.user-case';
import { InactivateUserUseCase } from 'src/application/use-cases/inactivateUser.use-case';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivateUserUseCase } from '../../application/use-cases/activateUser.user-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginDto } from '../../application/dto/login.dto';
import { DeleteUserUseCase } from 'src/application/use-cases/deleteUser-use-case';
import { User } from '../../domain/entities/user.entity';

@ApiTags("Users")
@Controller('users')
export class UsersController{
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly blockUser: BlockUserUseCase,
    private readonly inactivateUser: InactivateUserUseCase,
    private readonly activateUser: ActivateUserUseCase,
    private readonly login: LoginUseCase,
    private readonly deleteUser: DeleteUserUseCase
    
  ){}


  @Post ("login")
  async Login(@Body() body:LoginDto): Promise<{user:User;token:String}> {
    const result = await this.login.execute(body);
    return {
      user: result.user as User & { userId: number },
      token: result.token
    }
  }

  @Post('/inactivate/:id')
  @ApiOperation({summary:"Inactivate User"})
  @ApiOkResponse({description:"User Inactivated Correctly"})
  async ActivateUserById(@Param('id', ParseIntPipe) id: number){
    const ActivateUser = await this.activateUser.execute(id)
    return ActivateUser
  }

  @Post('/create')
  @ApiOperation({summary:"User Creation"})
  @ApiOkResponse({description: "The user was created correctly "})
  async create(@Body() body: CreateUserDto){
    const user = await this.createUser.execute({
      username: body.username,
      password: body.password,
      roleId: body.roleId,
      email: body.email
    })
    return user;
  }

  @Post('/update/:id')
  @ApiOperation({summary:"Update User"})
  @ApiOkResponse({description:"User updated correctly"})

  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto){
    const updatedUser = await this.updateUser.execute({
      userId: id,
      email: body.email,
      username: body.username,
      password: body.password
    })
    return updatedUser;
  }

  @Post('/block/:id')
  @ApiOperation({summary:"Block User"})
  @ApiOkResponse({description:"User Blocked Correctly"})
  async BlockUserById(@Param('id', ParseIntPipe) id: number){
    const blockedUser = await this.blockUser.execute(id)
    return blockedUser
  }

  @Post('/inactivate/:id')
  @ApiOperation({summary:"Inactivate User"})
  @ApiOkResponse({description:"User Inactivated Correctly"})
  async InactivateUserById(@Param('id', ParseIntPipe) id: number){
    const inactivatedUser = await this.inactivateUser.execute(id)
    return inactivatedUser
  }

  @Get('/:id')
  @ApiOperation({summary: "Find Id"})
  @ApiOkResponse({description:"User Found Correctly"})
  async GetUserById(@Param('id', ParseIntPipe) id: number){
    const user = await this.getUser.execute({
      userId: id,
      criteria: 'id'
    })
    return user
  }

  @ApiOperation({summary:"Find Email"})
  @ApiOkResponse({description:"User Found Correctly"})
  @Get('/email/:email')
  async GetUserByEmail(@Param("email") email: string){
    const user = await this.getUser.execute({
      email: email,
      criteria: 'email'
    })
    return user
  }

  @Post('/delete/:id')
  @ApiOperation({summary:"Delete User"})
  @ApiOkResponse({description:"User Deleted Correctly"})
  async DeleteUserById(@Param('id', ParseIntPipe) id: number){
    const deletedUser = await this.deleteUser.execute(id)
    return deletedUser
  }
}