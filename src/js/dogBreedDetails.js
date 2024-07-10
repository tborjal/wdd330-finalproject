// Import required functions from utils.js
import { createElement, fetchData, toggleLikeDetails } from "./utils";
const dogApiKey = process.env.DOG_API_KEY;

async function dogDetails(id) {
  try {
    const breedId = `dog-${id}`;
    const isLiked = localStorage.getItem(breedId) === "true";

    const likeButton = createElement(
      "button",
      {
        className: "like-button",
        textContent: isLiked ? "Unlike ⭐️" : "Like 🌟",
        onclick: () => toggleLikeDetails(breedId),
      },
      [],
    );

    likeButton.addEventListener("click", () => {
      if (localStorage.getItem(breedId) === "true") {
        alert(`You've liked the ${breed.name} dog!`);
      }
    });

    const dogBreedData = await fetchData(
      `https://api.thedogapi.com/v1/images/search?breed_ids=${id}&api_key=${dogApiKey}`,
    );

    const breed = dogBreedData[0].breeds[0];

    const breedImage = createElement("img", {
      className: "breed-img",
      src: dogBreedData[0].url,
      alt: breed.name + " picture",
    });
    const ImgContainer = createElement("div", { className: "img-container" }, [
      breedImage,
    ]);

    // Handle undefined or null values with default values or an empty string
    const name = breed.name || "Unknown Breed";
    const origin = breed.origin || "Unknown Origin";
    const weight = breed.weight ? breed.weight.metric : "Unknown Weight";
    const height = breed.height ? breed.height.metric : "Unknown Height";
    const bredFor = breed.bred_for || "Unknown Purpose";
    const breedGroup = breed.breed_group || "Unknown Breed Group";
    const lifeSpan = breed.life_span || "Unknown Life Span";
    const temperament = breed.temperament || "Unknown Temperament";

    const breedName = createElement("h3", { textContent: name });
    // Create a generic description paragraph
    const description = createElement("p", {
      textContent: `The ${name} is a captivating dog breed known for its distinctive features and unique characteristics. Originating from ${origin}, this breed showcases ${weight} and stands at ${height} inches tall. Bred for ${bredFor}, it falls under the ${breedGroup} category. With a life span of ${lifeSpan}, the ${name} exhibits a temperament described as ${temperament}. The breed has a rich history, originating from ${origin}. Whether for its physical traits or temperamental traits, the ${name} has become a beloved companion to many.`,
    });
    const detailsDiv = createElement(
      "div",
      { className: "details-container" },
      [breedName, description, likeButton],
    );

    return createElement("div", { className: "breed-details" }, [
      ImgContainer,
      detailsDiv,
    ]);
  } catch (error) {
    console.error("Error in dogDetails:", error);
    throw error;
  }
}

export default dogDetails;
