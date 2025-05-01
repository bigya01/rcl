
export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

function saveToStorage(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId,selectorQuantity) {
    let matchingItem;
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      if (matchingItem) {
        matchingItem.quantity += selectorQuantity;
      } else {
        cart.push({
          productId: productId,
          quantity: selectorQuantity,
          deliveryOptionId: "1",
        });
      }
      saveToStorage(cart);
  }

export function removeFromCart(productId){
    cart=cart.filter((cartItem) => {
       return cartItem.productId !== productId;
    })
    saveToStorage(cart);
}
export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });


      matchingItem.deliveryOptionId = deliveryOptionId;


      saveToStorage(cart);
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  })



  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export function calculateCartQuantity(){
  let cartQuantity=0
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  saveToStorage(cart);
}