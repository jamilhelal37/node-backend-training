import {Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {
    ProductsService,
    type Product,
} from './products.service.js';
import {CreateProductDto} from "./dto/create-product.dto.js";
import {UpdateProductDto} from "./dto/update-product.dto.js";

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ) {}

    @Get()
    findAll(): Product[] {
        return this.productsService.findAll();
    }
    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number) :Product {
        return this.productsService.findOne(id);
    }
    @Post()
    create(@Body() data: CreateProductDto) {
        return this.productsService.create(data);
    }
    @Put(':id')
    update(@Param('id',ParseIntPipe) id:number, @Body() data: UpdateProductDto) {
        return this.productsService.update(id, data);
    }
    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id',ParseIntPipe) id:number) {
       this.productsService.delete(id);
    }
}