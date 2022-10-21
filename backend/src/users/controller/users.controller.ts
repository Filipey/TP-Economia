import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MonitoringDTO } from 'src/models/dtos/MonitoringDTO';
import { ReportDTO } from 'src/models/dtos/ReportDTO';
import { SignInUserDTO } from 'src/models/dtos/SignInUserDTO';
import { SignUpUserDTO } from 'src/models/dtos/SignUpUserDTO';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/id/:cpf')
  getById(@Param('cpf') cpf: string) {
    return this.userService.findByCpf(cpf);
  }

  @Get('/monitoring/products/:cpf')
  getUserMonitoringProducts(@Param('cpf') cpf: string) {
    return this.userService.getUserMonitoringProducts(cpf);
  }

  @Get('/monitoring/products/count/:cpf')
  countUserMonitoringProducts(@Param('cpf') cpf: string) {
    return this.userService.countUserMonitoringProducts(cpf);
  }

  @Get('/products/:cpf')
  getUserProducts(@Param('cpf') cpf: string) {
    return this.userService.getUserProducts(cpf);
  }

  @Get('/products/count/:cpf')
  countUserProducts(@Param('cpf') cpf: string) {
    return this.userService.countUserProducts(cpf);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createUser(@Body() dto: SignUpUserDTO) {
    return this.userService.createUser(dto);
  }

  @Post('/login')
  login(@Body() dto: SignInUserDTO) {
    return this.userService.authUser(dto);
  }

  @Post('/monitoring/new')
  createNewMonitoring(@Body() dto: MonitoringDTO) {
    return this.userService.insertNewMonitoringUser(dto);
  }

  @Post('/monitoring/report/new')
  createNewReport(@Body() dto: ReportDTO) {
    return this.userService.insertReport(dto);
  }
}
