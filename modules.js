import phones from "./data.json" assert { type: "json" };

let totalPhones = phones.length;
document.getElementById("phone-count").innerHTML = totalPhones;
let wishListElements = [];
let cartElements = [];

//function to sort according to price
export function sortLowHigh() {
  document.getElementById("result-count-phones").innerHTML = 0;
  document.getElementById("results-page").innerHTML = "";
  var tempSort = phones;

  //sorting algorithm
  tempSort.sort((x, y) => x.discountedPrice - y.discountedPrice);

  for (var i = 0; i < tempSort.length; i++) {
    document.getElementById("result-count-phones").innerHTML++;
    printSpecificCard(i);
  }
  wishList();
  addToCart();
  searchProduct();
}

//function to sort according to ratings
export function ratingSort() {
  document.getElementById("result-count-phones").innerHTML = 0;
  document.getElementById("results-page").innerHTML = "";

  phones.sort((x, y) => y.rating - x.rating);

  for (var i = 0; i < phones.length; i++) {
    document.getElementById("result-count-phones").innerHTML++;
    printSpecificCard(i);
  }
  wishList();
  addToCart();
  searchProduct();
}

//Sort according to newest first
export function newestFirstSort() {
  document.getElementById("result-count-phones").innerHTML = 0;
  document.getElementById("results-page").innerHTML = "";

  phones.sort((x, y) => y.isNew - x.isNew);

  console.log(phones);

  for (var i = 0; i < phones.length; i++) {
    printSpecificCard(i);
  }
  wishList();
  addToCart();
}

//function to print a particular card
export function printSpecificCard(i) {
  //html structure for the card element inside backticks

  const box = `<div class="mobile-card" tabindex="0">
  <div class="new-sale-component">
  <div class="new-product ${isNew(i)}">
      NEW
  </div>
  <div class="sale-product ${isSale(i)}">
      SALE
  </div>
</div>
    <div class="mobile-card-contents">    
    <span><i class="fa-regular fa-heart heart-icon-image " tabindex="2" ></i></span>
        <div class="phone-image">
        <div class="hover-buttons-div">
      <button class="hover-button pink-button">ADD TO CART</button>
      <button class="hover-button blue-button">VIEW GALLERY</button>
    </div>        
          <img src=${phones[i].productImage} alt="pixel6a">
    </div>        
        <div class="name-price-div">
           <a href="">
              <p id="product-name" tabindex="1">${phones[i].productName} (${
    phones[i].color
  }, ${phones[i].storage})</p>
           </a>
            <div class="ratings">
                <span><i class="fa-solid fa-star star_rating ${
                  phones[i].id
                }" id=1></i></span>
                <span><i class="fa-solid fa-star star_rating ${
                  phones[i].id
                }"></i></span>
                <span><i class="fa-solid fa-star star_rating ${
                  phones[i].id
                }" id=3></i></span>
                <span><i class="fa-solid fa-star star_rating ${
                  phones[i].id
                }" id=4></i></span>
                <span><i class="fa-solid fa-star star_rating ${
                  phones[i].id
                }" id=5></i></span>
                <span class="total-ratings">(${phones[i].ratingsTotal})</span>
            </div>
            <div class="price-discount">
                <p id="product-price">$${discounted_price(
                  phones[i].priceOriginal,
                  phones[i].discount,
                  i
                )}
                <span id="actual-price">$${phones[i].priceOriginal}</span>
                <span id="discount">${phones[i].discount}% off</span>
            </p>
            </div>
            <div class="product-colors">
                <div class="color-grey">                    
                </div>
                <div class="color-black">
                </div>
                <div class="color-yellow">
                </div>
            </div>
        </div>    
    </div>        
    </div>
    
</div>`;
  function isSale(i) {
    if (phones[i].isSale) {
      const box = "it-is-on-sale";
      return box;
    }
  }
  function isNew(i) {
    if (phones[i].isNew) {
      const box = "it-is-on-sale";
      return box;
    }
  }
  document.getElementById("results-page").innerHTML += box; //pasting box data inside the empty div container mentioned in the html structure
  colorizeRating(phones[i].rating, i);
  //
}

