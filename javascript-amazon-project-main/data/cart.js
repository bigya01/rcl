export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

function saveToStorage(cart){
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
      console.log(cart);
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
