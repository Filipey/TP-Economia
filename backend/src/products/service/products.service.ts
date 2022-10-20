import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from 'src/models/dtos/CreateProductDTO';
import { Product } from 'src/models/entities/Product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProduct(productID: number) {
    return await this.productRepository.findOneBy({ id: productID });
  }

  createProduct(userCpf: string, product: ProductDTO) {
    const createProductQuery = `INSERT INTO produto(nome, marca, valor, estoque) VALUES ('${product.name}', '${product.brand}', ${product.value}, ${product.inventory});`;
    const registerOwnerQuery = `INSERT INTO cadastra(SELECT currval(pg_get_serial_sequence('produto', 'id')), '${userCpf}')`;

    this.productRepository.query(createProductQuery);
    return this.productRepository.query(registerOwnerQuery);
  }

  updateProduct(productID: number, productUpdated: ProductDTO) {
    const updateQuery = `UPDATE produto SET nome = '${productUpdated.name}', marca = '${productUpdated.brand}', valor = ${productUpdated.value}, estoque = ${productUpdated.inventory}  WHERE id = ${productID}`;
    return this.productRepository.query(updateQuery);
  }

  async deleteProduct(productID: number) {
    return await this.productRepository.delete(productID);
  }

  async getUserLastProducts(userCpf: string) {
    const query = `SELECT * FROM produto WHERE produto.id in (SELECT id_produto FROM cadastra WHERE cpf_gerente = '${userCpf}') ORDER BY id DESC LIMIT 5`;
    const products: Product[] = await this.productRepository.query(query);

    return products;
  }

  async getProductsForChart(userCpf: string) {
    const query = `SELECT * FROM produto WHERE produto.id in (SELECT id_produto FROM cadastra WHERE cpf_gerente = '${userCpf}') ORDER BY id ASC LIMIT 10`;
    const products: Product[] = await this.productRepository.query(query);

    return products;
  }
}
