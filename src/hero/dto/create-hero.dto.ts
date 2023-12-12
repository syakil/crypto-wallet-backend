import { IsAlpha, IsNotEmpty, IsNumber} from "class-validator";

export class CreateHeroDto {
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsAlpha()
  name: string;
}
