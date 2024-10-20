// src/product/entities/product.entity.ts

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string; // Optional field
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
