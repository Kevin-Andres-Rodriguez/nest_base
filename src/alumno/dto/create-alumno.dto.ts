/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  nombre: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  edad: number;

  @IsString()
  materia: string;

  @IsString()
  cedula: string;
}
