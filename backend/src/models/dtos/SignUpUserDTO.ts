/* eslint-disable prettier/prettier */

import { IsNotEmpty, MinLength } from 'class-validator';

export class SignUpUserDTO {
  @IsNotEmpty()
  @MinLength(11)
  cpf: string;

  name: string;

  telephone: string;

  email: string;

  password: string;
}
