var joshua = 18; //Initialized Variable
console.log(joshua);

var menProducts = document.querySelector(".products-menu-men");
var womenProducts = document.querySelector(".products-menu-women");
var jeweleryProducts = document.querySelector(".products-menu-jewelery");
var electronicsProducts = document.querySelector(".products-menu-electronics");

var products = document.querySelector(".products-menu");

var cartProductItem = document.querySelector(".cartProducts-List");
var cartMenuSum = document.querySelector(".cartPrice")

var navigationBar = document.querySelector(".navbar");
var cartMenuBar = document.querySelector(".cartMenu");

var specifiedCategory = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
];

var cartMenuList = [
]

var API_ArrayList;

//Fetch API functions
var productAPIList = fetch("https://fakestoreapi.com/products")
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        //Calling the function inside of the fetch promise and passing the data gotten from the fetch API into the argument, 
        // So what is an argument??? -----
        // Take for example, you have a worker with skills at handling some specific tool, 
        // and he has to build a house, you call that worker by his name (i.e in this case, the function name) 
        // then give him the specific tools he has stated that he can handle (i.e in this case, it doesn't actually have to be a specific tool, 
        // because in JS, variable data types can be determined on the fly and in a function they can be different or the same each time you call the function, 
        // So it's pretty much like hiring a Jack of All Trade, Master of All
        // else if not so we would be create function this way - As directed by chatGPT:

        // function processData(name, age, email) {
        //     // Check if the arguments have the expected data types
        //     if (typeof name !== 'string' || typeof age !== 'number' || typeof email !== 'string') {
        //         throw new Error('Invalid argument types. Expected: (string, number, string)');
        //         //   In JavaScript, throw new Error() creates a new Error object and immediately puts it.
        //         //   This interrupts the normal flow of the program and transfers control to the nearest enclosing 
        //         //   try...catch block or stops the script execution if there's no enclosing try...catch block.
        //     }
        //     // Process the data
        //     console.log(`Name: ${name}, Age: ${age}, Email: ${email}`);
        // }
        // // Example usage
        // processData(50, 30, 'john@example.com'); // Valid

        //Rather

        // function worker(canCook, canKill, canPlaceMines) {
        //     console.log(canCook, canKill, canPlaceMines);
        // }
    
        // worker("Omelets", 60, true);

        // So in the end that is what we call the arguments) -
        // arguments is the value passed to a function's parameters when the function is called
        assignData(json);
    });

//Creating products gotten from the API promise, then
function assignData(productData) {
    for (let index = 0; index < productData.length; index++) {
        const { title, description, price, image, id } = productData[index];
        // So this works as a filter, but we make use of an if conditional statement that simply says from the for loop line - 
        // in each of the index from the array of product data gotten from the fetch API promise, if that product index category is strictly equal
        // to specifiedCateory[0], i.e from our array of strings called specifiedCategory, we tell JS to compare with the string in index 0 from the specifiedCategory array
        // then log that index into our console if we wanted it to, but in this case we assign that index to our HTML
        if (productData[index].category == specifiedCategory[0]) {
            menProducts.innerHTML += `<div class="product">
                        <img src="${image}" alt="">
                        <div class="product-deets">
                            <h6>${title}</h6>
                            <div>$${price}</div>
                        </div>
                        <span class="material-symbols-outlined" id="addCart-Icon" data-id="${id}">
                        add_shopping_cart
                        </span>
                        </div>`;
        }

        if (productData[index].category == specifiedCategory[1]) {
            womenProducts.innerHTML += `<div class="product">
                        <img src="${image}" alt="">
                        <div class="product-deets">
                            <h6>${title}</h6>
                            <div>$${price}</div>
                        </div>
                        <span class="material-symbols-outlined" id="addCart-Icon" data-id="${id}">
                        add_shopping_cart
                        </span>
                        </div>`;
        }

        if (productData[index].category == specifiedCategory[2]) {
            jeweleryProducts.innerHTML += `<div class="product">
                        <img src="${image}" alt="">
                        <div class="product-deets">
                            <h6>${title}</h6>
                            <div>$${price}</div>
                        </div>
                        <span class="material-symbols-outlined" id="addCart-Icon" data-id="${id}">
                        add_shopping_cart
                        </span>
                        </div>`;
        }

        if (productData[index].category == specifiedCategory[3]) {
            electronicsProducts.innerHTML += `<div class="product">
                        <img src="${image}" alt="">
                        <div class="product-deets">
                            <h6>${title}</h6>
                            <div>$${price}</div>
                        </div>
                        <span class="material-symbols-outlined" id="addCart-Icon" data-id="${id}">
                        add_shopping_cart
                        </span>
                        </div>`;
        }
    }
    runListener(productData);
}

