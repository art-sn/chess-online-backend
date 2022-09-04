import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsNumber, Length } from 'class-validator';

export class MovementDTO {
  @IsDefined()
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  from: [number, number];

  @IsDefined()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  to: [number, number];
}
