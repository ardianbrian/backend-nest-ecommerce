import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartService.create(createCartDto);
  }

  @Post(':cartId/items')
  async addItem(
    @Param('cartId') cartId: number,
    @Body() addCartItemDto: AddCartItemDto,
  ): Promise<CartItem> {
    return this.cartService.addCartItem(cartId, addCartItemDto);
  }

  @Put(':cartId/items')
  async updateItem(
    @Param('cartId') cartId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    return this.cartService.updateCartItem(cartId, updateCartItemDto);
  }

  @Get(':cartId')
  async findCart(@Param('cartId') cartId: number): Promise<Cart> {
    return this.cartService.findCart(cartId);
  }

  @Delete(':cartId/items/:itemId')
  async removeItem(
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
  ): Promise<CartItem> {
    return this.cartService.removeCartItem(cartId, itemId);
  }
}
