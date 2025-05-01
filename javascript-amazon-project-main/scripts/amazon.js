import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productHTML = "";

  products.forEach((product) => {
    productHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count} 
            </div>
          </div>

          <div class="product-price">${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}"
          >
            Add to Cart
          </button>
        </div>`;
  });

  document.querySelector(".js-products-grid").innerHTML = productHTML;
  updateCartQuantity();
 

function updateCartQuantity() {
  let cartvalue= document.querySelector(".js-cart-quantity")

    let cartQuantity = calculateCartQuantity();
    console.log(cartQuantity);

    cartQuantity ===0 ? cartvalue.innerHTML= "" : cartvalue.innerHTML=cartQuantity;
    
  }




  let timeOutId;
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      clearTimeout(timeOutId);
     
      const productId = button.dataset.productId;
      let selector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      let selectorQuantity=Number(selector.value
      );

      const addedToCart = document.querySelector(
        `.added-to-cart-${productId}`
      );
      addedToCart.classList.add("added-to-cart-active");
     
      
      timeOutId=setTimeout(() => {
       
        addedToCart.classList.remove("added-to-cart-active");
      }, 2000);
    

      addToCart(productId,selectorQuantity);
      updateCartQuantity();
    });
  });
}
