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
    { id: 1, name: 'Lumpy Space Serum', description: 'Gives your body a fresh, floating, sassy posture.', price: 150, category: 'Potions', imageUrl: '🟣' },
    { id: 2, name: 'Marceline’s Red Brew', description: 'Freshly drained strawberry shade juice. Highly refreshing.', price: 80, category: 'Potions', imageUrl: '🧃' },
    { id: 3, name: 'Flame Core Elixir', description: 'Provides temporary total protection against Fire Kingdom heat.', price: 450, category: 'Potions', imageUrl: '🔥' },
    { id: 4, name: 'Nightosphere Juice', description: 'Extracted from Hunson Abadeer’s private, demonic reserves.', price: 700, category: 'Potions', imageUrl: '🧪', isRare: true },
    { id: 5, name: 'PB’s Zombie Serum', description: 'Candy reanimation formula. Use with extreme caution.', price: 950, category: 'Potions', imageUrl: '🟢' },
    { id: 6, name: 'Demon Blood Sword', description: 'Forged by Joshua. Feels rugged and dangerously cold.', price: 2500, category: 'Weapons', imageUrl: '🗡️', isRare: true },
    { id: 7, name: 'Scarlet (Golden Sword)', description: 'Finn’s trusted, well-chipped classic battle blade.', price: 300, category: 'Weapons', imageUrl: '⚔️' },
    { id: 8, name: 'The Grass Sword', description: 'A cursed, bound blade that integrates directly with your arm.', price: 1800, category: 'Weapons', imageUrl: '🌱' },
    { id: 9, name: 'Marceline’s Axe Bass', description: 'Family heirloom modified into a rockin’ weapon.', price: 3200, category: 'Weapons', imageUrl: '🎸', isRare: true },
    { id: 10, name: 'Jake’s Spiked Mace', description: 'Formed directly from Jake’s shape-shifted magical fist.', price: 600, category: 'Weapons', imageUrl: '🔨' },
    { id: 11, name: 'The Ice King’s Crown', description: 'Grants infinite frost magic at the cost of your sanity.', price: 9999, category: 'Enchanted Clothing', imageUrl: '👑', isRare: true },
    { id: 12, name: 'Finn’s Bear Hat', description: 'Infuses the wearer with pure, righteous heroic fortitude.', price: 150, category: 'Enchanted Clothing', imageUrl: '🐻' },
    { id: 13, name: 'Wizard City Robes', description: 'Standard initiates garb embedded with basic defense runes.', price: 400, category: 'Enchanted Clothing', imageUrl: '🥋' },
    { id: 14, name: 'Marceline’s Sun Hat', description: 'Enchanted straw brim that blocks 100% of deadly UV light.', price: 250, category: 'Enchanted Clothing', imageUrl: '👒' },
    { id: 15, name: 'Candy Royal Cape', description: 'Worn by Princess Bubblegum’s inner guard. Very pristine.', price: 800, category: 'Enchanted Clothing', imageUrl: '🧣' }
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
