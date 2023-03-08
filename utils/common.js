import { LocalStorage } from "../combo-storage/src/index.js";


let ls = LocalStorage; // My new API library -.-! 

export function addToCart(storage_name, payload) {
    let data = ls.get(storage_name) ? ls.get(storage_name) : [];
    let qty = {
        qty: 1
    }
    let newPayload = payload[0];

    const isFound = data.some(element => {
        if (element.id === newPayload.id) {
            return true;
        }
        return false;
    });

    if (!isFound) {
        Object.assign(newPayload, qty)
        data.push(newPayload);
    } else {
        data.map((item) => {
            if (item.id === newPayload.id) {
                ++item.qty
            }
        })
    }

    ls.set(storage_name, data)
}

export function getTotalCartItems(key) {
    return ls.get(key)?.reduce((sum, { qty }) => sum + qty, 0)
}

export function updateItemsToFirebase(filtedData) {
    filtedData?.map((item) => {
        axios.patch(`https://online-shopping-94722-default-rtdb.europe-west1.firebasedatabase.app/items/${item.id}.json`, {
            balance: item.balance - item.qty
        }).catch((err) => {
            console.error(err)
        })
    })
}