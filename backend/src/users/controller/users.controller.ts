import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignInUserDTO } from 'src/models/dtos/SignInUserDTO';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('id/:cpf')
  getById(@Param('cpf') cpf: string) {
    return this.userService.findByCpf(cpf);
  }

  @Post('/crate')
  @UsePipes(ValidationPipe)
  createUser(@Body() dto: SignInUserDTO) {
    return this.userService.createUser(dto);
  }

  @Post('/login')
  login(@Body() dto: SignInUserDTO) {
    return this.userService.authUser(dto);
  }
}
