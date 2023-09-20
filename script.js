import phones from "./data.json" assert { type: "json" };
import {
  filterBtnAction,
  priceRange,
  ratingSort,
  newestFirstSort,
  findBrand,
  wishList,
  searchProduct,
  scroll_to_top,
  createCards,
  sortLowHigh,
  colorizeRating,
  printSpecificCard,
  addToCart,
  isEmail,
} from "./modules.js";
let totalPhones = phones.length;
let saleProduct = document.getElementsByClassName("sale-product");
console.log(saleProduct);
//event listeners and function calls
for (var i = 0; i < phones.length; i++) {
  document.getElementById("result-count-phones").innerHTML++;

  printSpecificCard(i);
  colorizeRating(phones[i].rating, i);
}

wishList();
addToCart();
//............................. declarations........................
let scrollToTop = document.getElementById("scroll-to-top");
let displayAllPhones = document.getElementById("display-all-phones");
let sortLowHighBtn = document.getElementById("sort-low-high");
let ratingSortBtn = document.getElementById("ratings-sort");
let newestFirst = document.getElementById("newest-first");
let subscribeBtn = document.getElementById("subscribe-btn");
let searchBox = document.getElementById("search-box");
let brandContents = document.getElementById("brand-contents");
let minMaxPrice = document.getElementById("minprice");

//..........................function calling..........................
scrollToTop.addEventListener("click", scroll_to_top);
displayAllPhones.addEventListener("click", createCards);
sortLowHighBtn.addEventListener("click", sortLowHigh);
ratingSortBtn.addEventListener("click", ratingSort);
newestFirst.addEventListener("click", newestFirstSort);
subscribeBtn.addEventListener("click", isEmail);
searchBox.addEventListener("change", searchProduct);
brandContents.addEventListener("change", findBrand);
minMaxPrice.addEventListener("DOMSubtreeModified", priceRange);

$(document).ready(function () {
  //--------------------declarations-------------------------//
  let brandContents = $("#brand-contents");
  let filterContents = $("#filter-contents");
  let priceContents = $("#price-contents");
  let mobileSortByDiv = $(".mobile-sort-by-div");
  let dropDownHeading = $("#drop-down-heading");
  let filterDropDownHeading = $("#filter-drop-down-heading");
  let sortByClickables = $(".sort-by-clickables");
  let priceHeading = $("#price-heading");
  let filterBtn = $("#filter-btn");
  let totalResult = $(".total-results");
  let sidePanel = $("#side-panel");
  let sortByBtn = $(".sort-by-btn");
  let homeMobile = $(".home-mobile");
  let resultsText = $(".results-text");
  let mainContentTitles = $(".main-content-titles");
  let closeFilter = $("#close-filter");

  //function to reset all the side panel contents
  resetFunction();
  function resetFunction() {
    brandContents.hide();
    filterContents.hide();
    priceContents.hide();
    mobileSortByDiv.hide();
  }

  //for showing the brand contents
  dropDownHeading.on("click", function (event) {
    event.preventDefault();
    brandContents.slideToggle();
  });

  //for filter section
  filterDropDownHeading.on("click", function (event) {
    event.preventDefault();
    //slide toggle creates a delay because it is waiting for the animations to be finished in order to complete the next task
    filterContents.slideToggle();
  });

  //for price sections
  priceHeading.on("click", function (event) {
    event.preventDefault();
    priceContents.slideToggle();
  });

  //Function to make active classes in sort by section
  sortByClickables.click(function (event) {
    sortByClickables.removeClass("active"); //removes all active classes in the sections
    event.preventDefault(); //prevents from refresh
    $(this).addClass("active"); //adds active class to the particular element
  });

  //price slider UI
  $("#slider").slider({
    range: true,
    min: 100,
    max: 1000,
    values: [100, 1000],
    slide: function (event, ui) {
      document.getElementById("minprice").innerText = `${ui.values[0]}`;
      document.getElementById("maxprice").innerText = `${ui.values[1]}`;
    },
  });

  filterBtn.on("click", function () {
    sidePanel.slideToggle();
  });
  sortByBtn.on("click", function () {
    sidePanel.hide();
    homeMobile.hide();
    resultsText.hide();

    mainContentTitles.slideToggle();
  });
  closeFilter.on("click", function () {
    sidePanel.slideToggle();
  });
});
