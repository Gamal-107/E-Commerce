// Get All Data From HTML
const productsContainer = document.querySelector(".products")

const electronicsCategory = document.querySelector(".electronics")

const appliancesCategory = document.querySelector(".appliances")

const mobilesCategory = document.querySelector(".mobiles")

const closeItem = document.querySelector(".slide-cart .close-item")

const slideCart = document.querySelector(".slide-cart")

const saveCartsIcon = document.querySelector(".save-products > a:nth-child(2)");

const saveCartsContainer = document.querySelector(".cart-aitems");

const numSaveProducts = document.querySelector(".num-items")

const totalPriceSaveProducts = document.querySelector(".total-price");

const clearAll = document.querySelector(".clear-all")

const shopMore = document.querySelector(".shop-more")

const loveProduct = document.querySelector(".save-products > a:nth-child(1) > span")

const loves = document.querySelectorAll(".love")

const navMenu = document.querySelector(".nav-menu")

const closeNavMenu = document.querySelector(".close-menu")

const navLinks = document.querySelector(".links")

const allAnchors = document.querySelectorAll("a")

// To Prevent All Anchor Default Behavior
allAnchors.forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
  })
});
// Function For Store Products In Save Products
let arrOfSaveProducts = [];

let add_to_cart_clicked_arr = [];

let lovesBttn = [];

let loveAllProducts = 0;
// If Data In Local Storage 
function checkLocalStorage() {
  if (window.localStorage.length > 0) {

    const dataFromStorage = window.localStorage.getItem("data");
    arrOfSaveProducts = dataFromStorage ? JSON.parse(dataFromStorage) : [];

    const cartsFromStorage = window.localStorage.getItem("addCarts");
    add_to_cart_clicked_arr = cartsFromStorage ? JSON.parse(cartsFromStorage) : [];

    const priceFromStorage = window.localStorage.getItem("all_price");
    totalPriceSaveProducts.innerHTML = priceFromStorage || "0";

    if (Array.isArray(arrOfSaveProducts)) {
      createSaveProducts(arrOfSaveProducts);
    } else {
      arrOfSaveProducts = [];
      createSaveProducts([]);
    }

    loveAllProducts = window.localStorage.getItem("loveProducts") || "0";

    const lovesFromStorage = window.localStorage.getItem("loveProductsArr");
    lovesBttn = lovesFromStorage ? JSON.parse(lovesFromStorage) : [];

    loveProduct.innerHTML = loveAllProducts;


  } else {
    saveCartsContainer.innerHTML = "";
    add_to_cart_clicked_arr = [];
    totalPriceSaveProducts.innerHTML = 0

    arrOfSaveProducts = [];


  }
}
checkLocalStorage()

// Create Hot Deals Products
async function mainFunction() {
  try {
    let data = await fetch("./Ecommerce Website/products.json");

    let dataObj = await data.json();


    // Trigger Function For Show Products
    showProduct(dataObj);

    // Initialize hot products slider after products have been added to DOM
    if (typeof sliderHotImages === 'function') {
      sliderHotImages();
    }

    // Trigger Function For Show Electronics Products
    categoryProduct(dataObj, "electronics", electronicsCategory)

    // Trigger Function For Show Appliances Products
    categoryProduct(dataObj, "appliances", appliancesCategory)

    // Trigger Function For Show Mobiles Products
    categoryProduct(dataObj, "mobiles", mobilesCategory)


  } catch (error) {
    return null;
  }
}
mainFunction()

