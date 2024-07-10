import dogDetails from "./dogBreedDetails";

export async function initDogRouter(dogView) {
  function updateDogView(newView) {
    dogView.innerHTML = "";
    dogView.appendChild(newView);
  }

  function hashToDogRoute(hash) {
    const dogDetailsMatch = hash.match(/^#\/dog\/details\/(\w+)$/);
    if (dogDetailsMatch) {
      const breedId = dogDetailsMatch[1];
      dogDetails(breedId)
        .then(updateDogView)
        .catch((error) => console.error("Error updating view:", error));
    } else {
      console.log("else");
    }
  }

  const defaultHash = window.location.hash || "#/dog";
  console.log(defaultHash);
  hashToDogRoute(defaultHash);

  window.addEventListener("hashchange", (evt) => {
    const newUrl = new URL(evt.newURL);
    const hash = newUrl.hash;

    hashToDogRoute(hash);
  });
}
