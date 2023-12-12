import {IsNumber, IsOptional, IsString} from 'class-validator';

export class TransactionDto {
  @IsString()
  @IsOptional()
  userId: string | null;
  @IsString()
  @IsOptional()
  transactionType: string | null;
  @IsNumber()
  @IsOptional()
  amount: number;
  @IsString()
  @IsOptional()
  receiveId: string | null;
}
