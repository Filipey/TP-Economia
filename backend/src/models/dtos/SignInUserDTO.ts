/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength } from 'class-validator';

export class SignInUserDTO {
  @IsNotEmpty()
  @MinLength(11)
  cpf: string;

  @IsNotEmpty()
  password: string;
}
