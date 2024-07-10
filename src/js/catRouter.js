import catDetails from "./catBreedDetails";

export async function initCatRouter(catView) {
  function updateCatView(newView) {
    catView.innerHTML = "";
    catView.appendChild(newView);
  }

  function hashToCatRoute(hash) {
    const catDetailsMatch = hash.match(/^#\/cat\/details\/(\w+)$/);
    if (catDetailsMatch) {
      const breedId = catDetailsMatch[1];
      catDetails(breedId)
        .then(updateCatView)
        .catch((error) => console.error("Error updating view:", error));
    } else {
      console.log("else");
    }
  }

  const defaultHash = window.location.hash || "#/cat";
  console.log(defaultHash);
  hashToCatRoute(defaultHash);

  window.addEventListener("hashchange", (evt) => {
    const newUrl = new URL(evt.newURL);
    const hash = newUrl.hash;

    hashToCatRoute(hash);
  });
}
