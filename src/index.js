import "./styles.css";

document.getElementById("app").innerHTML = `
<div class="overlay-screen"></div>
<nav>
    <a href="javascript:void(0);" data-name="menu-landing" >Home</a>
    <a href="javascript:void(0);" data-name="menu-content-a" >Content A</a>
    <a href="javascript:void(0);" data-name="menu-content-b">Content B</a>
</nav>
<main>
    <article>
    </article>
</main>
`;

let overlayScreen = document.querySelector(`.overlay-screen`);

function loadDoc(url, cFunction) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      cFunction(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function cFunctionInnerHTML(xhttp) {
  document.querySelector("main>article").innerHTML = xhttp.responseText;
  overlayScreenHide();
}

function menuEventListen(url, cFunction) {
  document
    .querySelector(`a[data-name="menu-${url}"]`)
    .addEventListener("click", function () {
      overlayScreen.classList.add("play");
      loadDoc(`${url}.html`, cFunction);
    });
}

function overlayScreenHide() {
  overlayScreen.addEventListener("animationend", function handler() {
    this.removeEventListener("animationend", handler);
    this.classList.remove("play");
  });
}

// Set initial content
loadDoc("landing.html", cFunctionInnerHTML);

// Assign evetns to menu
menuEventListen("landing", cFunctionInnerHTML);
menuEventListen("content-a", cFunctionInnerHTML);
menuEventListen("content-b", cFunctionInnerHTML);
