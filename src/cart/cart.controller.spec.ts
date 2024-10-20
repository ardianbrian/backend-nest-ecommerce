import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

const mockCartService = {
  create: jest.fn(),
  addCartItem: jest.fn(),
  updateCartItem: jest.fn(),
  findCart: jest.fn(),
  removeCartItem: jest.fn(),
};

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a cart', async () => {
      const mockCart = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        cartItems: [],
      };
      mockCartService.create.mockResolvedValue(mockCart);

      const result = await controller.create({ userId: 1 });
      expect(result).toEqual(mockCart);
      expect(service.create).toHaveBeenCalledWith({ userId: 1 });
    });
  });

  describe('addCartItem', () => {
    it('should add an item to the cart', async () => {
      const mockCartItem = { id: 1, cartId: 1, productId: 1, quantity: 2 };
      mockCartService.addCartItem.mockResolvedValue(mockCartItem);

      const result = await controller.addItem(1, {
        productId: 1,
        quantity: 2,
      });
      expect(result).toEqual(mockCartItem);
      expect(service.addCartItem).toHaveBeenCalledWith(1, {
        productId: 1,
        quantity: 2,
      });
    });
  });

  describe('updateCartItem', () => {
    it('should update an item in the cart', async () => {
      const mockUpdatedItem = { id: 1, cartId: 1, productId: 1, quantity: 5 };
      mockCartService.updateCartItem.mockResolvedValue(mockUpdatedItem);

      const result = await controller.updateItem(1, { id: 1, quantity: 5 }); // Sertakan id
      expect(result).toEqual(mockUpdatedItem);
      expect(service.updateCartItem).toHaveBeenCalledWith(1, {
        id: 1,
        quantity: 5,
      });
    });
  });

  describe('findCart', () => {
    it('should return a cart with items', async () => {
      const mockCart = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        cartItems: [
          { id: 1, productId: 1, quantity: 2, cartId: 1 },
          { id: 2, productId: 2, quantity: 1, cartId: 1 },
        ],
      };
      mockCartService.findCart.mockResolvedValue(mockCart);

      const result = await controller.findCart(1);
      expect(result).toEqual(mockCart);
      expect(service.findCart).toHaveBeenCalledWith(1);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the cart', async () => {
      const mockCartItem = { id: 1, cartId: 1, productId: 1, quantity: 2 };
      mockCartService.removeCartItem.mockResolvedValue(mockCartItem);

      const result = await controller.removeItem(1, 1);
      expect(result).toEqual(mockCartItem);
      expect(service.removeCartItem).toHaveBeenCalledWith(1, 1);
    });
  });
});
