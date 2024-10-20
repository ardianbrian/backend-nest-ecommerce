import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  description: 'Test Description',
  price: 100,
  categoryId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockProduct]),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            create: jest.fn().mockResolvedValue(mockProduct),
            update: jest.fn().mockResolvedValue(mockProduct),
            remove: jest.fn().mockResolvedValue(mockProduct),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await controller.findAll();
    expect(products).toEqual([mockProduct]);
  });

  it('should return a single product by ID', async () => {
    const product = await controller.findOne('1'); // Pass ID as string
    expect(product).toEqual(mockProduct);
  });

  it('should create a new product', async () => {
    const createProductDto: CreateProductDto = {
      name: 'New Product',
      description: 'New Description',
      price: 200,
      categoryId: 1,
    };
    const createdProduct = await controller.create(createProductDto);
    expect(createdProduct).toEqual(mockProduct);
  });

  it('should update a product', async () => {
    const updatedProduct = await controller.update('1', {
      name: 'Updated Product',
      price: 150,
    });
    expect(updatedProduct).toEqual(mockProduct);
  });

  it('should delete a product', async () => {
    const deletedProduct = await controller.remove('1'); // Pass ID as string
    expect(deletedProduct).toEqual(mockProduct);
  });
});
