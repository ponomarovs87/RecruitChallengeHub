window.onscroll = function () {
  scrollFunction();
};

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
