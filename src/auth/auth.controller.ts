import {Body, Controller, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/aut.dto';
import { ResponseHelper } from '../common/response.helper';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: AuthDto, @Res() res) {
    try {
      const data = await this.authService.login(dto);
      return res
        .status(200)
        .json(ResponseHelper.success(data, 'Login success'));
    } catch (e) {
      return res.status(401).json(ResponseHelper.error(e.message, 401));
    }
  }
  // @Post('logout')
  // async logout(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     // Depending on your authentication strategy, you may clear the token or perform other actions
  //     // For example, if using JWT, you might invalidate the token on the server or on the client side.
  //
  //     // Here, I'm assuming a method like clearToken is available in your authService
  //     // await this.authService.cl(req.headers.authorization);
  //     // await this.authService.clearToken(req.headers.authorization);
  //     return res.status(200).json(ResponseHelper.success(null, 'Logout success'));
  //   } catch (e) {
  //     return res.status(500).json(ResponseHelper.error(e.message, 500));
  //   }
  // }

  // async clearToken(token: string): Promise<void> {
  //   // Implement your logic to clear or invalidate the token
  //   const index = this.loggedInUsers.indexOf(token);
  //   if (index !== -1) {
  //     this.loggedInUsers.splice(index, 1);
  //   }
  // }
}
