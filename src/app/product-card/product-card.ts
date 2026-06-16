import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopItem } from '../services/kiosk-store';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCardComponent {
  @Input({ required: true }) item!: ShopItem;
  @Output() addToPouch = new EventEmitter<ShopItem>();

  onAddClick() {
    this.addToPouch.emit(this.item);
  }
}
