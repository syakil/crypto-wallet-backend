import { Injectable } from '@nestjs/common';
import { Hero } from './interface/hero.interface';

@Injectable()
export class HeroService {
  private readonly heroes: Hero[] = [
    {
      id: 1,
      name: 'john',
    },
    {
      id: 2,
      name: 'doe',
    },
  ];
  create(hero: Hero) {
    this.heroes.push(hero);
  }
  findAll(): Hero[] {
    return this.heroes;
  }
}
