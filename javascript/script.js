// Hamburger menu functionality

function toggleMobileMenu(menu) {
    menu.classList.toggle("open");
}

// Pop up functionality


// let cartPopMessage=()=> {
//   let popUp = document.getElementById("cartPopup");
//    popUp.classList.toggle("show");
// }

// let span = document.getElementsByClassName("close")[0];
// // When the user clicks on <span> (x), close the modal
// span.onclick = function(event) {
//   let popUp = document.getElementById("cartPopup");
//   popUp.style.display = "none";
  
// }


// Shopping cart

let shop = document.getElementById("shop");


let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop =()=>{
    return (shop.innerHTML= shopItemsData.map((x)=>{
        let {id, name, price, img} = x;
        return `
        <div id=product-id-${id} class="product-card">
          <img
            src=${img}
            alt=""
            style="width: 100%"
          />
          <div class="overlay">
            <ul>
              <li><i id=${id} onclick="increment(${id});" class="fa-solid fa-cart-shopping"></i></li>
              <li><i class="fa-solid fa-heart"></i></li>
              <li><i class="fa-solid fa-share"></i></li>
            </ul>
          </div>
          <h2>${name}</h2>
          <p class="price">£ ${price}</p>
          <div class="stars">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
          </div>
        </div>`;
    }).join(""));
    
};

generateShop();



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
  localStorage.setItem("data", JSON.stringify(basket));
};


let update = (id)=>{
    let search = basket.find((x)=>x.id === id);
    document.getElementById("cartAmount").innerHTML = search.item;
    calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();