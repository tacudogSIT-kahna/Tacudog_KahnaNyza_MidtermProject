import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../services/kiosk-store';

@Component({
  selector: 'app-cart-item-row',
  standalone: true,
  templateUrl: './cart-item-row.html',
  styleUrls: ['./cart-item-row.css']
})
export class CartItemRowComponent {
  @Input({ required: true }) item!: CartItem;
  
  @Output() updateQty = new EventEmitter<{ itemId: number; change: number }>();
  @Output() removeItem = new EventEmitter<number>();

  handleQuantityChange(amount: number) {
    this.updateQty.emit({ itemId: this.item.id, change: amount });
  }

  handleRemoval() {
    this.removeItem.emit(this.item.id);
  }
}
