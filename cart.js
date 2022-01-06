var total_amt = document.getElementById('total_amt')
var total_cart_amt = document.getElementById('total_cart_amt')
const decNumber = (incdec,amount,value) => {
    var itemval = document.getElementById(incdec);
    var itemamount = document.getElementById(amount);
    // console.log(amount)
    if (itemval.value <= 0){
        itemval.value = 0;
    alert("Value cannot be negative")
    }
    else{
        itemval.value = parseInt(itemval.value)-1;
        itemamount.innerHTML = parseInt(itemamount.innerHTML) - value;
        total_amt.innerHTML = parseInt(total_amt.innerHTML) - value;
        total_cart_amt.innerHTML = parseInt(total_amt.innerHTML) + 50;
        itemval.style.background = '#fff';
        itemval.style.color = 'black';
    }
}

const incNumber = (incdec,amount,value,count) => {
    var itemval = document.getElementById(incdec);
    var itemamount = document.getElementById(amount);
    // console.log(itemamount)
    if (itemval.value >= count){
    itemval.value = count;
    alert(`max ${count} allowed`);    
    itemval.style.background = 'red';
    itemval.style.color = '#fff';
    }
    else{
    itemval.value = parseInt(itemval.value) + 1;
    itemamount.innerHTML = parseInt(itemamount.innerHTML) + value;
    total_amt.innerHTML = parseInt(total_amt.innerHTML) + value;
    total_cart_amt.innerHTML = parseInt(total_amt.innerHTML) + 50;
    
}
}

async function get_api(url){
    const response = await fetch(url);
    var data = await response.json();
    show_data(data);
}

get_api('./data.json');

function show_data(data){
    l = Object.keys(data).length;
    let card = `<h2 class="py-4 font-weight-bold">Cart(${l} items)</h2>`;
    for (x in data){
         card += `
        <div class="card p-4">
        <div class="row">
          <!-- cart images div -->
          <div class="col-md-5 col-11 mx-auto bg-white d-flex 
          justify-content-center align-items-center shadow product_img">
            <img src="${data[x].img}" alt="${data[x].name}" class="img-fluid">
          </div>
          <!-- cart product details -->
          <div class="col-md-7 col-11 mx-auto px-4 mt-2">
            <div class="row">

              <!-- product name -->
              <div class="col-6 card-title">
                <h1 class="mb-4 product_name">${data[x].name}</h1>
                <p class="mb-2">${data[x].type} - ${data[x].color}</p>
                <p class="mb-2">COLOR - ${data[x].color}</p>
                <p class="mb-2">SIZE - ${data[x].size}</p>
              </div>
              <!-- quantity inc dec -->

              <div class="col-6 ">
                  <ul class="pagination d-flex justify-content-end set_quantity">
                    <li class="page-item">
                      <button class="page-link" onclick="decNumber('textbox${x}','itemval${x}',${data[x].value})">
                        <i class="fas fa-minus"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <input type="text" name="" class="page-link" value="0" id="textbox${x}"></input>
                    </li>
                    <li class="page-item">
                      <button class="page-link" onclick="incNumber('textbox${x}','itemval${x}',${data[x].value},${data[x].count})">
                        <i class="fas fa-plus"></i>
                      </button>
                    </li>
                  </ul>
              </div>

              <!-- remmove item move and price  -->

              <div class="row">
                <div class="col-8 d-flex justify-content-between remove_wish">
                  <p> <i class="fas fa-trash-alt"></i> Remove Item</p>
                  <p> <i class="fas fa-heart"></i> Move to Wishlist</p>
                </div>
                <div class="col-4 d-flex justify-content-end price_money">
                  <h3>$<span id="itemval${x}">0.00</span></h3>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      `;    
    //   console.log(cart.innerHTML);
    //   console.log(cart);
    }
    cart = document.getElementById("cart");
    cart.innerHTML += card;
    
}