//Ratings color function
export function colorizeRating(rating, i) {
  let ratings = document.getElementsByClassName(
    "fa-solid fa-star star_rating " + phones[i].id
  );

  for (let j = 0; j < phones[i].rating; j++) {
    ratings[j].style.color = "#FF3465";
  }
}

//Function to calculate discounted price and return the final discounted price
export function discounted_price(orig_price, discount, i) {
  let final_price = (discount / 100) * orig_price;
  final_price = orig_price - final_price;
  phones[i].discountedPrice = final_price;
  return final_price;
}

//function to scroll to top
export function scroll_to_top() {
  window.scrollTo(0, 0);
}
export function createCards() {
  //Function to create div cards
  document.getElementById("result-count-phones").innerHTML = 0;
  document.getElementById("results-page").innerHTML = "";
  for (var i = 0; i < phones.length; i++) {
    document.getElementById("result-count-phones").innerHTML++;
    printSpecificCard(i);
    colorizeRating(phones[i].rating, i);
  }
  wishList();
  addToCart();
}

//function to search for a specific product from input text field
export function searchProduct() {
  document.getElementById("result-count-phones").innerHTML = 0;
  document.getElementById("results-page").innerHTML = "";

  var substring = document.getElementById("search-box").value;
  document.getElementById("search-keyword").innerHTML = '"' + substring + '"';

  var lowercase = substring.toLowerCase();

  for (var i = 0; i < phones.length; i++) {
    let string = phones[i].productName;
    var str_lowercase = string.toLowerCase();

    let result = str_lowercase.includes(lowercase);
    if (result) {
      document.getElementById("result-count-phones").innerHTML++;

      printSpecificCard(i);
    }
  }
  if (document.getElementById("result-count-phones").innerHTML == 0) {
    errorFunction();
  }
  wishList();
}

//function to wish list
export function wishList() {
  var heart_array = document.getElementsByClassName("heart-icon-image");
  for (var i = 0; i < heart_array.length; i++) {
    var heart = heart_array[i];

    heart.addEventListener("click", function () {
      if (!wishListElements.includes(this)) {
        this.style.color = "#ff3465";
        this.style.fontWeight = 900;
        document.getElementById("wish-list-counter").innerHTML =
          wishListElements.length + 1;
        wishListElements.push(this);
        console.log(wishListElements);
      } else {
        this.style.color = "black";
        this.style.fontWeight = 200;
        document.getElementById("wish-list-counter").innerHTML =
          wishListElements.length + -1;
        wishListElements.pop();
        console.log(wishListElements);
      }
    });
  }
  for (var i = 0; i < wishListElements.length; i++) {
    wishListElements[i].style.color = "red";
    wishListElements[i].style.fontWeight = 900;
  }
}

//function to add to cart
export function addToCart() {
  var shoppingBagArray = document.getElementsByClassName("pink-button");

  for (var i = 0; i < shoppingBagArray.length; i++) {
    var shoppingBag = shoppingBagArray[i];

    shoppingBag.addEventListener("click", function () {
      if (!cartElements.includes(this)) {
        this.style.backgroundColor = "black";
        document.getElementById("add-to-cart-counter").innerHTML =
          cartElements.length + 1;
        cartElements.push(this);
        removeEventListener("click", myfunction());
      } else {
        this.style.backgroundColor = "rgb(255, 53, 101)";
        document.getElementById("add-to-cart-counter").innerHTML =
          cartElements.length - 1;
        cartElements.pop();
      }
    });
  }
}

