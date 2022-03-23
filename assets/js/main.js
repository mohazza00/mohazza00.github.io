/*=============== SETUP ON LOAD ===============*/
document.addEventListener("DOMContentLoaded", function () {
  loadCustomizationOptions();
  setTimeout(loadAfterTime, 200);
});

function loadAfterTime() {
  setTimeout(disableLoader, 200);
  const loader = document.querySelector(".loader-container");
  loader.classList.add("fade");
}
function disableLoader() {
  const loader = document.querySelector(".loader-container");
  loader.remove();
}
/*=============== GET ELEMENTS ===============*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
/*=============== SHOW MENU ===============*/

/*============== MENU HIDDEN ===============*/

/*=============== REMOVE MENU MOBILE ===============*/

/*=============== CHANGE BACKGROUND HEADER ===============*/

/*=============== TESTIMONIAL SWIPER ===============*/

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

/*=============== THEME/DISPLAY CUSTOMIZATION ===============*/
const theme = document.querySelector("#theme-button");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll(".select-size span");
const colorPalette = document.querySelectorAll(".select-color span");
var root = document.querySelector(":root");
const bg1 = document.querySelector(".bg-1");
const bg2 = document.querySelector(".bg-2");

// Open modal
theme.addEventListener("click", () => {
  themeModal.classList.add("active");
});

// Close modal
themeModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("customize-theme")) {
    themeModal.classList.remove("active");
  }
});

const loadCustomizationOptions = () => {
  //load custom font size
  if (
    localStorage.hasOwnProperty("fontSize") &&
    localStorage.hasOwnProperty("selectedFontSize")
  ) {
    let fontSize = localStorage.getItem("fontSize");
    let selectedFontSize = localStorage.getItem("selectedFontSize");
    removeSizeSelector();
    fontSizes[JSON.parse(selectedFontSize) - 1].classList.add("active");
    document.querySelector("html").style.fontSize = JSON.parse(fontSize);
  }

  //load primary color hue
  if (
    localStorage.hasOwnProperty("primaryHue") &&
    localStorage.hasOwnProperty("selectedHue")
  ) {
    let primaryHue = localStorage.getItem("primaryHue");
    let selectedHue = localStorage.getItem("selectedHue");
    removeColorSelector();
    colorPalette[JSON.parse(selectedHue) - 1].classList.add("active");
    root.style.setProperty("--primary-color-hue", primaryHue);
  }

  //load background color
  if (
    localStorage.hasOwnProperty("darkColorBrightness") &&
    localStorage.hasOwnProperty("whiteColorBrightness") &&
    localStorage.hasOwnProperty("selectedBackground") &&
    localStorage.hasOwnProperty("lightColorBrightness")
  ) {
    let darkColorBrightness = JSON.parse(
      localStorage.getItem("darkColorBrightness")
    );
    let whiteColorBrightness = JSON.parse(
      localStorage.getItem("whiteColorBrightness")
    );
    let lightColorBrightness = JSON.parse(
      localStorage.getItem("lightColorBrightness")
    );
    let selectedBackground = JSON.parse(
      localStorage.getItem("selectedBackground")
    );

    if (selectedBackground == 1) {
      bg2.classList.remove("active");
      bg1.classList.add("active");
    } else if (selectedBackground == 2) {
      bg1.classList.remove("active");
      bg2.classList.add("active");
    }

    root.style.setProperty("--white-color-lightness", whiteColorBrightness);
    root.style.setProperty("--dark-color-lightness", darkColorBrightness);
    root.style.setProperty("--light-color-lightness", lightColorBrightness);
  }
};

/*===== FONTS =====*/
//remove active class from selected span
const removeSizeSelector = () => {
  fontSizes.forEach((size) => {
    size.classList.remove("active");
  });
};

