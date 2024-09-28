
import { writable } from 'svelte/store';


interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}


const cart = writable<CartItem[]>([]);


function addToCart(item: CartItem) {
  cart.update(items => {
    const index = items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      items[index].quantity += item.quantity;
    } else {
      items = [...items, item];
    }
    return items;
  });
}


function removeFromCart(id: string) {
  cart.update(items => items.filter(item => item.id !== id));
}


function getTotal() {
  let total = 0;
  cart.subscribe(items => {
    total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  })();
  return total;
}

export { cart, addToCart, removeFromCart, getTotal };
