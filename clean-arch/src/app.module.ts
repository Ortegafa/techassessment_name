import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/interface/modules/users.module'; 
import { RolesModule } from 'src/interface/modules/roles.module';
import * as path from  "path"

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: path.resolve(__dirname, '../../../.env'),
      isGlobal: true
     }),
    UsersModule,RolesModule
  ],
})
export class AppModule {}
