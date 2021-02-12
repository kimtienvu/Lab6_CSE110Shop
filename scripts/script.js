// Script.js

let keys;
let cart = [];
let cart_element = document.getElementById("cart-count");

/* dealing with adding/removing items from the cart*/
function add_item(id) {
    localStorage.setItem(id, id.toString());
}

function remove_item(id) {
    localStorage.removeItem(id);
}

window.addEventListener('DOMContentLoaded', () => {
  
  if(localStorage.length > 0) {
    cart_element.innerHTML = localStorage.length;
  } 
  else {
    cart_element.innerHTML = 0;
  }
  fetchMyText();

});

async function fetchMyText() {
  let response = await fetch('https://fakestoreapi.com/products');
  let data = await response.json();
  
  // for each item in data, convert to string, check if it exists in local storage
  // If does not exist,store in local storage
  //console.log(data);

  /* Make HTML element for each item in local storage and remember on refresh*/
  keys = Object.keys(localStorage);
  for (let i = 0; i <= keys.length; i++) {

    if (keys[i] != "data") {
      cart.push(keys[i]);
    }
  } 
  
  //console.log(cart);
  let cart_counter = parseInt(cart_element.innerHTML);
  let temp_parent = document.getElementById("product-list");
  
  let i = 0;
  data.forEach(cart_item => {
      
    temp_id = "id_" + i;
        
    if (cart.includes(temp_id)) {
      temp_parent.appendChild(new ProductItem(cart_item, i, 1));
    } 
    else {
      temp_parent.appendChild(new ProductItem(cart_item, i, 0));
    }
    
    i++;
  })

}
