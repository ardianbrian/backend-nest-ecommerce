import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

// Correcting the mock methods
const mockOrderService = {
  createOrder: jest.fn(), // Change 'create' to 'createOrder'
  getOrderHistory: jest.fn(),
  findAll: jest.fn(),
};

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const createOrderDto: CreateOrderDto = {
        userId: 1,
        totalPrice: 100,
        orderItems: [{ productId: 1, quantity: 2, price: 50 }],
      };
      // Mock the resolved value to return an Order object instead of CreateOrderDto
      const createdOrder: Order = {
        id: 1,
        userId: 1,
        totalPrice: 100,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        orderItems: [],
      };

      // Adjust the mock implementation
      mockOrderService.createOrder.mockResolvedValue(createdOrder);

      const result = await controller.createOrder(createOrderDto);
      expect(result).toEqual(createdOrder);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(createOrderDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const result = [{ id: 1, userId: 1, totalPrice: 100, status: 'pending' }];
      mockOrderService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(mockOrderService.findAll).toHaveBeenCalled();
    });
  });
});
