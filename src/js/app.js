import { createElement, visit } from "./utils";
import { initRouter } from "./router";
import { initDogRouter } from "./dogRouter";
import { initCatRouter } from "./catRouter";

function Header(mainDiv) {
  const siteIcon = createElement("img", {
    src: "https://raw.githubusercontent.com/tborjal/wdd330-finalproject/main/src/images/animals.webp",
    alt: "Dog and Cat Icon",
  });

  const appTitle = createElement("h1", {
    textContent: "🐾ANIMAL•WEATHER🐾",
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
    textContent: `Developer: tborjal`,
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
