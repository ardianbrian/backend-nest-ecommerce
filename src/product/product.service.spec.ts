import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  description: 'Test Description',
  price: 100,
  categoryId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findMany: jest.fn().mockResolvedValue([mockProduct]),
              findUnique: jest.fn().mockResolvedValue(mockProduct),
              create: jest.fn().mockResolvedValue(mockProduct),
              update: jest.fn().mockResolvedValue(mockProduct),
              delete: jest.fn().mockResolvedValue(mockProduct),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.findAll();
    expect(products).toEqual([mockProduct]);
  });

  it('should return a single product by ID', async () => {
    const product = await service.findOne(1);
    expect(product).toEqual(mockProduct);
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'New Product',
      description: 'New Description',
      price: 200,
      categoryId: 1,
    };
    const createdProduct = await service.create(newProduct);
    expect(createdProduct).toEqual(mockProduct);
  });

  it('should update a product', async () => {
    const updatedProduct = await service.update(1, {
      name: 'Updated Product',
      price: 150,
    });
    expect(updatedProduct).toEqual(mockProduct);
  });

  it('should delete a product', async () => {
    const deletedProduct = await service.remove(1);
    expect(deletedProduct).toEqual(mockProduct);
  });
});
