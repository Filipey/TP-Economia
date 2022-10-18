/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';

@Entity({ name: 'gerente' })
export class User {
  @Column({ primary: true, name: 'cpf' })
  cpf: string;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'telefone' })
  telephone: string;

  @Column({ name: 'email' })
  email: string;
}
