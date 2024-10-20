export class GetCartDto {
  id: number; // Cart ID
  userId?: number; // User ID (if associated)
  createdAt: Date; // Creation date
  updatedAt: Date; // Last updated date
  cartItems: Array<{
    productId: number; // ID of the product
    quantity: number; // Quantity of the product in the cart
  }>;
}
