import { LocalStorage } from "../../combo-storage/src/index.js";
import { getTotalCartItems, updateItemsToFirebase } from '../../utils/common.js';

let ls = new Storage(window.localStorage); // My new API library -.-! 
const key = "data";
const subtotal = document.querySelector('.subtotal');
const totalItems = document.querySelector('.total-items');
const checkOutBtn = document.querySelector('.checkout-btn');
const removeBtn = document.querySelector('.remove-btn');



let data = ls.get(key);

function getSubtotal() {
    return data?.map((item) => item.price * item.qty).reduce((acc, value) => acc + value, 0);
}

function toEmptyCart() {
    ls.remove(key);
}

function showItemsCart() {
    const container = document.querySelector('.item-list');

    container.innerHTML = "";
    ls.get(key)?.map((item) => {
        let el = `
        <li class="item">
            <img style="width: 5%;"
                src=${item.img_url}
                alt=${item.name}>
            <p>Name: ${item.name}</p>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.qty}</p>
            <p>Total price: ${item.qty * item.price} kr</p>
        </li>
        `;

        container.innerHTML += el;
    });
    totalItems.innerText = `Total items: ${getTotalCartItems(key)} items`;
    subtotal.innerText = `Subtotal: ${getSubtotal()} kr`;

}

function findDuplicates() {
    data?.filter((obj, index) => data.findIndex((item) => item.id === obj.id) === index);
}

removeBtn.addEventListener('click', () => {
    toEmptyCart()
    clearContent()
    showItemsCart()
})

checkOutBtn.addEventListener('click', () => {
    updateItemsToFirebase(ls.get(key));
    toEmptyCart()
    clearContent()
    showItemsCart()
    setTimeout(() => {
        alert('Thanks So Much for Your Order! I Hope You Enjoy Your New Purchase!');
    }, 400);
    setTimeout(() => {
        window.location.assign('../../index.html');
    }, 2000)
})


function clearContent() {
    if (!ls.get(key)) {
        document.querySelector('.buttons').remove();
        document.querySelector('.total').remove();
        let element = document.createElement('p');
        element.innerText = "Your cart is empty!";

        const container = document.querySelector('.container');
        element.style.textAlign = "center";
        element.style.padding = "3rem";

        container.append(element)
    }
}

clearContent()
findDuplicates()
showItemsCart()



