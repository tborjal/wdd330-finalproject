import { createElement, visit } from "./utils";
import { initRouter } from "./router";
import { initDogRouter } from "./dogRouter";
import { initCatRouter } from "./catRouter";

function Header(mainDiv) {
  const siteIcon = createElement("img", {
    src: "https://raw.githubusercontent.com/fireburn553/dog-cat-and-weather/main/src/images/dogAndCat.webp",
    alt: "Dog and Cat Icon",
  });

  const appTitle = createElement("h1", {
    textContent: "🐾DOG•CAT•WEATHER🐾",
    className: "heading",
  });

  const visitMessage = createElement("div", {
    className: "visitDisplay",
  });

  visit(visitMessage);

  // nav items
  const home = createElement("a", {
    href: "/#/home",
    textContent: "HOME",
  });
  const dog = createElement("a", {
    href: "/#/dog",
    textContent: "DOG",
  });
  const cat = createElement("a", {
    href: "/#/cat",
    textContent: "CAT",
  });

  const weather = createElement("a", {
    href: "/#/weather",
    textContent: "WEATHER",
  });

  const join = createElement("a", {
    href: "/#/join",
    textContent: "JOIN",
  });

  const nav = createElement("nav", { id: "navId" }, [
    home,
    dog,
    cat,
    weather,
    join,
  ]);
  return createElement("header", {}, [siteIcon, appTitle, visitMessage, nav]);
}

function Footer() {
  const copyright = createElement("span", {
    textContent: `Copyright © ${new Date().getFullYear()}`,
  });

  const lastModified = createElement("span", {
    className: "last-modified",
    textContent: `Last Modified: ${document.lastModified}`,
  });

  const nameDeveloper = createElement("span", {
    className: "name-developer",
    textContent: `Developer: FireBurn`,
  });

  return createElement("footer", {}, [nameDeveloper, copyright, lastModified]);
}

function App() {
  const main = createElement("main", {}, []);

  initRouter(main);
  initDogRouter(main);
  initCatRouter(main);

  return createElement("div", {}, [Header(main), main, Footer()]);
}

export default App;
