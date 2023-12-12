import { CreateHeroDto } from './create-hero.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateHeroDto extends PartialType(CreateHeroDto) {}
