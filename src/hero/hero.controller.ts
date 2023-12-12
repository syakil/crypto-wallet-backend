import {
  Controller,
  Get,
  Res,
  Post,
  Req,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { ResponseHelper } from 'src/common/response.helper';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroService } from './hero.service';
@Controller('hero')
export class HeroController {
  constructor(private heroService: HeroService) {}
  @Get('index')
  index(@Res() res) {
    res.json(this.heroService.findAll());
  }
  @Get(':id')
  show(@Param() param, @Res() res) {
    const hero = this.heroService
      .findAll()
      .filter((hero) => hero.id === +param.id);
    res.json(ResponseHelper.success(hero[0], 'Success get hero'));
  }
  @Get('create')
  create(@Res({ passthrough: true }) res) {
    res.cookie('name', 'john');
    return 'This action returns a hero';
  }
  @Post('store')
  store(@Req() req, @Body() createHeroDto: CreateHeroDto, @Res() res) {
    const { id, name } = req.body;
    this.heroService.create({ id, name });
    res.json(ResponseHelper.success(req.body, 'Success create hero'));
  }
  @Put(':id')
  update(@Param() param, @Res() res, @Body() updateHeroDto: UpdateHeroDto) {
    this.heroService.findAll().filter((hero) => {
      if (hero.id === +param.id) {
        hero.name = updateHeroDto.name;
        return res.json(ResponseHelper.success(hero, 'Success update hero'));
      }
    });
  }
}