// Get Array Of Products For Show On The Page
function showProduct(productsArr) {
  for (let index = 0; index < productsArr.length; index++) {

    // If Products Is Exixt Discount Show
    if (productsArr[index].old_price) {

      // Check Product In Slider Is Exist In The Prodct Of The Page
      let checked = arrOfSaveProducts.some(product => product.id === productsArr[index].id);

      let checkedLoves = lovesBttn.some(btn => btn == productsArr[index].id);


      // Calculate Discount
      let discount = Math.floor((productsArr[index].old_price - productsArr[index].price) / productsArr[index].old_price * 100);

      //   // Craete Div To Added Content
      //   let div = document.createElement("div")
      //   // Add Classes To Div
      //   div.classList.add("swiper-slide")
      //   div.classList.add("product")

      //   div.innerHTML = `
      //     <span class="sale-perc">${discount}%</span>
      // <img src="./Ecommerce Website/${productsArr[index].img}" alt="" />
      //     <div class="txt">
      //       <div class="stars">
      //         <i class="fa-solid fa-star"></i>
      //         <i class="fa-solid fa-star"></i>
      //         <i class="fa-solid fa-star"></i>
      //         <i class="fa-solid fa-star"></i>
      //         <i class="fa-solid fa-star"></i>
      //       </div>
      //       <div class="title">
      //         ${productsArr[index].name}
      //       </div>
      //       <div class="price"><span>${productsArr[index].price}$</span><span>${productsArr[index].old_price}$</span></div>
      //       <div class="cart">
      //         <button class="add-to-cart ${checked ? `changeAdd` : ``}" data-id = "${productsArr[index].id}">
      //           <i class="fa-solid fa-cart-shopping"></i> ${checked ? `Item In Cart` : `Add To Cart`}
      //         </button>
      //         <div onclick = "addLove(event)" class="love ${checkedLoves ? `activeLove` : ``}" data-id = "${productsArr[index].id}"><i class="fa-regular fa-heart"></i></div>
      //       </div>
      //     </div>
      // `
      //   productsContainer.appendChild(div)

      // The Best Practise >>> +=
      productsContainer.innerHTML += `

      <div class="swiper-slide product">
        <span class="sale-perc">50%</span>
        <img src="./Ecommerce Website/${productsArr[index].img}" alt="" />
        <div class="txt">
          <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <div class="title">${productsArr[index].name}</div>
          <div class="price">
            <span>${productsArr[index].price}$</span
            ><span>${productsArr[index].old_price}$</span>
          </div>
          <div class="cart">
            <button
              class="add-to-cart ${checked ? `changeAdd` : ``}"
              data-id="${productsArr[index].id}">
              <i class="fa-solid fa-cart-shopping"></i> ${checked ? `Item In
              Cart` : `Add To Cart`}
            </button>
            <div
              onclick="addLove(event)"
              class="love ${checkedLoves ? `activeLove` : ``}"
              data-id="${productsArr[index].id}">
              <i class="fa-regular fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    
    
    `

    }
  }
}


// Get Array Of Products For Show On The Page
function categoryProduct(productsArr, category, container) {
  for (let index = 0; index < productsArr.length; index++) {

    // If Products Is Exixt Discount Show
    if (productsArr[index].category === category) {

      const priceSpan = productsArr[index].old_price ? `<span>${productsArr[index].old_price}$</span>` : "";

      const discount = Math.floor((productsArr[index].old_price - productsArr[index].price) / productsArr[index].old_price * 100);

      const discountSpan = productsArr[index].old_price ? `<span class="sale-perc">${discount}%</span>` : "";

      // Craete Div To Added Content
      let div = document.createElement("div")
      // Add Classes To Div
      div.classList.add("swiper-slide")
      div.classList.add("product")

      let checked = arrOfSaveProducts.some(product => product.id === productsArr[index].id);

      let checkedLoves = lovesBttn.some(btn => btn == productsArr[index].id);


      div.innerHTML = `
        ${discountSpan}
        <img src="./Ecommerce Website/${productsArr[index].img}" alt="" />
        <div class="txt">
          <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <div class="title">
            ${productsArr[index].name}
          </div>
          <div class="price"><span>${productsArr[index].price}$</span>${priceSpan}</div>
          <div class="cart">
            <button class="add-to-cart ${checked ? `changeAdd` : ``}" data-id = "${productsArr[index].id}">
              <i class="fa-solid fa-cart-shopping"></i> ${checked ? `Item In Cart` : `Add To Cart`}
            </button>
            <div onclick = "addLove(event)" class="love ${checkedLoves ? `activeLove` : ``}" data-id = "${productsArr[index].id}"><i class="fa-regular fa-heart"></i></div>
          </div>
        </div>
    `
      container.appendChild(div)

    }
  }
}


// Get Year To Copyright
function getYear() {
  let year = new Date().getFullYear();
  let copyright = document.querySelector(".year");
  copyright.innerHTML = `${year}`;
}
getYear()


// Show Slide Cart When Click Save Carts
function showSlideCart() {
  saveCartsIcon.addEventListener("click", function (e) {
    e.preventDefault();
    slideCart.classList.add("show-slide-cart")
  })
}
showSlideCart()

