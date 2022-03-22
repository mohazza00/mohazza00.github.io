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

// Open modal
theme.addEventListener("click", () => {
    themeModal.classList.add("active");
})

// Close modal
themeModal.addEventListener("click", (e) => {
    if(e.target.classList.contains('customize-theme'))
    {
        themeModal.classList.remove("active");
    }
})

/*===== FONTS =====*/
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove("active")
    })
}

fontSizes.forEach(size => {
    size.addEventListener("click", () => {
        let fontSize;
        removeSizeSelector();
        size.classList.toggle("active")
        if(size.classList.contains("font-size-1"))
        {
            fontSize = "12px";
        }
        else if(size.classList.contains("font-size-2"))
        {
            fontSize = "14px";
        }
        else if(size.classList.contains("font-size-3"))
        {
            fontSize = "16px";
        }
        else if(size.classList.contains("font-size-4"))
        {
            fontSize = "18px";
        }
        
        // Change font size of the root html element
        document.querySelector('html').style.fontSize = fontSize;
    })
})
/*===== PRIMARY COLORS =====*/

/*===== THEME BACKGROUNDS =====*/


