package org.example.eshopbackend.server.api.admins;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatisticsDTO {
    private long totalOrders;
    private double totalRevenue;
    private ProductDTO mostSoldProduct;
    private CustomerDTO topCustomer;

    public StatisticsDTO(long totalOrders, double totalRevenue, ProductDTO mostSoldProduct, CustomerDTO topCustomer) {
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
        this.mostSoldProduct = mostSoldProduct;
        this.topCustomer = topCustomer;
    }
}



