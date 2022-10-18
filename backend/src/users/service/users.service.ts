/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInUserDTO } from 'src/models/dtos/SignInUserDTO';
import { User } from 'src/models/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(dto: SignInUserDTO) {
    const newUser = this.userRepository.create(dto);
    this.userRepository.query(
      `INSERT INTO login(cpf, senha) VALUES('${dto.cpf}', '${dto.password}')`,
    );
    return this.userRepository.save(newUser);
  }

  async findByCpf(cpf: string) {
    const user = await this.userRepository.findOne({ where: { cpf: cpf } });
    return user;
  }

  async authUser(dto: SignInUserDTO) {
    const authUser = await this.userRepository.query(
      `SELECT g.cpf, g.nome, g.telefone, g.email FROM gerente g, login l WHERE g.cpf = '${dto.cpf}' AND l.cpf = '${dto.cpf}' AND l.senha = '${dto.password}' `,
    );
    return authUser;
  }
}
