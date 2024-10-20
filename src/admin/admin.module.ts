import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller'; // Product Controller
import { ProductService } from './services/product.service'; // Product Service
import { CategoryController } from './controllers/category.controller'; // Category Controller
import { CategoryService } from './services/category.service'; // Category Service
import { UserController } from './controllers/user.controller'; // User Controller
import { UserService } from './services/user.service'; // User Service
import { AuthModule } from '../auth/auth.module'; // Auth Module
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [
    ProductController,
    CategoryController,
    UserController,
    OrderController,
  ],
  providers: [ProductService, CategoryService, UserService, OrderService],
})
export class AdminModule {}
