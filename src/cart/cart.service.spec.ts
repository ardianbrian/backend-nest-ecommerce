import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { PrismaService } from '../prisma/prisma.service'; // Pastikan Anda mengimpor PrismaService

const mockPrismaService = {
  cart: {
    create: jest.fn().mockImplementation((args) =>
      Promise.resolve({
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        cartItems: [],
        include: { cartItems: true },
        ...args.data, // Masukkan data dari argument untuk simulasi
      }),
    ),
    findUnique: jest.fn().mockImplementation((args) =>
      Promise.resolve({
        id: args.where.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        cartItems: [],
      }),
    ),
  },
  cartItem: {
    create: jest.fn().mockImplementation((args) =>
      Promise.resolve({
        id: 1,
        cartId: args.data.cart.connect.id,
        productId: args.data.product.connect.id,
        quantity: args.data.quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ),
    update: jest.fn().mockImplementation((args) =>
      Promise.resolve({
        id: args.where.id,
        cartId: 1,
        productId: 1,
        quantity: args.data.quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ),
    delete: jest.fn().mockImplementation((args) =>
      Promise.resolve({
        id: args.where.id,
        cartId: 1,
        productId: 1,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ),
  },
};

describe('CartService', () => {
  let service: CartService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cart', async () => {
      const result = await service.create({ userId: 1 });
      expect(result).toEqual({
        id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        cartItems: { create: [] },
        user: { connect: { id: 1 } },
        include: { cartItems: true }, // Tambahkan include sesuai hasil
      });
      expect(prisma.cart.create).toHaveBeenCalledWith({
        data: {
          user: { connect: { id: 1 } },
          cartItems: { create: [] }, // Pastikan ini di-capture
        },
        include: { cartItems: true }, // Tambahkan include sesuai dengan hasil Prisma
      });
    });
  });

  describe('addCartItem', () => {
    it('should add an item to the cart', async () => {
      const result = await service.addCartItem(1, {
        productId: 1,
        quantity: 2,
      });
      expect(result).toEqual({
        id: 1,
        cartId: 1,
        productId: 1,
        quantity: 2,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(prisma.cartItem.create).toHaveBeenCalledWith({
        data: {
          cart: { connect: { id: 1 } },
          product: { connect: { id: 1 } },
          quantity: 2,
        },
      });
    });
  });

  // Tambahkan test untuk method lainnya
});
