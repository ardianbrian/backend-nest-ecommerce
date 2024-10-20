import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

// Mocking OrderService
const mockOrderService = {
  createOrder: jest.fn(),
  getOrderHistory: jest.fn(),
  findAll: jest.fn(),
};

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const createOrderDto: CreateOrderDto = {
        userId: 1,
        totalPrice: 100,
        orderItems: [
          {
            productId: 1,
            quantity: 2,
            price: 50,
          },
        ],
      };

      const createdOrder: Order = {
        id: 1,
        userId: 1,
        totalPrice: 100,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        orderItems: [], // You can mock orderItems if needed
      };

      mockOrderService.createOrder.mockResolvedValue(createdOrder);

      const result = await orderController.createOrder(createOrderDto);
      expect(result).toEqual(createdOrder);
      expect(orderService.createOrder).toHaveBeenCalledWith(createOrderDto);
    });
  });

  describe('getOrderHistory', () => {
    it('should return an array of orders', async () => {
      const userId = 1; // Specify user ID for testing
      const orderHistory: Order[] = [
        {
          id: 1,
          userId: userId,
          totalPrice: 100,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
          orderItems: [], // You can mock orderItems if needed
        },
      ];

      mockOrderService.getOrderHistory.mockResolvedValue(orderHistory);

      const result = await orderController.getOrderHistory(userId);
      expect(result).toEqual(orderHistory);
      expect(orderService.getOrderHistory).toHaveBeenCalledWith(userId);
    });
  });
});