// Hide Slide Cart When Click Close
function hideSlideCart(btn) {
  btn.addEventListener("click", function () {
    slideCart.classList.remove("show-slide-cart")
  })
}
// When Click On Close ItemIs Close The Slider
hideSlideCart(closeItem)



async function storeProducts(category) {
  try {
    let data = await fetch("./Ecommerce Website/products.json");

    let dataObj = await data.json();

    category.addEventListener("click", (e) => {
      // To Get Add To Cart
      let addToCart = e.target.closest(".add-to-cart");



      if (addToCart) {

        // Title Of Product On Clicked
        let title = addToCart.closest(".txt").querySelector(".title").innerHTML.trim();

        // Get Object Equalvelent Product
        const targetObj = Array.from(dataObj).find((obj) => {
          return obj.name.toLowerCase().trim() === title.toLowerCase().trim();
        })
        // Create Object To Store Data
        let obj = {
          id: targetObj.id,
          img: targetObj.img,
          name: targetObj.name,
          price: targetObj.price,
          quantity: 1,
        }


        // To Store Id In Local Storage For Controll BgColor and Event
        addToCart.id = obj.id;

        // Because If Product Is Exist Dont Adding  // To Secure (Pointer-event Alternative)
        if (!(add_to_cart_clicked_arr.includes(addToCart.id))) {


          add_to_cart_clicked_arr.push(addToCart.id)

          arrOfSaveProducts.push(obj)

          // Get data-id For Bttn
          let productIdd = addToCart.getAttribute("data-id");

          // Chang BgColor And Event
          document.querySelectorAll(`.add-to-cart[data-id = "${productIdd}"]`).forEach(btn => {
            btn.classList.add("changeAdd")

            btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Item In Cart`

          });

          // Craete
          createSaveProducts(arrOfSaveProducts)

          // Save In Local Storage
          storeSaveProductsLS(arrOfSaveProducts, add_to_cart_clicked_arr)

          // Function To Get All Price In Save Products
          getAllPrice(arrOfSaveProducts)

        }


      }
    })


  } catch (error) {
    console.log("Error")
  }
}
storeProducts(productsContainer);
storeProducts(electronicsCategory);
storeProducts(appliancesCategory);
storeProducts(mobilesCategory);

// Function To Create Save Products
function createSaveProducts(array) {
  if (!array || !Array.isArray(array)) {
    array = [];
  }

  if (array.length > 0) {

    saveCartsContainer.innerHTML = "";

    let totalPrice = 0;
    let totalCount = 0;

    array.forEach(element => {
      totalPrice += element.price * element.quantity;

      totalCount += element.quantity;

      saveCartsContainer.innerHTML +=
        `
        <div class="container">
          <div class="productt"><img src="./Ecommerce Website/${element.img}" alt=""></div>
          <div class="info">
            <h2>${element.name}</h2>
            <p class="salary">${element.price * element.quantity}$</p>
            <div class="quntity">
              <span class="increase">+</span>
              <span class="count">${element.quantity}</span>
              <span class="decrease">-</span>
            </div>
          </div>
          <div class="remove"><i class="fa-solid fa-trash-can"></i></div>
        </div>
    `

    });

    // Update all values after loop
    numSaveProducts.innerHTML = totalCount;
    saveCartsIcon.querySelector("span").innerHTML = totalCount;
    totalPriceSaveProducts.innerHTML = `${totalPrice}$`;

  } else {
    saveCartsContainer.innerHTML = "";
    numSaveProducts.innerHTML = 0;
    saveCartsIcon.querySelector("span").innerHTML = 0;
    totalPriceSaveProducts.innerHTML = `0$`;
  }
}
// Store Save Products In Local Storage
function storeSaveProductsLS(array, cartsArr) {
  window.localStorage.setItem("data", JSON.stringify(array));
  window.localStorage.setItem("addCarts", JSON.stringify(cartsArr));
}

// Function To Get All Price In Save Products
function getAllPrice(array) {
  let allPrice = 0;

  if (array.length > 0) {
    array.forEach(element => {
      allPrice += element.price * element.quantity;
    });
    window.localStorage.setItem("all_price", allPrice)
    totalPriceSaveProducts.innerHTML = `${allPrice}$`;
  } else {
    allPrice = 0;
    window.localStorage.setItem("all_price", allPrice)
    totalPriceSaveProducts.innerHTML = `${allPrice}$`;

  }
}


function removeSaveCart(array) {
  saveCartsContainer.addEventListener("click", (e) => {
    let removeBttn = e.target.closest(".remove");



    if (removeBttn) {
      // To Get Container Of Remove Button
      let container = removeBttn.closest(".container");

      // To Get Name Of Product
      let nameOfProduct = container.querySelector(".info > h2").textContent.trim()


      // To Get Index Of Obgect For Product
      let targetIndexProduct = array.findIndex((product) => {
        return product.name.toLowerCase() === nameOfProduct.toLowerCase();
      })

      if (targetIndexProduct !== -1) {

        // To Get Id For Product
        const id = array[targetIndexProduct].id;

        // Delete Obgect From Array
        let removeObj = array[targetIndexProduct];
        array.splice(targetIndexProduct, 1)
        
        // Remove Product ID from add_to_cart_clicked_arr (find by ID, not by index)
        const cartIndex = add_to_cart_clicked_arr.findIndex(cartId => cartId == id);

        if (cartIndex !== -1) {
          add_to_cart_clicked_arr.splice(cartIndex, 1);
        }

        // Chang BgColor And Event 
        document.querySelectorAll(`.add-to-cart[data-id = "${id}"]`).forEach(btn => {
          btn.classList.remove("changeAdd")
          btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add To Cart`


        });

        // Remove Product From Local Storage
        storeSaveProductsLS(array, add_to_cart_clicked_arr)

        // Recreate the UI with updated data
        createSaveProducts(array)

        // Update total price in localStorage
        getAllPrice(array)

      }

      // If Clicked On Remove Bttn Still All Information Foe All Products

    }
  })
}
removeSaveCart(arrOfSaveProducts)


// Function To Claer All Save Products
function clearAllProducts(array) {
  clearAll.addEventListener("click", () => {

    add_to_cart_clicked_arr.forEach(id => {
      document.querySelectorAll(`.add-to-cart[data-id = "${id}"]`).forEach(btn => {
        btn.classList.remove("changeAdd")

        btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add To Cart`

      });
    });



    // Remove Array Of Proucts
    arrOfSaveProducts = []
    array = []

    // Clera All Cart Clicked
    add_to_cart_clicked_arr = []

    // Remove Product From Local Storage
    storeSaveProductsLS(array, add_to_cart_clicked_arr)

    // Change All Price
    getAllPrice(array)

    // Remove All Products From The Page
    createSaveProducts(array)

    // Change Num Of Save Products
    numSaveProducts.innerHTML = array.length;

    saveCartsIcon.querySelector("span").innerHTML = array.length;


  })
}
clearAllProducts(arrOfSaveProducts)


saveCartsContainer.addEventListener("click", (e) => {
  // Get Increase Button
  const increseBtn = e.target.closest(".increase");


  // Get Decrese Button
  const decreaseBtn = e.target.closest(".decrease");

  // To Get All Containers Of Products
  const containers = saveCartsContainer.children;

  // Get The Salary
  let salary = 0;

  // To Get Origin Salary
  Array.from(containers).forEach((container, index) => {
    if (e.target.closest(".container") === container) {

      salary = arrOfSaveProducts[index].price;

    }
  });




  if (increseBtn) {
    // To Get Name Of Product
    let nameOfProduct = increseBtn.closest(".info").querySelector(".info > h2").textContent.trim()

    // To Get Index Of Obgect For Product
    let targetIndexProduct = arrOfSaveProducts.findIndex((product) => {
      return product.name.toLowerCase() === nameOfProduct.toLowerCase();
    })

    if (targetIndexProduct !== -1) {
      // Increase quantity
      arrOfSaveProducts[targetIndexProduct].quantity += 1;

      // Save to localStorage
      storeSaveProductsLS(arrOfSaveProducts, add_to_cart_clicked_arr)

      // Update UI elements
      let salaryElement = increseBtn.closest(".info").querySelector(".salary")
      let count = increseBtn.nextElementSibling;

      count.innerHTML = arrOfSaveProducts[targetIndexProduct].quantity;
      salaryElement.innerHTML = `${arrOfSaveProducts[targetIndexProduct].quantity * arrOfSaveProducts[targetIndexProduct].price}$`

      // Update total count and price
      getAllPrice(arrOfSaveProducts)

      // Calculate total count
      let totalCount = 0;
      arrOfSaveProducts.forEach(element => {
        totalCount += element.quantity;
      });
      numSaveProducts.innerHTML = totalCount;
      saveCartsIcon.querySelector("span").innerHTML = totalCount;
    }

  } else if (decreaseBtn) {

    let count = decreaseBtn.previousElementSibling;

    if (+count.innerHTML > 1) {

      // To Get Name Of Product
      let nameOfProduct = decreaseBtn.closest(".info").querySelector(".info > h2").textContent.trim()

      // To Get Index Of Obgect For Product
      let targetIndexProduct = arrOfSaveProducts.findIndex((product) => {
        return product.name.toLowerCase() === nameOfProduct.toLowerCase();
      })

      if (targetIndexProduct !== -1) {
        // Decrease quantity
        arrOfSaveProducts[targetIndexProduct].quantity -= 1;

        // Save to localStorage
        storeSaveProductsLS(arrOfSaveProducts, add_to_cart_clicked_arr)

        // Update UI elements
        let salaryElement = decreaseBtn.closest(".info").querySelector(".salary")
        let count = decreaseBtn.previousElementSibling;

        count.innerHTML = arrOfSaveProducts[targetIndexProduct].quantity;
        salaryElement.innerHTML = `${arrOfSaveProducts[targetIndexProduct].quantity * arrOfSaveProducts[targetIndexProduct].price}$`

        // Update total count and price
        getAllPrice(arrOfSaveProducts)

        // Calculate total count
        let totalCount = 0;
        arrOfSaveProducts.forEach(element => {
          totalCount += element.quantity;
        });
        numSaveProducts.innerHTML = totalCount;
        saveCartsIcon.querySelector("span").innerHTML = totalCount;
      }

    }
  }
})

// Function To Evalution Of Product By Stars

// To Get All Products Container
let allProductsContainer = document.querySelectorAll(".products");

allProductsContainer.forEach(productsContainer => {

  productsContainer.addEventListener("click", (e) => {
    // To Get Container Of Stars
    let starsContainer = e.target.closest(".stars");

    if (starsContainer) {
      // To Get Every Stars
      let stars = starsContainer.querySelectorAll(".stars > i")

      stars.forEach((element, index) => {
        element.addEventListener("click", () => {

          for (let i = 0; i < stars.length; i++) {

            if (i <= index) stars[i].style.color = "#ff230f";

            else stars[i].style.color = "black";
          }
        })
      });
    }
  })

});


// Icrease Love Product Button

// window.localStorage.clear()

function addLove(e) {

  let love = e.target.closest(".love")


  if (!(love.classList.contains("activeLove"))) {
    love.classList.add("activeLove")

    loveAllProducts++

    window.localStorage.setItem("loveProducts", loveAllProducts)

    loveProduct.innerHTML = loveAllProducts;

    lovesBttn.push(love.dataset.id)

    window.localStorage.setItem("loveProductsArr", JSON.stringify(lovesBttn))

  } else {
    love.classList.remove("activeLove")

    loveAllProducts--;

    window.localStorage.setItem("loveProducts", loveAllProducts)

    loveProduct.innerHTML = loveAllProducts;

    lovesBttn.splice(lovesBttn.indexOf(love.dataset.id), 1);

    window.localStorage.setItem("loveProductsArr", JSON.stringify(lovesBttn))

    console.log(lovesBttn)
  }



}

document.querySelector(".save-products > a:first-child").addEventListener("click", (e) => e.preventDefault())

// Show Nav Men Wheb Click Menu
navMenu.addEventListener("click", () => {
  navLinks.classList.add("show-menu-nav")
})
closeNavMenu.addEventListener("click", () => {
  navLinks.classList.remove("show-menu-nav")
})

// When Click On Checkout To Remove Prevent Default And Go To The Checkout Page
const chechOutBttn = document.getElementById("check-out");
chechOutBttn.addEventListener("click", (e) => {
  // window.location.href = "checkout.html";
  window.open("checkout.html", "_blank")
})