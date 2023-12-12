import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/aut.dto';
import { ResponseHelper } from '../common/response.helper';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() dto: AuthDto, @Res() res) {
    try {
      const data = await this.authService.login(dto);
      return res.status(200).json({ token: data.access_token });
    } catch (e) {
      return res.status(401).json(ResponseHelper.error(e.message, 401));
    }
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    try {
      return res
        .status(200)
        .json({ token: await this.userService.register(createUserDto) });
    } catch (e) {
      return res.status(401).json(ResponseHelper.error(e.message, 401));
    }
  }
}
