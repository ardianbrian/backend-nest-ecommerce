// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    return this.prisma.cart.create({
      data: {
        user: createCartDto.userId
          ? { connect: { id: createCartDto.userId } }
          : undefined,
        cartItems: { create: [] }, // Inisialisasi cartItems sebagai array kosong saat cart dibuat
      },
      include: {
        cartItems: true, // Pastikan untuk menyertakan relasi cartItems
      },
    });
  }

  async addCartItem(
    cartId: number,
    addCartItemDto: AddCartItemDto,
  ): Promise<CartItem> {
    return this.prisma.cartItem.create({
      data: {
        cart: { connect: { id: cartId } },
        product: { connect: { id: addCartItemDto.productId } },
        quantity: addCartItemDto.quantity,
      },
    });
  }

  async updateCartItem(
    cartId: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    return this.prisma.cartItem.update({
      where: { id: updateCartItemDto.id }, // Menggunakan id dari CartItem
      data: {
        quantity: updateCartItemDto.quantity,
      },
    });
  }

  async findCart(cartId: number): Promise<Cart> {
    return this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        cartItems: true, // Sertakan cartItems dalam hasil query
      },
    });
  }

  async removeCartItem(cartId: number, itemId: number): Promise<CartItem> {
    return this.prisma.cartItem.delete({
      where: { id: itemId },
    });
  }
}
