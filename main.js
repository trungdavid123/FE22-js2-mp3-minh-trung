//Fetch the itemss from the Realtime
async function getAll() {
    const url = `https://online-shopping-94722-default-rtdb.europe-west1.firebasedatabase.app/items.json`;
    const response = await fetch(url);
    const items = await response.json();
  
    console.log(items);
    return items;
  }
  getAll().then((items) => {
    console.log(items);
    displayItems(items);
    // event
  });
  
  function displayItems(items) {
    console.log(items);
    const container = document.querySelector('.items');
    container.innerHTML = items.map((item) => createHtmlString(item)).join('');
  }
  
  function createHtmlString(item) {
    return `
  <div class="item">
      <img src="${item.img_url}" alt="", class="item_img" />
      <p class="item_name">Name: ${item.name}</p>
      <p class="item_price">Price: ${item.price}</p>
      <p class="item_balance">Left items: ${item.balance}</p>
      <button> Add</button>
  </div>
      `;
  }
  