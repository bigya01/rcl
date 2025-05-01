import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart,calculateCartQuantity } from "../data/cart.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js'

export function updateCartQuantity() {
  let cartQuantity= calculateCartQuantity();
  updateCheckoutItems(cartQuantity);
  }

function updateCheckoutItems(checkoutQuantity){
  const checkoutItems= document.querySelector('.checkout-items');
  checkoutItems.innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${checkoutQuantity} items</a
          >)`; 

}


// using promises
// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   }),
// ]).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });



//same thing using async await
async function loadPage() {
  try{
    // throw 'error'; 
    await loadProductsFetch();
    const value = await new Promise((resolve,reject) => {
      loadCart(() => {
        // reject('error');
        resolve('value 3');
      });
    });
  }
  catch(err){
    console.log('unexpected error');
  }
  updateCartQuantity();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

// Promise.all([
//   new Promise((resolve) => {
//     loadProducts(() => {
//       resolve();
//     });
//   }),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   })
// ]).then(() => {

//         renderOrderSummary();
//         renderPaymentSummary();

// })

new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });
