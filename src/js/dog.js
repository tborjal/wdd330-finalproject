// Import required functions from utils.js
import { createElement, fetchData, toggleLike } from "./utils";

async function dog() {
  let breedLinks = [];
  let linksBreed = "";
  let dog = "";

  const dogTitle = createElement("h2", { textContent: "DOG BREED" });

  try {
    const breeds = await fetchData(`https://api.thedogapi.com/v1/breeds`);
    breeds.forEach((breed) => {
      const breedId = `dog-${breed.id}`;
      const isLiked = localStorage.getItem(breedId) === "true";

      const likeButton = createElement(
        "button",
        {
          className: "like-button",
          textContent: isLiked ? "Unlike ⭐️" : "Like 🌟",
          onclick: () => toggleLike(breedId),
        },
        [],
      );
      const breedLink = createElement("div", { className: "breed-item" }, [
        createElement(
          "a",
          {
            href: `#/dog/details/${breed.id}`,
            textContent: breed.name,
          },
          [],
        ),
        likeButton,
      ]);

      const inputField = breedLink.querySelector("a");
      inputField.addEventListener("focus", () => {
        inputField.style.width = "200px";
      });
      likeButton.addEventListener("click", () => {
        if (localStorage.getItem(breedId) === "true") {
          alert(`You've liked the ${breed.name} dog!`);
        }
      });

      breedLinks.push(breedLink);
    });

    linksBreed = createElement("div", { className: "links" }, breedLinks);
  } catch (error) {
    console.error("Error in dog:", error);
    throw error;
  }
  return createElement("div", { className: "link-container" }, [
    dogTitle,
    linksBreed,
    dog,
  ]);
}

export default dog;
