import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  startAddress: string;

  @IsString()
  @IsNotEmpty()
  destinationAddress: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;
}
