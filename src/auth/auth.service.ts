import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/aut.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import {Request} from "express";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(dto: AuthDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return {
        ...result,
        access_token: await this.jwtService.signAsync(
          { id: user.id },
          { expiresIn: '1 days', secret: jwtConstants.secret },
        ),
      };
    } else {
      throw new Error('Unauthorized');
    }
  }
  async getUserIdFromToken(token: string): Promise<string | null> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // Extract user ID from the decoded token
      return decoded['id'];
    } catch (error) {
      // Handle invalid or expired token
      return null;
    }
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
