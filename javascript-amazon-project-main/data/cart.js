export let cart= JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
      saveToStorage();
  }

export function removeFromCart(productId){
    cart=cart.filter((cartItem) => {
       return cartItem.productId !== productId;
    })
    saveToStorage();
}