// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module'; // Import AuthModule
import { AdminModule } from './admin/admin.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    CartModule,
    OrderModule,
    ProductModule,
    PrismaModule,
    ProfileModule,
  ], // Import AuthModule that depends on PrismaService
  controllers: [],
  providers: [],
})
export class AppModule {}
