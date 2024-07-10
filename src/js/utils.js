export function createElement(type, props = {}, children = []) {
  const element = document.createElement(type);

  // Set attributes
  Object.entries(props).forEach(([key, value]) => {
    if (key === "textContent") {
      element.textContent = value;
    } else if (key.includes("-")) {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  });

  // Append children
  children.forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
    } else {
      element.appendChild(document.createTextNode(String(child)));
    }
  });

  return element;
}

export async function fetchData(apiEndpoint, key = "") {
  try {
    const url = key ? `${apiEndpoint}&api_key=${key}` : apiEndpoint;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        },
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

export function formatTime(timestamp) {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function capitalize(word) {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}

export function validateEmail(email) {
  // Basic email validation using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  // Basic password validation: minimum 8 characters
  return password.length >= 8;
}

export function toggleLike(breedId) {
  const isLiked = localStorage.getItem(breedId) === "true";
  localStorage.setItem(breedId, !isLiked);
  updateLikeButtons(breedId);
}

function updateLikeButtons(breedId) {
  document.querySelectorAll(".like-button").forEach((button) => {
    const buttonBreedId = button.parentElement
      .querySelector("a")
      .getAttribute("href")
      .split("/")
      .pop();
    if (
      breedId === `dog-${buttonBreedId}` ||
      breedId === `cat-${buttonBreedId}`
    ) {
      const isLiked = localStorage.getItem(breedId) === "true";
      button.textContent = isLiked ? "Unlike ⭐️" : "Like 🌟";
      button.classList.toggle("liked", isLiked);
    }
  });
}

export function toggleLikeDetails(breedId) {
  const isLiked = localStorage.getItem(breedId) === "true";
  localStorage.setItem(breedId, !isLiked);
  updateLikeButtonsDetails(breedId);
}

function updateLikeButtonsDetails(breedId) {
  const id = breedId;
  document.querySelectorAll(".like-button").forEach((button) => {
    const breedId = id;
    const isLiked = localStorage.getItem(breedId) === "true";
    button.textContent = isLiked ? "Unlike ⭐️" : "Like 🌟";
    button.classList.toggle("liked", isLiked);
  });
}

export function visit(visitMessage) {
  const lv = Number(localStorage.getItem("visits-ls"));
  const today = new Date();
  const todayTimestamp = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();
  const difference = Math.round((todayTimestamp - lv) / (1000 * 60 * 60 * 24));
  localStorage.setItem("visits-ls", todayTimestamp);

  if (lv !== 0) {
    visitMessage.textContent = `Hey, it's been ${difference} day(s) since your last visit.`;
  } else {
    visitMessage.textContent = `Welcome to the page! We hope that you enjoy visiting the page.`;
  }

  setTimeout(() => {
    visitMessage.textContent = "";
  }, 10000);
}
