import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js'


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
  await loadProductsFetch();
  const value = await new Promise((resolve) => {
    loadCart(() => {
      resolve('value 3');
    });
  });
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
