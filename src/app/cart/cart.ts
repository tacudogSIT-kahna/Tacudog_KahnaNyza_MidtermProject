import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KioskStoreService } from '../services/kiosk-store';
import { CartItemRowComponent } from '../cart-item-row/cart-item-row';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemRowComponent],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  private storeService = inject(KioskStoreService);

  public cartItems = this.storeService.cart;
  public totalCost = this.storeService.totalPrice;

  onCheckout() {
    alert('🛒 Order placed successfully! Safe travels in the Land of Ooo!');
    this.storeService.clearCart();
  }

  onClearCart() {
    this.storeService.clearCart();
  }

  onQuantityChange(event: { itemId: number; change: number }) {
    this.storeService.updateQuantity(event.itemId, event.change);
  }

  onItemRemove(itemId: number) {
    this.storeService.removeFromCart(itemId);
  }
}
