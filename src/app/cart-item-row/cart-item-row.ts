import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../kiosk-store';

@Component({
  selector: 'app-cart-item-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item-row.component.html',
  styleUrls: ['./cart-item-row.component.css']
})
export class CartItemRowComponent {
  @Input({ required: true }) item!: CartItem;
  
  @Output() updateQty = new EventEmitter<{ itemId: number; change: number }>();
  @Output() removeItem = new EventEmitter<number>();

  onChangeQty(amount: number) {
    this.updateQty.emit({ itemId: this.item.id, change: amount });
  }

  onRemove() {
    this.removeItem.emit(this.item.id);
  }
}
