const cart = new Object();
document.getElementById("cart_page").addEventListener("click",function(){show_data(cart);});
document.getElementById("home_page").addEventListener("click",function(){get_api('./data.json');});
var total_amount = 0;

const decNumber = (incdec,amount,value) => {
    var total_amt = document.getElementById('total_amt');
    var total_cart_amt = document.getElementById('total_cart_amt');
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
    var total_amt = document.getElementById('total_amt');
    var total_cart_amt = document.getElementById('total_cart_amt');
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
    get_home_page(data);
    // console.log(data);
}

get_api('./data.json');

function show_data(data){
    l = Object.keys(data).length;
    let card = `<div class="row">
                  <div class="col-md-10 col-11 mx-auto">
                    <div class="row mt-5 gx-3">

          <!-- left side div -->
                        <div class="col-md-12 col-lg-8 col-101 mx-auto main_cart mb-lg-0 mb-5 p-0 shadow" id = "cart">                   

                          <h2 class="py-4 font-weight-bold"> <i class="fas fa-shopping-cart"></i> Cart(${l} items)</h2>`;
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
                      <input type="text" name="" class="page-link" value="1" id="textbox${x}"></input>
                    </li>
                    <li class="page-item">
                      <button class="page-link" onclick="incNumber('textbox${x}','itemval${x}',${data[x].value},${data[x].count})">
                        <i class="fas fa-plus"></i>
                      </button>
                    </li>
                  </ul>
              </div>
            </div>
              <!-- remmove item move and price  -->

            <div class="row px-0">
              <div class="col-8 d-flex justify-content-between remove_wish mx-0">
                <p> <i class="fas fa-trash-alt"></i> Remove Item</p>
                <p> <i class="fas fa-heart"></i> Move to Wishlist</p>
              </div>
              <div class="col-4 price_money mx-0">
                <h3 class="ml-auto">
                  Price : $
                  <span>
                    ${data[x].value}
                  </span>
                </h3>
                <h3>
                  Total : $ 
                  <span id="itemval${x}" class="itemval">
                    ${data[x].value}
                  </span>
                </h3>
              </div>
            </div>

            
          </div>
        </div>
      </div>
      `;

    //   console.log(cart.innerHTML);
    //   console.log(cart);
    }
    card+=`</div>

    <!-- right side div -->


    <div class="col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5">
      <div class="right_side p-3 shadow bg-white">
        <h1 class="product_name mb-4">The Total amount of</h1>
        <div class="price_individual d-flex justify-content-between">
          <p>Product amount</p>
          <p>$ <span id="total_amt">${total_amount}</span></p>
        </div>
        <div class="price_individual d-flex justify-content-between">
          <p>Shipping Charge</p>
          <p>$<span>50.00</span></p>
        </div>
        <hr/>
        <div class="total_amt d-flex justify-content-between font-weight-bold">
          <p> <b> Total amount of (including GST) </b></p>
          <p><b>$ <span id="total_cart_amt">${50+total_amount}</span></b></p>
        </div>
        <button class="btn btn-primary text-uppercase">Checkout</button>

      </div>

      <!-- discount code -->

      <div class="discount_code mt-4 shadow bg-white">
        <div class="card">
          <div class="card-body">
            <a class="d-flex justify-content-between" data-toggle="collapse"
            href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Add a Discount Code (Optional)
              <span><i class="fas fa-chevron-down pt-1"></i></span></a>

            <div class="collapse" id="collapseExample">
              <div class="mt-3">
                <input type="text" name="" id="discount_code1" class="form-control font-weight-bold"
                placeholder="Enter the Discount Code">
                <button class="btn btn-primary mt-3" onclick="discount_code()">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expected Delivery date -->
      <div class="delivery_date mt-4 shadow bg-white">
        <div class="card p-4">
          <h4 class="mb-4">Expected Delivery Date</h4>
          <p id="Delivery_date">27th Jan - 30th Jan</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`;
    let page = document.getElementById("main");
    page.innerHTML = card;
    
}

function get_date(){
  const d = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July",
   "August", "September", "October", "November", "December"];
  d.setDate(d.getDate() + 3);
  var s = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  document.getElementById("Delivery_date").innerHTML = s;
}
// get_date();



function get_home_page(data){
  let page = `<div class="py-4 px-lg-5 px-0 d-flex flex-row flex-wrap mx-auto" id="main_page">`
  for (x in data){
    page+=`<div class="card m-md-3 m-2 col-lg-2 col-md-5 col-sm-5 col-11 shadow px-0 pb-4 p_cards">
            <div class="p_img border-bottom mb-2 mx-auto">
              <img src="${data[x].img}" alt="${data[x].name}" class="img-fluid mx-auto">
            </div>
            <h3 class="p_name mb-3 mx-auto">${data[x].name}</h3>
            <p class="p_details mb-2 mx-auto">Price - $${data[x].value}</p>
            <button class="btn btn-primary mx-auto" onclick='addToCart(${x},${JSON.stringify(data[x])})'>Add to Cart<i class="fas fa-shopping-cart"></i></button>
          </div>`
  }
  page+=`</div>`
  let home = document.getElementById("main");
  home.innerHTML = page;
}


function addToCart(x,value){
  cart[x] = value;  
  total_amount += parseInt(cart[x].value);
  alertSuccess();
  l = Object.keys(cart).length;
  document.getElementById('cart_products').innerHTML = l;
}

function alertSuccess(){
  document.getElementById('alertsuccess').style.display = "inline";
  
  const timeout =  setTimeout(function(){document.getElementById('alertsuccess').style.display = "none";},3000);
}


