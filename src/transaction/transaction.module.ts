import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../../prisma.service';
import {UserService} from "../user/user.service";

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, AuthService, PrismaService, UserService],
})
export class TransactionModule {}
