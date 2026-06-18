import { Injectable, signal, computed } from '@angular/core';

export interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'Potions' | 'Weapons' | 'Enchanted Clothing';
  imageUrl: string;
  isRare?: boolean;
}

export interface CartItem extends ShopItem {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class KioskStoreService {
  private itemsState = signal<ShopItem[]>([
    { id: 1, name: 'Freezing Potion', description: 'Instantly flash-freezes targets or liquid surfaces on contact.', price: 150, category: 'Potions', imageUrl: 'freezing-potion.png' },
    { id: 2, name: 'Instant Bath Serum', description: 'Cleanses off grime, mud, and monster scents in a quick bubble snap.', price: 80, category: 'Potions', imageUrl: 'instant-bath-serum.png' },
    { id: 3, name: 'Paralyzing Potion', description: 'Fizzes intensely, temporarily freezing motor muscles on impact.', price: 450, category: 'Potions', imageUrl: 'paralyzing-potion.png' },
    { id: 4, name: 'Stone Skin Potion', description: 'Hardens your epidermis into crystal granite structure to absorb heavy attacks.', price: 700, category: 'Potions', imageUrl: 'stone-skin-potion.png', isRare: true },
    { id: 5, name: 'Twinkling Eye Potion', description: 'Illuminates dark caves and reveals hidden traps or invisible objects.', price: 950, category: 'Potions', imageUrl: 'twinkling-eye-potion.png' },
    { id: 16, name: 'Unfreezing Potion', description: 'Melts ice structures immediately and restores warmth to frostbitten limbs.', price: 200, category: 'Potions', imageUrl: 'unfreezing-potion.png' },

    { id: 6, name: 'Axe Bass', description: 'Marceline’s deadly family heirloom bass guitar modified into a battle axe.', price: 3200, category: 'Weapons', imageUrl: 'axe-bass.png', isRare: true },
    { id: 7, name: 'Demon Blood Sword', description: 'Forged from true demon blood by Joshua. Feels rugged and dangerously cold.', price: 2500, category: 'Weapons', imageUrl: 'demon-blood-sword.png', isRare: true },
    { id: 8, name: 'Finn’s Sword', description: 'Finn’s trusted, well-chipped classic golden blade with a black hilt.', price: 300, category: 'Weapons', imageUrl: 'finns-sword.png', isRare: true }, // ADDED RARE STATUS
    { id: 9, name: 'Grass Sword', description: 'A cursed, bound blade of grass that integrates directly onto your arm.', price: 1800, category: 'Weapons', imageUrl: 'grass-sword.png', isRare: true }, // ADDED RARE STATUS
    { id: 10, name: 'Root Sword', description: 'A unique natural wood blade with an incredibly sharp, twisted root grip.', price: 500, category: 'Weapons', imageUrl: 'root-sword.png' },
    { id: 17, name: 'Sound Sword', description: 'Projects powerful destructive golden shockwaves of pure sonic energy.', price: 1500, category: 'Weapons', imageUrl: 'sound-sword.png' },    

    { id: 6, name: 'Axe Bass', description: 'Marceline’s deadly family heirloom bass guitar modified into a battle axe.', price: 3200, category: 'Weapons', imageUrl: 'axe-bass.png', isRare: true },
    { id: 7, name: 'Demon Blood Sword', description: 'Forged from true demon blood by Joshua. Feels rugged and dangerously cold.', price: 2500, category: 'Weapons', imageUrl: 'demon-blood-sword.png', isRare: true },
    { id: 8, name: 'Finn’s Sword', description: 'Finn’s trusted, well-chipped classic golden blade with a black hilt.', price: 300, category: 'Weapons', imageUrl: 'finns-sword.png', isRare: true }, // ADDED RARE STATUS
    { id: 9, name: 'Grass Sword', description: 'A cursed, bound blade of grass that integrates directly onto your arm.', price: 1800, category: 'Weapons', imageUrl: 'grass-sword.png', isRare: true }, // ADDED RARE STATUS
    { id: 10, name: 'Root Sword', description: 'A unique natural wood blade with an incredibly sharp, twisted root grip.', price: 500, category: 'Weapons', imageUrl: 'root-sword.png' },
    { id: 17, name: 'Sound Sword', description: 'Projects powerful destructive golden shockwaves of pure sonic energy.', price: 1500, category: 'Weapons', imageUrl: 'sound-sword.png' },    
  ]);

  private cartState = signal<CartItem[]>([]);
  public activeCategory = signal<string>('All');

  public products = this.itemsState.asReadonly();
  public cart = this.cartState.asReadonly();

  public cartCount = computed(() => this.cartState().reduce((acc, item) => acc + item.quantity, 0));
  public totalPrice = computed(() => this.cartState().reduce((acc, item) => acc + (item.price * item.quantity), 0));

  setCategory(category: string) {
    this.activeCategory.set(category);
  }

  addToCart(item: ShopItem) {
    const currentCart = this.cartState();
    const existingIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
    if (existingIndex > -1) {
      const updatedCart = [...currentCart];
      updatedCart[existingIndex] = { ...updatedCart[existingIndex], quantity: updatedCart[existingIndex].quantity + 1 };
      this.cartState.set(updatedCart);
    } else {
      this.cartState.set([...currentCart, { ...item, quantity: 1 }]);
    }
  }

  updateQuantity(itemId: number, amount: number) {
    const updatedCart = this.cartState().map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter((item): item is CartItem => item !== null);
    this.cartState.set(updatedCart);
  }

  removeFromCart(itemId: number) {
    this.cartState.update(cart => cart.filter(item => item.id !== itemId));
  }

  clearCart() {
    this.cartState.set([]);
  }
}
