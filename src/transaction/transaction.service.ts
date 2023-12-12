import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}
  async topup(amount: number, token: string) {
    const userId = await this.authService.getUserIdFromToken(token);
    if (!userId) {
      throw new Error('Unauthorized');
    }
    await this.prisma.transaction.create({
      data: {
        amount,
        transactionType: 'TOPUP',
        userId: userId,
      },
    });

    return this.prisma.user.update({
      where: { id: userId },
      data: { balance: { increment: amount } },
    });
  }
  async transfer(amount: number, token: string, to: string) {
    const userId = await this.authService.getUserIdFromToken(token);
    if (!userId) {
      throw new Error('Unauthorized');
    }
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('Unauthorized');
    }
    const balance = user.balance.toNumber();
    if (balance < amount) {
      throw new Error('Insufficient balance');
    }
    const toUser = await this.prisma.user.findUnique({
      where: { email: to },
    });
    if (!toUser) {
      throw new Error('User not found');
    }
    await this.prisma.transaction.create({
      data: {
        amount,
        transactionType: 'TRANSFER',
        userId: userId,
        receiveId: toUser.id,
      },
    });
    await this.prisma.user.update({
      where: { id: userId },
      data: { balance: { decrement: amount } },
    });
    return this.prisma.user.update({
      where: { id: toUser.id },
      data: { balance: { increment: amount } },
    });
  }
  async history(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        OR: [
          {
            userId: userId,
          },
          {
            receiveId: userId,
          },
        ],
      },
      orderBy: {
        amount: 'desc',
      },
      take: 10,
    });
  }

  async topUser() {
    try {
      const result = await this.prisma.$queryRaw`
       SELECT "name" AS "username", CAST(SUM("amount") AS INTEGER) AS "transacted_value"
      FROM transactions 
      LEFT JOIN users ON transactions."userId" = users."id"
      WHERE "transactionType" = 'TRANSFER' 
      GROUP BY "name" 
      ORDER BY SUM("amount") DESC 
      LIMIT 10
        `;
      return result;
    } catch (error) {
      console.error('Error fetching top users:', error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
