/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMonitoringResponseDTO } from 'src/models/dtos/ProductMonitoringResponseDTO';
import { SignInUserDTO } from 'src/models/dtos/SignInUserDTO';
import { SignUpUserDTO } from 'src/models/dtos/SignUpUserDTO';
import { Product } from 'src/models/entities/Product';
import { User } from 'src/models/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(dto: SignUpUserDTO) {
    const saveLoginQuery = `INSERT INTO login(cpf, senha) VALUES ('${dto.cpf}', '${dto.password}')`;
    const saveEnitityQuery = `INSERT INTO gerente(cpf, nome, telefone, email) VALUES ('${dto.cpf}', '${dto.name}', '${dto.telephone}', '${dto.email}')`;

    this.userRepository.query(saveEnitityQuery);
    return this.userRepository.query(saveLoginQuery);
  }

  async findByCpf(cpf: string) {
    const user = await this.userRepository.findOne({ where: { cpf: cpf } });
    return user;
  }

  async authUser(dto: SignInUserDTO) {
    const [authUser] = await this.userRepository.query(
      `SELECT g.cpf, g.nome, g.telefone, g.email FROM gerente g, login l WHERE g.cpf = '${dto.cpf}' AND l.cpf = '${dto.cpf}' AND l.senha = '${dto.password}' `,
    );
    return authUser;
  }

  async getUserProducts(cpf: string) {
    const query = `SELECT p.id, p.nome, p.marca, p.valor, p.estoque FROM produto p, cadastra c WHERE (c.id_produto, cpf_gerente) = (p.id, '${cpf}') ORDER BY p.nome`;
    const products: Product[] = await this.userRepository.query(query);
    return products;
  }

  async getUserMonitoringProducts(cpf: string) {
    const query = `SELECT p.id, p.nome, p.marca, p.valor, p.estoque, m.data_inicio, m.data_termino, m.expectativa_vendas, m.vendas_realizadas FROM produto p, monitora m WHERE (m.id_produto, cpf_gerente) = (p.id, '${cpf}')`;
    const products: ProductMonitoringResponseDTO[] =
      await this.userRepository.query(query);

    return products;
  }

  async countUserProducts(cpf: string) {
    const query = `SELECT COUNT(*) FROM produto p, cadastra c WHERE (c.id_produto, cpf_gerente) = (p.id, '${cpf}')`;
    const [countProducts] = await this.userRepository.query(query);
    return countProducts;
  }

  async countUserMonitoringProducts(cpf: string) {
    const query = `SELECT COUNT(*) FROM produto p, monitora m WHERE (m.id_produto, cpf_gerente) = (p.id, '${cpf}')`;
    const [countMonitoringProducts] = await this.userRepository.query(query);
    return countMonitoringProducts;
  }
}
