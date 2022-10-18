/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'produto' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'marca' })
  brand: string;

  @Column({ name: 'valor' })
  value: number;

  @Column({ name: 'estoque' })
  inventory: number;
}
