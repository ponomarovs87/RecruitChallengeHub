window.onscroll = function () {
  scrollFunction();
};

let lastScrollTop = 0;

window.addEventListener("scroll", scrollUpShow, false);

function scrollUpShow() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    document.querySelector(".shoppingButtons").classList.add("hide");
  } else {
    document.querySelector(".shoppingButtons").classList.remove("hide");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

function scrollFunction() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressLine = document.querySelector(".progressLine");
  progressLine.style.width = scrolled + "%";
}
