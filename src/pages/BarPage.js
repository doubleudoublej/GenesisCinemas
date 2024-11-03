import "../components/WineBanner.js";
import "../components/FoodCard.js";
import "../components/DrinksCard.js";
import "../components/AlcoholCard.js";
import "../components/WineCard.js";
import { FoodCard } from "../components/FoodCard.js";
import { DrinksCard } from "../components/DrinksCard.js";
import { AlcoholCard } from "../components/AlcoholCard.js";
import { WineCard } from "../components/WineCard.js";

class BarPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 0;
          color: #333;
          background-color: #1e1e1e;
        }
        .page-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 0;
        }
        .page-content h1 {
          align-self: center;
          font-family: 'Italiana', serif;
          font-size: 3rem;
          font-weight: normal;
          margin-bottom: 10px;
          color: white;
          text-decoration: underline;
          text-decoration-color: white;
          text-decoration-thickness: 2px;
          border-radius: 10px;
          cursor: pointer;
        }
        .item-list {
          display: none; /* Initially hide all lists */
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .item-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
      </style>
      <div class="page-content">
        <wine-banner></wine-banner>
        <h1 class="toggle-header" data-target=".food-list">Food List</h1>
        <div class="food-list item-list"></div>
        <h1 class="toggle-header" data-target=".drink-list">Drinks List</h1>
        <div class="drink-list item-list"></div>
        <h1 class="toggle-header" data-target=".wine-list">Wine List</h1>
        <div class="wine-list item-list"></div>
        <h1 class="toggle-header" data-target=".alcohol-list">Alcohol List</h1>
        <div class="alcohol-list item-list"></div>
      </div>
    `;
  }

  connectedCallback() {
    // Add event listeners to toggle the visibility of each section
    const headers = this.shadowRoot.querySelectorAll(".toggle-header");
    headers.forEach((header) => {
      header.addEventListener("click", () => {
        const targetSelector = header.getAttribute("data-target");
        const targetElement = this.shadowRoot.querySelector(targetSelector);

        // Check if the element is hidden or visible
        if (window.getComputedStyle(targetElement).display === "none") {
          targetElement.style.display = "flex"; // Show the section
        } else {
          targetElement.style.display = "none"; // Hide the section
        }
      });
    });

    // Fetch items for each category
    this.fetchFoodItems();
    this.fetchDrinkItems();
    this.fetchWineItems();
    this.fetchAlcoholItems();
  }

  fetchFoodItems() {
    fetch("./services/fetch_food.php") // Adjust the path as necessary
      .then((response) => response.json())
      .then((foodItems) => this.renderFoodItems(foodItems))
      .catch((error) => {
        console.error("Error fetching food items:", error);
        this.renderFoodItems({ error: "Failed to fetch food items" });
      });
  }

  renderFoodItems(foodItems) {
    const foodList = this.shadowRoot.querySelector(".food-list");
    foodList.innerHTML = ""; // Clear previous items

    if (Array.isArray(foodItems)) {
      foodItems.forEach((item) => {
        const foodCard = new FoodCard(
          item.name,
          item.image_url,
          item.price,
          item.description
        );
        foodList.appendChild(foodCard);
      });
    } else {
      // Handle the error case (display an error message)
      const errorMessage = document.createElement("div");
      errorMessage.textContent =
        "Error fetching food items: " + (foodItems.error || "Unknown error");
      foodList.appendChild(errorMessage);
    }
  }

  fetchDrinkItems() {
    fetch("./services/fetch_drinks.php") // Adjust the path as necessary
      .then((response) => response.json())
      .then((drinkItems) => this.renderDrinkItems(drinkItems))
      .catch((error) => {
        console.error("Error fetching drink items:", error);
        this.renderDrinkItems({ error: "Failed to fetch drink items" });
      });
  }

  renderDrinkItems(drinkItems) {
    const drinkList = this.shadowRoot.querySelector(".drink-list");
    drinkList.innerHTML = ""; // Clear previous items

    if (Array.isArray(drinkItems)) {
      drinkItems.forEach((item) => {
        const drinkCard = new DrinksCard(
          item.name,
          item.image_url,
          item.price,
          item.description
        );
        drinkList.appendChild(drinkCard);
      });
    } else {
      // Handle the error case (display an error message)
      const errorMessage = document.createElement("div");
      errorMessage.textContent =
        "Error fetching drink items: " + (drinkItems.error || "Unknown error");
      drinkList.appendChild(errorMessage);
    }
  }

  fetchWineItems() {
    fetch("./services/fetch_wine.php") // Adjust the path as necessary
      .then((response) => response.json())
      .then((wineItems) => this.renderWineItems(wineItems))
      .catch((error) => {
        console.error("Error fetching wine items:", error);
        this.renderWineItems({ error: "Failed to fetch wine items" });
      });
  }

  renderWineItems(wineItems) {
    const wineList = this.shadowRoot.querySelector(".wine-list");
    wineList.innerHTML = ""; // Clear previous items

    if (Array.isArray(wineItems)) {
      wineItems.forEach((item) => {
        const wineCard = new WineCard(
          item.name,
          item.image_url,
          item.price,
          item.description
        );
        wineList.appendChild(wineCard);
      });
    } else {
      // Handle the error case (display an error message)
      const errorMessage = document.createElement("div");
      errorMessage.textContent =
        "Error fetching wine items: " + (wineItems.error || "Unknown error");
      wineList.appendChild(errorMessage);
    }
  }

  fetchAlcoholItems() {
    fetch("./services/fetch_alcohol.php") // Adjust the path as necessary
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((alcoholItems) => this.renderAlcoholItems(alcoholItems))
      .catch((error) => {
        console.error("Error fetching alcohol items:", error);
        this.renderAlcoholItems({ error: "Failed to fetch alcohol items" });
      });
  }

  renderAlcoholItems(alcoholItems) {
    const alcoholList = this.shadowRoot.querySelector(".alcohol-list");
    alcoholList.innerHTML = ""; // Clear previous items

    if (Array.isArray(alcoholItems)) {
      alcoholItems.forEach((item) => {
        const alcoholCard = new AlcoholCard(
          item.name,
          item.image_url,
          item.price,
          item.description
        );
        alcoholList.appendChild(alcoholCard);
      });
    } else {
      // Handle the error case (display an error message)
      const errorMessage = document.createElement("div");
      errorMessage.textContent =
        "Error fetching alcohol items: " +
        (alcoholItems.error || "Unknown error");
      alcoholList.appendChild(errorMessage);
    }
  }
}

customElements.define("bar-page", BarPage);
