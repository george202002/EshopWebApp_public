export interface NewOrderDto {
  userId: number;
  items: { itemId: number, quantity: number }[];
  totalOrderCost: number;
  orderDate: Date;
}
