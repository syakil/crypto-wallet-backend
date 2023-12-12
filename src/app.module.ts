import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroController } from './hero/hero.controller';
import { UserModule } from './user/user.module';
import { RoleController } from './role/role.controller';
import { HeroService } from './hero/hero.service';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [UserModule, AuthModule, TransactionModule],
  controllers: [AppController, HeroController, RoleController],
  providers: [AppService, HeroService],
})
export class AppModule {}
