const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close")

/*=================== SHOW MENU ===================*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add("show-menu")
    })
}

/*================ Menu hidden ====================*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove("show-menu")
    })
}

/*================ REMOVE MENU MOBILE ================*/
const navLinks = document.querySelectorAll(".nav-link")

function linkAction(){
    const navMenu = document.getElementById("nav-menu") 
    // when we click on each nav link, we remove the show menu class
    navMenu.classList.remove("show-menu")
}
navLinks.forEach(n => n.addEventListener('click', linkAction))

/*============== CHANGE BACKGROUND HEADER ==============*/
function scrollHeader(){
    const header = document.getElementById("header")
    // when the scroll is greater than 80 viewport height add the scroll class header to the tag header
    if(this.scrollY >= 80) header.classList.add("scroll-header"); else header.classList.remove("scroll-header")
}
window.addEventListener("scroll", scrollHeader)

/*================= TESTIMONIAL SWIPER =================*/
var swiper = new Swiper(".testimonial-wrapper", {
    loop: 'true',
    pagination: {
        el: ".swiper-pagination"
        
    },
});


/*============== SCROLL SECTIONS ACTIVE LINK ==============*/
// get all section that have an id define
const sections = document.querySelectorAll("section[id]");

// add an event listener for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter(){
    // get current scroll position
    let scrollY = window.pageYOffset;

    // now we loop through sections to get height, top and id values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58,
        sectionId = current.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add("active-link")
        }
        else{
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove("active-link")
        }
    })
}


/*================= PORTFOLIO ITEM FILTER =================*/
const filterContainer = document.querySelector(".portfolio-filter-inner"),
      filterBtns = filterContainer.children,
      totalFilterBtn = filterBtns.length,
      portfolioItems = document.querySelectorAll(".portfolio-item"),
      totalPortfolioItem = portfolioItems.length;


      for(let i=0; i<totalFilterBtn; i++){
          filterBtns[i].addEventListener("click", function(){
              filterContainer.querySelector(".active").classList.remove("active");
              this.classList.add("active");

              const filterValue = this.getAttribute("data-filter");
              for(let k=0; k<totalPortfolioItem; k++){
                  if(filterValue === portfolioItems[k].getAttribute("data-category")){
                    portfolioItems[k].classList.remove("hide");
                    portfolioItems[k].classList.add("show");
                  }
                  else{
                    portfolioItems[k].classList.add("hide");
                    portfolioItems[k].classList.remove("show");
                  }
                  if(filterValue === "all"){
                    portfolioItems[k].classList.remove("hide");
                    portfolioItems[k].classList.add("show");
                  }
              }
          })
      }

/*============= THEMES/DISPLAY CUSTOMIZATION ===================*/
const theme = document.querySelector("#theme-btn");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll('.choose-size span');
const colorPallete = document.querySelectorAll('.choose-color span');
var root = document.querySelector(":root");
const bg1 = document.querySelector(".bg-1");
const bg2 = document.querySelector(".bg-2");
const bg3 = document.querySelector(".bg-3");

// open modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

// close modal
const closeThemeModal = (e) => {
    if(e.target.classList.contains('customize-theme')){
        themeModal.style.display = 'none';
    }
}
theme.addEventListener("click", openThemeModal);
themeModal .addEventListener("click", closeThemeModal);

/*================= FONTS ============*/

// remove active class from spans or font size selectors
const removeSizeSelector = () =>{
    fontSizes.forEach(size => {
        size.classList.remove("active");
    })
}
fontSizes.forEach(size => {
    size.addEventListener("click", () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');
        if(size.classList.contains('font-size-1')){
            fontSize = '12px';
        }
        else if(size.classList.contains('font-size-2')){
            fontSize = '14px';
        }
        else if(size.classList.contains('font-size-3')){
            fontSize = '16px';
        }
        // change fontsize of the root html element
        document.querySelector('html').style.fontSize = fontSize;
    })
})


/*============= PRIMARY COLOR ========*/
// remove active class from color
const changeActiveColorClass = () => {
    colorPallete.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}

colorPallete.forEach(color =>{
    color.addEventListener('click', () => {
        let primaryHue;
        changeActiveColorClass();

        if(color.classList.contains('color-1')){
            primaryHue = 293;
        }
        else if(color.classList.contains('color-2')){
            primaryHue = 152;
        }
        else if(color.classList.contains('color-3')){
            primaryHue = 352;
        }
        else if(color.classList.contains('color-4')){
            primaryHue = 252;
        }
        color.classList.add("active");
        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})


/*============= THEME BACKGROUND =============*/








/*============= FORM VALIDATION =============*/

// get all the required elements
const form = document.querySelector("form"),
statusTxt = form.querySelector(".btn-container span");

form.onsubmit = (e) => {
    e.preventDefault(); // preventing form from submitting
    statusTxt.style.color = "#0d6efd";
    statusTxt.style.display = "block";

    let xhr = new XMLHttpRequest(); // creating new xml object
    xhr.open("POST", "message.php", true);
    xhr.onload = () => { // once ajax loaded
        if(xhr.readyState == 4 && xhr.status == 200){ //if ajax response status is 200 and ready status is 4 means there is no error
            let response = xhr.response; //storing ajax response in a response variable
            if(response.indexOf("Email and password feild is required!") != -1 || response.indexOf("Enter a valid email address!") || response.indexOf("Sorry, failed to send message!")){
                statusTxt.style.color = "red";
            }else{
                form.reset();
                setTimeout(()=>{
                    statusTxt.style.display = "none";
                }, 3000);
            }
            statusTxt.innerText = response;
        }
    }
    let formData = new FormData(form); //create new form data object this objext is use to send form data
    xhr.send(formData); //sending form data
}


