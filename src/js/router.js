import { createElement } from "./utils";
import home from "./home";
import dog from "./dog";
import cat from "./cat";
import weather from "./weather";
import join from "./join";
export async function initRouter(mainView) {
  function updateView(newView) {
    mainView.innerHTML = "";
    mainView.appendChild(newView);
  }

  function hashToRoute(hash) {
    switch (hash) {
      case "#/home":
        home()
          .then(updateView)
          .catch((error) => console.error("Error updating view:", error));
        break;

      case "#/dog":
        dog()
          .then(updateView)
          .catch((error) => console.error("Error updating view:", error));
        break;

      case "#/cat":
        cat()
          .then(updateView)
          .catch((error) => console.error("Error updating view:", error));
        break;

      case "#/weather":
        weather()
          .then(updateView)
          .catch((error) => console.error("Error updating view:", error));
        break;

      case "#/join":
        join()
          .then(updateView)
          .catch((error) => console.error("Error updating view:", error));
        break;

      default:
        updateView(createElement("h3", { textContent: "404 Page Not Found" }));
        break;
    }
  }

  const defaultHash = window.location.hash || "#/home";
  hashToRoute(defaultHash);

  window.addEventListener("hashchange", (evt) => {
    const newUrl = new URL(evt.newURL);
    const hash = newUrl.hash;

    hashToRoute(hash);
  });
}
