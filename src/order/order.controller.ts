import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':userId')
  async getOrderHistory(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Order[]> {
    return this.orderService.getOrderHistory(userId);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }
}
