import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { MenuComponent } from './menu/menu';
import { CartComponent } from './cart/cart';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' }
];
