import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KioskStoreService } from '../kiosk-store';
import { CartItemRowComponent } from '../cart-item-row/cart-item-row';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CartItemRowComponent],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  private store = inject(KioskStoreService);

  public cartItems = this.store.cart;
  public totalCost = this.store.totalPrice;

  onQuantityChange(event: { itemId: number; change: number }) {
    this.store.updateQuantity(event.itemId, event.change);
  }

  onItemRemove(itemId: number) {
    this.store.removeFromCart(itemId);
  }

  onClearCart() {
    this.store.clearCart();
  }

  onCheckout() {
    alert('Mathematical! Your adventure gear has been prepared!');
    this.store.clearCart();
  }
}
