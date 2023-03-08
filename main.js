import { addToCart, getTotalCartItems } from "./utils/common.js";
import Storage from 'node_modules/combo-storage/src/components/Storage.js'





const quantityCart = document.querySelector('.quantity-cart');
const key = "data";

let ls = new Storage(window.localStorage); // My new API library -.-! 

function getTotalQuantity() {
    let totalQuantityCart = ls.get(key) ? getTotalCartItems(key) : [];
    quantityCart.innerText = totalQuantityCart;
}

function showItems() {
    axios.get('https://online-shopping-94722-default-rtdb.europe-west1.firebasedatabase.app/items.json')
        .then(({ data }) => {
            try {
                let element = data.map((item) => {
                    return `
                    <div class="item ${item.balance < 1 ? "sold-out" : ''}">
                        <img src="${item.img_url}" alt="", class="item_img" />
                        <p class="item_name">Name: ${item.name}</p>
                        <p class="item_price">Price: ${item.price} kr</p>
                        <button class="add_cart" >Add to cart</button>
                    </div>
                  `;
                }).join('');

                const container = document.querySelector('.items');
                container.innerHTML = element;

                // attach event listener to the buttons 
                let btnList = document.querySelectorAll('.add_cart');
                btnList.forEach((element, btnIndex) => {
                    element.addEventListener('click', () => {
                        let payload = data.filter((item, id) => id === btnIndex);
                        addToCart(key, payload);
                        getTotalQuantity();
                    });
                });
            } catch (error) {
                console.error(error);
            }
        })
}

getTotalQuantity()
showItems();
