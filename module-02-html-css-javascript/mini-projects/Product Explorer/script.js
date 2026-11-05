"use strict";
const API = "https://dummyjson.com/products";
const input = document.getElementById("search-input");
const form = document.getElementById("search-form");
const messageEl = document.getElementById("message");
const productContiner = document.getElementById("product");
const categorySelect = document.getElementById("category");

const state = {
  products: [],
  search: "",
  category: "all",
  sort: "default",
};
async function loadProduct(qurey) {
  try {
    const res = await fetch(`${API}/search?q=${qurey}`);
    console.log(res.ok);

    if (!res.ok) {
      throw new Error("Coudn't fetch data");
    }
    const data = await res.json();
    console.log(data.products.length);
    if (data.products.length === 0) {
      return (messageEl.textContent = "there is no Product");
    }
    state.products = data.products;

    console.log(state.products);
    render();
  } catch (error) {
    messageEl.textContent = `some thing went wrong, ${error.message}`;
  }
}

function render() {
  messageEl.textContent = "Loading...";
  productContiner.innerHTML = state.products
    .map((product) => createCard(product))
    .join("");
  messageEl.textContent = "";
}
function createCard(product) {
  return `
  <article class="card">
            <img src="${product.images[0]}" alt="${product.brand}" />
            <div class="Prodct-content">
              <h3>${product.title}</h3>
              <p> $${product.price} </p>
              <p>${product.category}</p>
              <p>${product.rating}</p>
            </div>
          </article>
  `;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const sterm = input.value.trim().toLowerCase();
  if (!sterm) {
    return (messageEl.textContent = "please enter the product you want");
  }
  state.search = sterm;
  loadProduct(sterm);
});
const categories = state.products.map((product) => product.category);

const uniqueCategories = [...new Set(categories)];
categorySelect.innerHTML = `
  <option value="all">All Categories</option>
  ${uniqueCategories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("")}
`;
function init() {
  render();
  loadProduct("all");
}
init();
