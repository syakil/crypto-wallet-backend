import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Res, UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ResponseHelper} from "../common/response.helper";
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      const data = await this.userService.register(createUserDto);
      return res.json(
        ResponseHelper.success(data, 'User created successfully'),
      );
    } catch (e) {
      return res.status(500).json(ResponseHelper.error(e.message, e.code));
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() param) {
    const data = await this.userService.findById(param.id);
    if (!data) {
      return ResponseHelper.notFound('User not found');
    } else {
      return ResponseHelper.success(data);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
