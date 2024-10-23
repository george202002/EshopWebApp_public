export interface Statistics {
  totalOrders: number;
  totalRevenue: number;
  mostSoldProduct: {
    name: string;
    quantity: number;
  };
  topCustomer: {
    name: string;
    totalOrders: number;
  };
}
