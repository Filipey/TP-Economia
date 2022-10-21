import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDTO } from 'src/models/dtos/CreateProductDTO';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('/id/:id')
  getById(@Param('id') id: number) {
    return this.productService.getProduct(id);
  }

  @Get('/user/:userCpf')
  getUserLastProducts(@Param('userCpf') userCpf: string) {
    return this.productService.getUserLastProducts(userCpf);
  }

  @Get('/user/:userCpf/charts/home')
  getProductsChartsData(@Param('userCpf') userCpf: string) {
    return this.productService.getProductsForChart(userCpf);
  }

  @Post('/user/:userCpf/productsLike')
  getProductsLike(
    @Body() productName: { nome: string },
    @Param('userCpf') userCpf: string,
  ) {
    return this.productService.getProductsLike(productName, userCpf);
  }

  @Post('/cpf/:userCpf')
  createNewProduct(@Param('userCpf') userCpf: string, @Body() dto: ProductDTO) {
    return this.productService.createProduct(userCpf, dto);
  }

  @Put('/id/:id')
  updateProduct(@Param('id') id: number, @Body() dto: ProductDTO) {
    return this.productService.updateProduct(id, dto);
  }

  @Delete('/id/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
