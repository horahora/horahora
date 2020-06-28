// import Framework7 from "framework7";

// Import additional components
// import Searchbar from "framework7/components/searchbar/searchbar.js";
// import Calendar from "framework7/components/calendar/calendar.js";
// import Popup from "framework7/components/popup/popup.js";
//
// // Install F7 Components using .use() method on class:
// Framework7.use([Searchbar, Calendar, Popup]);

// Init app
const app = new Framework7({
  root: "#app",
  theme: "ios"
});

const $$ = Dom7;

const photoBrowser = app.photoBrowser.create({
  photos: Array.from(document.querySelectorAll(".photography-list a")).map(v =>
    v.getAttribute("href")
  ),
  theme: "dark",
  popupCloseLinkText: "关闭",
  navbarOfText: "/"
});

$$(".photography-list").on("click", "a", e => {
  photoBrowser.open(
    $$(e.target)
      .closest(".photo-item")
      .index()
  );
});

document.addEventListener("keyup", e => {
  // esc
  if (e.keyCode === 27) {
    e.preventDefault();
    photoBrowser.close();
  }
  console.log(e.keyCode);
  // left
  if (e.keyCode === 37) {
    photoBrowser.open(photoBrowser.activeIndex - 1);
  }
  // right
  if (e.keyCode === 39) {
    photoBrowser.open(photoBrowser.activeIndex + 1);
  }
});