fontSizes.forEach((size) => {
  size.addEventListener("click", () => {
    let fontSize;
    let selectedFontSize;
    if (size.classList.contains("font-size-1")) {
      fontSize = "12px";
      selectedFontSize = 1;
    } else if (size.classList.contains("font-size-2")) {
      fontSize = "14px";
      selectedFontSize = 2;
    } else if (size.classList.contains("font-size-3")) {
      fontSize = "16px";
      selectedFontSize = 3;
    } else if (size.classList.contains("font-size-4")) {
      fontSize = "18px";
      selectedFontSize = 4;
    }

    // Save font size in local storage
    localStorage.setItem("fontSize", JSON.stringify(fontSize));
    localStorage.setItem("selectedFontSize", JSON.stringify(selectedFontSize));

    removeSizeSelector();
    size.classList.add("active");

    // Change font size of the root html element
    document.querySelector("html").style.fontSize = fontSize;
  });
});
/*===== PRIMARY COLORS =====*/
//remove active class from selected span
const removeColorSelector = () => {
  colorPalette.forEach((color) => {
    color.classList.remove("active");
  });
};

colorPalette.forEach((color) => {
  color.addEventListener("click", () => {
    let primaryHue;
    let selectedHue;

    if (color.classList.contains("color-1")) {
      primaryHue = 252;
      selectedHue = 1;
    } else if (color.classList.contains("color-2")) {
      primaryHue = 52;
      selectedHue = 2;
    } else if (color.classList.contains("color-3")) {
      primaryHue = 352;
      selectedHue = 3;
    } else if (color.classList.contains("color-4")) {
      primaryHue = 152;
      selectedHue = 4;
    } else if (color.classList.contains("color-5")) {
      primaryHue = 202;
      selectedHue = 5;
    }

    // Save color hue in local storage
    localStorage.setItem("primaryHue", JSON.stringify(primaryHue));
    localStorage.setItem("selectedHue", JSON.stringify(selectedHue));

    removeColorSelector();
    color.classList.add("active");

    // Change the primary colo hue
    root.style.setProperty("--primary-color-hue", primaryHue);
  });
});
/*===== THEME BACKGROUNDS =====*/
const changeBGColor = () => {
  root.style.setProperty("--white-color-lightness", whiteColorBrightness);
  root.style.setProperty("--dark-color-lightness", darkColorBrightness);
  root.style.setProperty("--light-color-lightness", lightColorBrightness);
};

let whiteColorBrightness;
let lightColorBrightness;
let darkColorBrightness;

let selectedBackground;

// change background color
bg1.addEventListener("click", () => {
  darkColorBrightness = "10%";
  whiteColorBrightness = "100%";
  lightColorBrightness = "97%";

  selectedBackground = 1;

  //add active class
  bg2.classList.remove("active");
  bg1.classList.add("active");

  changeBGColor();

  // Save background in local storage
  localStorage.setItem(
    "darkColorBrightness",
    JSON.stringify(darkColorBrightness)
  );
  localStorage.setItem(
    "whiteColorBrightness",
    JSON.stringify(whiteColorBrightness)
  );
  localStorage.setItem(
    "lightColorBrightness",
    JSON.stringify(lightColorBrightness)
  );
  localStorage.setItem(
    "selectedBackground",
    JSON.stringify(selectedBackground)
  );
});

bg2.addEventListener("click", () => {
  darkColorBrightness = "95%";
  whiteColorBrightness = "0%";
  lightColorBrightness = "10%";

  selectedBackground = 2;

  //add active class
  bg1.classList.remove("active");
  bg2.classList.add("active");

  changeBGColor();

  // Save background in local storage
  localStorage.setItem(
    "darkColorBrightness",
    JSON.stringify(darkColorBrightness)
  );
  localStorage.setItem(
    "whiteColorBrightness",
    JSON.stringify(whiteColorBrightness)
  );
  localStorage.setItem(
    "lightColorBrightness",
    JSON.stringify(lightColorBrightness)
  );
  localStorage.setItem(
    "selectedBackground",
    JSON.stringify(selectedBackground)
  );
});
