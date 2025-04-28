class Cart {
            cartItems;
            localStorageKey ;

            constructor (localStorageKey){
                this.localStorageKey = localStorageKey;
                this.loadFromStorage();
            }


            loadFromStorage () {
                this.cartItems = JSON.parse(localStorage.getItem("this.localStorageKey")) || [];
              }
            
              saveToStorage () {
                localStorage.setItem("this.localStorageKey", JSON.stringify(this.cartItems));
              }
            
              addToCart (productId) {
                let matchingItem;
                this.cartItems.forEach((cartItem) => {
                  if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                  }
                });
                if (matchingItem) {
                  matchingItem.quantity += 1;
                } else {
                  this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: "1",
                  });
                }
                this.saveToStorage();
              }
             removeFromCart(productId) {
                this.cartItems = this.cartItems.filter((cartItem) => {
                  return cartItem.productId !== productId;
                });
                this.saveToStorage();
              }
            updateDeliveryOption (productId, deliveryOptionId) {
                let matchingItem;
                this.cartItems.forEach((cartItem) => {
                  if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                  }
                });
              
                matchingItem.deliveryOptionId = deliveryOptionId;
              
                this.saveToStorage();
              }
            
            }





const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');




cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart)
console.log(businessCart)
console.log(businessCart instanceof Cart)


