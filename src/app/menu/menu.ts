import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KioskStoreService, ShopItem } from '../kiosk-store';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  private store = inject(KioskStoreService);

  public products = this.store.products;

  onAddItem(item: ShopItem) {
    this.store.addToCart(item);
  }
}