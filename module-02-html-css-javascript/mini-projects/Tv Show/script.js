"use strict";

const API = "https://api.tvmaze.com/search/shows";

const searchInput = document.getElementById("search-input");
const message = document.getElementById("message");
const showContainer = document.getElementById("shows");
const favoriteContainer = document.getElementById("favorites");
const form = document.getElementById("search-form");

const state = {
  shows: [],
  favorite: [],
  search: "",
};

function render() {
  showContainer.innerHTML = state.shows
    .map((show) => createCard(show))
    .join("");

  favoriteContainer.innerHTML = state.favorite
    .map((show) => createCard(show))
    .join("");

  localStorage.setItem("fav", JSON.stringify(state.favorite));
}

function getFavorite() {
  const data = localStorage.getItem("fav");

  state.favorite = data ? JSON.parse(data) : [];
}

function createCard(show) {
  const image = show.image?.medium || "placeholder.jpg";

  const saved = state.favorite.some((item) => item.id === show.id);

  return `
    <article>
      <img
        src="${image}"
        alt="${show.name}"
      />

      <div class="text-content">
        <h3 class="title">${show.name}</h3>

        <p>
          Rating: ${show.rating?.average ?? "N/A"}
        </p>

        <button onclick="addOrRemove(${show.id})">
          ${saved ? "Remove" : "Favorite"}
        </button>
      </div>
    </article>
  `;
}

function addOrRemove(id) {
  const existingFavorite = state.favorite.find((item) => item.id === id);

  if (existingFavorite) {
    state.favorite = state.favorite.filter((item) => item.id !== id);
  } else {
    const show = state.shows.find((item) => item.id === id);

    if (show) {
      state.favorite.push(show);
    }
  }

  render();
}

async function loadShows(query) {
  message.textContent = "Loading...";

  try {
    const response = await fetch(`${API}?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error("Failed to fetch shows");
    }

    const data = await response.json();

    state.shows = data.map((item) => item.show);

    message.textContent = "";

    render();
  } catch (error) {
    console.error(error);

    message.textContent = "Something went wrong. Please try again.";
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    message.textContent = "Please enter a TV show name.";
    return;
  }

  state.search = searchTerm;

  loadShows(searchTerm);
  searchInput.value = "";
});

function init() {
  getFavorite();
  loadShows("muslim");
}

init();
("use strict");
