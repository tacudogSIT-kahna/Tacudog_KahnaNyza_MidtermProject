import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KioskStoreService, ShopItem } from '../kiosk-store';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent {
  private store = inject(KioskStoreService);

  public products = this.store.products;

  onAddItem(item: ShopItem) {
    this.store.addToCart(item);
  }
}
