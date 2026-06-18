import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { KioskStoreService, ShopItem } from '../services/kiosk-store';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent implements AfterViewInit {
  public store = inject(KioskStoreService);
  private router = inject(Router);

  public currentCategory = this.store.activeCategory;
  public products = this.store.products;

  ngAfterViewInit() {
    const category = this.currentCategory();
    if (category && category !== 'All') {
      setTimeout(() => {
        const element = document.getElementById(category);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }

  onAddItem(item: ShopItem) {
    this.store.addToCart(item);
  }

  navigateToPouch() {
    this.router.navigate(['/cart']);
  }
}
