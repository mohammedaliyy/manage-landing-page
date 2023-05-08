// PopUp

const hamburger = document.querySelector(".header__hamburger");
const hamburgerClose = document.querySelector(".header__close");
const popup = document.querySelector(".popup");

hamburger.addEventListener("click", (e) => {
  e.preventDefault();
  hamburgerClose.style.display = "block";
  hamburger.style.display = "none";
  popup.classList.add("active");
});

hamburgerClose.addEventListener("click", (e) => {
  e.preventDefault();
  hamburgerClose.style.display = "none";
  hamburger.style.display = "block";
  popup.classList.remove("active");
});

// Configuring Comments Sections

import data from "../js/data.js";
const container = document.querySelector(".comments__body");
const newData = [];
let slices = null;

if (window.innerWidth > 780) {
  slices = 3;
  start(slices);
} else {
  slices = 1;
  start(slices);
}

function start(slices) {
  for (let i = 0; i < data.length; i += slices) {
    const triplets = data.slice(i, i + slices);
    newData.push(triplets);
  }

  function letsBuild(num = 0) {
    const spans = document.querySelectorAll(".comments__box");
    spans.forEach((e) => {
      e.remove();
    });

    for (let i = 0; i < newData[num].length; i++) {
      const el = document.createElement("div");
      el.classList.add("comments__box");

      const img = document.createElement("img");
      img.setAttribute("src", newData[num][i].imgScource);

      const h4 = document.createElement("h4");
      h4.textContent = newData[num][i].name;

      const p = document.createElement("p");
      p.textContent = newData[num][i].paragraph;

      el.append(img, h4, p);
      container.appendChild(el);
    }
  }
  letsBuild();
  console.log(newData);

  // span div
  const parentSpan = document.querySelector(".comments__spans");
  for (let i = 0; i < newData.length - 1; i++) {
    const span = document.createElement("span");
    span.setAttribute("data-num", `${i + 1}`);
    parentSpan.appendChild(span);
  }

  const span = document.querySelectorAll(".comments__spans span");

  span.forEach((i) => {
    i.addEventListener("click", (e) => {
      const number = i.getAttribute("data-num");
      letsBuild(+number);

      i.setAttribute("id", "active");

      span.forEach((e) => {
        if (i != e) {
          e.removeAttribute("id");
        }
      });
    });
  });
}
