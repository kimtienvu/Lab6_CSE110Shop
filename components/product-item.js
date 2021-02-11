// product-item.js

class ProductItem extends HTMLElement {
  /* Item data, index located at, is it in the cart or not? */
  constructor(json_data, index, added_cart) {
    super();
        
    /* css copied from style.css file*/
        
    let template_format = document.createElement("template");
        
    template_format.innerHTML = `<style>
    .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
    }
    
    .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template_format-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template_format-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
    }
    
    .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
    }
    
    .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
    }
    
    .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
    }
    
    .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
    }
  </style>
  <li class="product">
    <img src="${json_data["image"]}", width=200></img>
    <p class="title">${json_data["title"]}</p>
    <p class="price">${json_data["price"]}</p>
    <button class="cart_button">Add to Cart</button>
  </li>`;

    /* Add to Cart button functionality */
    temp_id = "id_" + index;
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(template_format.content.cloneNode(true)); 
    this.button = this.root.querySelector(".cart_button");
    this.button.setAttribute("inside", added_cart);
    this.button.setAttribute("id", temp_id);
    
    this.button.onclick = function() {
      
      //console.log(this);
      if (parseInt(this.getAttribute("inside")) == 1) {

        //console.log(this);
        this.setAttribute("inside", 0);
        
        /* If removing from cart, subtract 1 from counter */
        this.innerHTML = "Add to Cart";
        remove_item(this.getAttribute("id"));
        let cart_counter = parseInt(document.getElementById("cart-count").innerHTML);
        document.getElementById("cart-count").innerHTML = cart_counter - 1;
      } 
      else {

        this.setAttribute("inside", 1);
        //console.log(this);
        
        /* if adding to cart, add 1 to counter */
        this.innerHTML = "Remove from Cart";

        add_item(this.getAttribute("id"));
        //console.log(this);
        let cart_counter = parseInt(document.getElementById("cart-count").innerHTML);
        document.getElementById("cart-count").innerHTML = cart_counter + 1;
      }
    };
    
    
    
    /* Change button text */
    if (added_cart) {
      this.button.innerHTML = "Remove from Cart";
      //console.log(this);
    }
  }
}
customElements.define('product-item', ProductItem);
