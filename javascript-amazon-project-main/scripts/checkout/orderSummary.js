import { cart, removeFromCart, updateDeliveryOption, updateQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { updateCartQuantity } from "../checkout.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId; //cart ma vako delivery option id

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today
      .add(deliveryOption.deliveryDays, "days")
      .format("dddd, MMMM D");

    cartSummaryHTML += `<div class="cart-item-container 
              js-cart-item-container-${matchingProduct.id}
              ">
              <div class="delivery-date">
                Delivery date: ${deliveryDate}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                      ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                  ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">
                          ${cartItem.quantity}
                      </span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                      matchingProduct.id
                    }">
                      Update
                    </span>
                    <input class="quantity-input" type="number" >
                    <span class="save-quantity-link link-primary" data-product-id="${
                      matchingProduct.id
                    }"></span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                      matchingProduct.id
                    }">
                      Delete
                    </span>
                    <p class="error-message"></p>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                  
                  </div>
                </div>
              </div>
            </div>
      `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((option) => {
      const today = dayjs();
      const deliveryDate = today
        .add(option.deliveryDays, "days")
        .format("dddd, MMMM D");
      const priceString =
        option.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(option.priceCents)}-`;

      const isChecked = option.id === cartItem.deliveryOptionId;

      html += ` <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${option.id}"
      >
                    <input type="radio" 
                    ${isChecked ? "checked" : ""} 
                    class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${deliveryDate}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} Shipping
                      </div>
                    </div>
                  </div>`;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-update-link").forEach((updateLink) => {
    updateLink.addEventListener("click", () => {
      const updateProductId = updateLink.dataset.productId;
      const cartItemContainer = document.querySelector(
        `.js-cart-item-container-${updateProductId}`
      );
      cartItemContainer.classList.add("is-editing-quantity");
      const saveButton = cartItemContainer.querySelector(".save-quantity-link");
      saveButton.innerHTML = "Save";
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((saveLink) => {
    saveLink.addEventListener("click",()=>{
     saveQuantity(saveLink);

    });
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("keydown",(event)=>{
      if(event.key==="Enter"){
        const saveLink = input.parentElement.querySelector(".save-quantity-link");
        saveQuantity(saveLink);

      }
    });
  });



  document.querySelectorAll(".js-delete-link").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      const deletedProductId = deleteLink.dataset.productId;
      removeFromCart(deletedProductId);
      updateCartQuantity();

      document
        .querySelector(`.js-cart-item-container-${deletedProductId}`)
        .remove();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}


function saveQuantity(saveLink){
  const saveProductId = saveLink.dataset.productId;
        const cartItemContainer = document.querySelector(
          `.js-cart-item-container-${saveProductId}`
        );
        cartItemContainer.classList.remove("is-editing-quantity");

        const quantityInput = cartItemContainer.querySelector(".quantity-input");
        const quantity = parseInt(quantityInput.value);
        const quantityLabel=cartItemContainer.querySelector(".quantity-label");
        quantityLabel.innerHTML = quantity;
        if(quantity<=0 || quantity>=1000){
          const errorMessage=cartItemContainer.querySelector('.error-message');
          errorMessage.innerHTML = "Please enter a valid quantity (1-999)"; 
          setTimeout(() => {
            errorMessage.innerHTML = "";
                     }, 2000);
          
          return;
        }
        updateQuantity(saveProductId, quantity);
        updateCartQuantity();
        renderPaymentSummary();

}