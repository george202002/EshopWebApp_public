import { OrderItemDTO } from "./orderItem";

export interface OrderDTO {
  orderId: number;
  userId: number;
  items: OrderItemDTO[];
  totalOrderCost: number;
  orderDate: Date;
}
