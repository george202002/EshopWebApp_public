import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { authGuard } from './auth.guard';
import { RedirectComponent } from './redirect/redirect.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './admin.guard';
import { EditItemComponent } from './edit-item/edit-item.component';
import { EditItemsComponent } from './edit-items/edit-items.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { StatisticsComponent } from './statistics/statistics.component';



const routes: Routes = [
  { path: '', component: RedirectComponent, pathMatch: 'full' }, // Use RedirectComponent for root path
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'profile', component: HomeComponent, canActivate: [authGuard] },
  { path: 'account', component: AccountComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin/add-item', component: AddItemComponent, canActivate: [AdminGuard] },
  { path: 'admin/edit-items', component: EditItemsComponent, canActivate: [AdminGuard] },
  { path: 'admin/edit-item/:id', component: EditItemComponent, canActivate: [AdminGuard] },
  { path: 'admin/statistics', component: StatisticsComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