var cartIsOpened = false;

navigationBar.addEventListener("click", function (clickOnCart) {
    cartClicked = clickOnCart.target.id;

    if (cartClicked === "cart-icon" && !cartIsOpened) {
        console.log("Opening cart menu");
        cartMenuBar.classList.remove("cartMenuHide");
        cartIsOpened = true;
    } 
    else if (cartIsOpened && cartClicked === "cart-icon") {
        console.log("Closing cart menu");
        cartMenuBar.classList.add("cartMenuHide");
        cartIsOpened = false;
    } else {
        cartMenuBar.classList.add("cartMenuHide");
        cartIsOpened = false;
    }
    console.log(cartMenuBar);

    if (cartIsOpened) {
        navigationBar.classList.remove("resize");
        products.classList.remove("spaceOut-Items");
    }
    else {
        navigationBar.classList.add("resize");
        products.classList.add("spaceOut-Items")
    }
});

var cartImport;
var cart_Prod;

let cartItem;

function runListener(arrayPocket) {
    products.addEventListener("click", function (addToCart) {
        let addToCartBtn = addToCart.target.id;

        if (addToCartBtn == "addCart-Icon") {
            var productCacheID = parseInt(addToCart.target.getAttribute("data-id"));

            cartMenuBar.classList.remove("cartMenuHide");
            navigationBar.classList.remove("resize");
            products.classList.remove("spaceOut-Items");
            cartIsOpened = true;

            for (let index = 0; index < arrayPocket.length; index++) {
                cartImport = arrayPocket[index];

                // Wanna get the array objects of the clicked products ID i.e product_img, product_title etc.
                if (cartImport.id === productCacheID) {
                    cartItem = cartImport;
                }
            }

            cart_Prod = {
                cart_id: cartItem.id,
                cart_img: cartItem.image,
                cart_title: cartItem.title,
                cart_price: cartItem.price
            }

            cartMenuList.push(cart_Prod);
            // console.log(cartMenuList);

            addToCartList(cartMenuList);

            console.log(cartMenuList)
        }
    })
}

function addToCartList(array) {
    let cartHTMLCase = "";
    
    for (let index = 0; index < array.length; index++) {
        var { cart_id, cart_img, cart_title, cart_price } = array[index];
        cartHTMLCase += `<div class="cartProduct">
        <img src="${cart_img}" alt="">
        <div class="cart-details">
          <h5>${cart_title}</h5>
          <h4>$${cart_price}</h4>
        </div>
      </div>`
    }
    cartProductItem.innerHTML = cartHTMLCase;

    if (array.length == 0) {
        cartMenuSum.innerHTML = `<div>
        <h4>NG N</h4>
        <h5>(= $0)</h5>
        <button class="checkout-btn">Checkout</button>
        </div>`;
    }
    else {
        console.log("Assigned");
        const cartPriceArray = array.map(function(item){
            return item.cart_price
        });
        // console.log(cartPriceArray)
        // totalCartItems(array);
        totalCartItems(cartPriceArray);
    }

    totalAmount = 0;
}

addToCartList(cartMenuList);

function totalCartItems(cartPrice) {
    var totalAmount = 0;

    //reduce
    const totalPrices = cartPrice.reduce(function(previousValue, currentValue){
        //previousValue  = 0
        return previousValue + currentValue
    },0);
    console.log(Math.round(totalPrices));
    // if (cartPrice.length != 0) {
    //     for (let index = 0; index < cartPrice.length; index++) {
    //         totalAmount += cartPrice[index].cart_price;
    //         console.log("This is it: " + cartPrice[index].cart_price);
    //     }
         updatePrices();
    // }
}               

function updatePrices() {
    cartMenuSum.innerHTML = `<div>
    <h4>NG N</h4>
    <h5>(= $${Math.round(totalAmount)})</h5>
    <button class="checkout-btn">Checkout</button>
  </div>`;
}
//So we have four different Categories of product items,
//I'm gonna seperate those, rewriting my JavaScript in the process probably

//Update: I didn't have to rewrite much or even anything in my Javascript,
//all I did was add an if statement with comparison operator to compare
//a products category