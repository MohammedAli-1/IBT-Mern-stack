"use strict";
const form = document.querySelector("#convert-form");
const input = document.querySelector("#amount");
const currencyList = document.querySelector("#currency");
const result = document.querySelector("#result");
const watchlist = document.querySelector("#watchlist");
const addWatchBtn = document.querySelector("#add-watch");
const status = document.querySelector("#status");
const API = "https://open.er-api.com/v6/latest/ETB";
const state = {
  rates: {},
  watchlist: [], //currency codes
  amount: "100",
  currency: "USD",
};
const STORAGE_KEY = "watch-key";
function save() {
  const data = {
    watchlist: state.watchlist,
    currency: state.currency,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function load() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  const data = JSON.parse(saved);
  state.watchlist = data.watchlist || [];
  state.currency = data.currency || "USD";
}
async function loadRates() {
  try {
    const res = await fetch(API);
    if (!res.ok) {
      throw new Error("Data could't load");
    }
    const data = await res.json();
    state.rates = data.rates;
    renderOption();
  } catch (err) {
    return `could't load data`;
  }
}
function renderOption() {
  const rate = state.rates;
  let option = Object.keys(rate).map((currency) => {
    if (currency == "ETB") return;
    return `
        <option value=${currency}>${currency}</option>
        `;
  });

  currencyList.innerHTML = option.join("");
}
loadRates();
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const amount = Number(input.value);
  state.amount = amount;
  const currency = currencyList.value;
  state.currency = currency;
  const rate = state.rates[currency];
  const converted = amount * rate;
  const formated = `${amount}-ETB =${converted.toFixed(2)} ${currency}`;
  result.textContent = formated;

  save();
});
addWatchBtn.addEventListener("click", function (event) {});

load();