//function to show the products according to brands
export function findBrand() {
  document.getElementById("clear-all").addEventListener("click", clearAll);
  document.getElementById("clear-all").style.color = "red";
  document.getElementById("result-count-phones").innerHTML = 0;
  document.getElementById("results-page").innerHTML = "";
  $("#filter-contents").show();
  $("#clear-all").show();

  let filterElements = [];

  var googlecheckBox = document.getElementById("google");
  var appleCheckBox = document.getElementById("apple");
  var xiaomiCheckBox = document.getElementById("xiaomi");
  document.getElementById("filter-contents").innerHTML = "";

  if (googlecheckBox.checked) {
    if (!filterElements.includes("Google")) {
      filterElements.push("Google");
    }

    for (var i = 0; i < phones.length; i++) {
      if (phones[i].brand == "Google") {
        document.getElementById("result-count-phones").innerHTML++;
        printSpecificCard(i);
      }
    }

    wishList();
  }

  if (appleCheckBox.checked) {
    if (!filterElements.includes("Apple")) {
      filterElements.push("Apple");
    }
    for (var i = 0; i < phones.length; i++) {
      if (phones[i].brand === "Apple") {
        document.getElementById("result-count-phones").innerHTML++;
        printSpecificCard(i);
      }
    }
    wishList();
  }

  if (xiaomiCheckBox.checked) {
    if (!filterElements.includes("Xiaomi")) {
      filterElements.push("Xiaomi");
    }
    for (var i = 0; i < phones.length; i++) {
      if (phones[i].brand === "Xiaomi") {
        document.getElementById("result-count-phones").innerHTML++;
        printSpecificCard(i);
      }
    }
    wishList();
  }

  if (
    !googlecheckBox.checked &&
    !appleCheckBox.checked &&
    !xiaomiCheckBox.checked
  ) {
    createCards();
    wishList();
    addToCart();
    $("#filter-contents").hide();
  }
  addToCart();
  for (var i = 0; i < filterElements.length; i++) {
    console.log(filterElements[i]);
    createFilter(filterElements[i]);
  }
}

//function to clear all the filters
export function clearAll(ev) {
  ev.preventDefault();

  $("#brand-contents").hide();
  $("#price-contents").slideToggle();
  document.getElementById("results-page").innerHTML = "";
  document.getElementById("filter-contents").innerHTML = "";
  document.getElementById("google").checked = false;
  document.getElementById("apple").checked = false;
  document.getElementById("xiaomi").checked = false;
  document.getElementById("minprice").innerHTML = 100;
  document.getElementById("maxprice").innerHTML = 1000;
  createCards();
}

//function to create automatic filter in the filters applied section
function createFilter(brandName) {
  const filterBox = `
  <p>${brandName}</p>
  `;

  document.getElementById("filter-contents").innerHTML += filterBox;
}

//function for price slider
export function priceRange() {
  document.getElementById("clear-all").addEventListener("click", clearAll);
  document.getElementById("clear-all").style.color = "red";
  var tempRangeContainer = phones;
  document.getElementById("result-count-phones").innerHTML = 0;

  document.getElementById("results-page").innerHTML = "";
  var minPrice = document.getElementById("minprice").innerHTML;
  var maxPrice = document.getElementById("maxprice").innerHTML;

  var ctr = 0;
  for (var i = 0; i < tempRangeContainer.length; i++) {
    if (
      minPrice <= tempRangeContainer[i].priceOriginal &&
      tempRangeContainer[i].priceOriginal <= maxPrice
    ) {
      ctr++;
      printSpecificCard(i);
    }
  }
  if (ctr == 0) {
    errorFunction();
  }
  wishList();
  addToCart();
  document.getElementById("result-count-phones").innerHTML = ctr;
}

//Function to validate email address
export function isEmail() {
  var email = document.getElementById("email-input").value;
  // regular expression to match an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // test the email against the regular expression
  if (emailRegex.test(email)) {
    $("#verified").show();
    $("#not-verified").hide();
    document.getElementById("subscribe-btn").innerHTML = "SUBSCRIBED";
  } else if (!emailRegex.test(email)) {
    $("#verified").hide();
    $("#not-verified").show();
    document.getElementById("subscribe-btn").innerHTML = "SUBSCRIBE";
  }
}

//Function to show 404 Error when no product is found
export function errorFunction() {
  document.getElementById("results-page").innerHTML = "";
  const box = `
  <div class="error-image">
            <img src="/assets/images/errorimage.png" alt="error image">
            <div class="error-image-texts">
                <p>No Products Found</p>
                <p>Please Change Your Filters</p>
                
                <a href="">Go Back</a>
                <a href="#">Go to home page</a>
            </div>
        </div>`;
  document.getElementById("results-page").innerHTML = box;
}

export function filterBtnAction() {
  document.getElementById("side-panel").style.display = "flex";
}
