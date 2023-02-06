let cartContainer = document.getElementById("cart-container");
let cartTable = document.getElementById("cart-table");
let cartBody = document.getElementById("cartBody");
let grandTotal = document.getElementById("grandTotal");
let subTotal = document.getElementById("subTotal");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {

    if (basket.length !== 0) {
        return cartBody.innerHTML = basket.map((x) => {
            let {
                id,
                item
            } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let {name, img, price} = search;
            return `
            <tbody>
        <td>
        <div class="cart-item">
        <img src=${img} alt="" />
        <h4>${name}</h4>
        </div>
        </td>
        <td><div class="buttons">
              <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
          </div></td>
        <td><p class="price">£ ${price}</p></td>
        <td><div class="total"><p>£ ${item * price}</p>
        <i onclick="removeItem(${id})" class="fa-solid fa-circle-minus"></i>
        </div>
        </td>
      </tbody>`
        }).join("");



    } else {
        cartTable.innerHTML = ``
        cartContainer.innerHTML = `
        <h2>Your cart is empty</h2>
        <a href="/index.html">
        <button class="home-btn">Continue Shopping</button>
        </a>
        `
    }
};

generateCartItems();

let increment = (id)=>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined) {
    basket.push({
        id: selectedItem.id,
        item: 1,
    });
} else {
search.item += 1;
}
 generateCartItems();
 update(selectedItem.id);
 localStorage.setItem("data", JSON.stringify(basket));
};



let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id)=>{
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem=(id)=> {
    let selectedItem = id;
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
    totalAmount();
}

let clearCart = ()=>{
    basket = []
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
}

let totalAmount =()=>{
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || []
            return item * search.price;
        }).reduce((x,y)=> x + y, 0);
        subTotal.innerHTML = `
        <h4>Subtotal</h4>
        <p>£ ${amount}</p>
        `
        grandTotal.innerHTML = `
        <h4>Total</h4>
        <p>£ ${amount}</p>
        `
        
    }
    else return;
};


totalAmount();