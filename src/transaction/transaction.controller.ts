import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '../auth/auth.guard';
import { TransactionDto } from './dto/transaction.dto';
import { AuthService } from '../auth/auth.service';
import { Request } from '@nestjs/common';
import { UserService } from '../user/user.service'; // Perbarui impor ini

@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('topup')
  async topup(
    @Body() transactionDto: TransactionDto,
    @Res() res: any,
    @Req() req: any,
  ) {
    try {
      if (transactionDto.amount < 1000000) {
        return res.status(401).json({ message: 'Invalid topup amount' });
      }
      await this.transactionService.topup(
        transactionDto.amount,
        this.authService.extractTokenFromHeader(req),
      );
      return res.status(204).json({ message: 'Topup successful' });
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }

  @Get('balance')
  async balance(@Req() req: any, @Res() res: any) {
    try {
      const userId = await this.authService.getUserIdFromToken(
        this.authService.extractTokenFromHeader(req),
      );
      if (!userId) {
        throw new Error('Unauthorized');
      }
      const user = await this.userService.findById(userId);
      return res.status(200).json({ balance: user.balance });
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }
  @Post('transfer')
  async transfer(@Body() body: any, @Res() res: any, @Req() req: any) {
    try {
      if (body.amount < 10000) {
        return res.status(401).json({ message: 'Invalid transfer amount' });
      }
      await this.transactionService.transfer(
        body.amount,
        this.authService.extractTokenFromHeader(req),
        body.to_username,
      );
      return res.status(204).json({ message: 'Transfer successful' });
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }
  @Get('history')
  async history(@Req() req: any, @Res() res: any) {
    try {
      const userId = await this.authService.getUserIdFromToken(
        this.authService.extractTokenFromHeader(req),
      );
      if (!userId) {
        throw new Error('Unauthorized');
      }
      const transactions = await this.transactionService.history(userId);
      return res.status(200).json({ transactions });
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }
  @Get('topUser')
  async topUser(@Req() req: any, @Res() res: any) {
    try {
      const topUser = await this.transactionService.topUser();
      return res.status(200).json({ topUser });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
}
