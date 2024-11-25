interface Style {
  name: string;
  path: string;
}

const styles: Record<string, Style> = {
  style1: { name: "style1.css", path: "./css/style.css" },
  style2: { name: "style2.css", path: "./css/style2.css" },
};

let currentStyleKey: string = "style1";
const switchButton = document.getElementById('switch-style') as HTMLButtonElement;
function addStyleLink(href: string): void {
  const existingStyleLink = document.getElementById('style-link') as HTMLLinkElement;
  if (existingStyleLink) {
    existingStyleLink.href = href;
  } else {
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = href;
    styleLink.id = 'style-link';
    document.head.appendChild(styleLink);
  }
}
addStyleLink(styles[currentStyleKey].path);
switchButton.addEventListener('click', () => {
  currentStyleKey = currentStyleKey === 'style1' ? 'style2' : 'style1';

  addStyleLink(styles[currentStyleKey].path);
});
