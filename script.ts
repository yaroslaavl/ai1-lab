interface Style {
  name: string;
  path: string;
}

const styles: Record<string, Style> = {
  style1: { name: "Style 1", path: "./css/style.css" },
  style2: { name: "Style 2", path: "./css/style2.css" },
  style3: { name: "Style 3", path: "./css/style3.css" }
};

let currentStyleKey: string = "style1";

function addStyleLink(href: string): void {
  const existingLink = document.getElementById("style-link") as HTMLLinkElement;
  if (existingLink) {
    existingLink.href = href;
  } else {
    const link = document.createElement("link");
    link.id = "style-link";
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}

function generateStyleLinks(): void {
  const container = document.getElementById("style-links");

  if (!container) {
    console.error("Error!");
    return;
  }
  container.innerHTML = "";

  Object.keys(styles).forEach((key) => {
    const button = document.createElement("button");
    button.textContent = styles[key].name;
    button.style.marginRight = "10px";

    if (key === currentStyleKey) {
      button.style.backgroundColor = "#007BFF";
      button.style.color = "#FFFFFF";
    } else {
      button.style.backgroundColor = "#FFFFFF";
      button.style.color = "#000000";
    }

    button.addEventListener("click", () => {
      if (key !== currentStyleKey) {
        console.log(`Changing: ${styles[key].name}`);
        switchStyle(key);
      }
    });

    console.log("Adding:", styles[key].name);
    container.appendChild(button);
  });

  const buttons = container.getElementsByTagName('button');
  console.log(`Create button: ${buttons.length}`);
}
function switchStyle(key: string): void {
  if (!styles[key]) {
    console.warn(`Style key '${key}' not found!`);
    return;
  }

  currentStyleKey = key;
  addStyleLink(styles[key].path);
  generateStyleLinks();
}

document.addEventListener("DOMContentLoaded", () => {
  addStyleLink(styles[currentStyleKey].path);
  generateStyleLinks();
});
