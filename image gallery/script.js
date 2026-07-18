// Select Elements
const themeBtn = document.getElementById("theme-btn");

const filterButtons = document.querySelectorAll(".filter-buttons button");
const images = document.querySelectorAll(".image");
const search = document.getElementById("search");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;
let visibleImages = [...images];


// ================= FILTER =================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        visibleImages = [];

        images.forEach(image => {

            if(filter === "all" || image.classList.contains(filter)){

                image.style.display = "block";
                visibleImages.push(image);

            }else{

                image.style.display = "none";

            }

        });

    });

});


// ================= SEARCH =================

search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    visibleImages = [];

    images.forEach(image => {

        const alt = image.querySelector("img").alt.toLowerCase();

        if(alt.includes(value)){

            image.style.display = "block";
            visibleImages.push(image);

        }else{

            image.style.display = "none";

        }

    });

});


// ================= LIGHTBOX =================

images.forEach((image,index)=>{

    image.addEventListener("click",()=>{

        currentIndex = visibleImages.indexOf(image);

        lightbox.style.display = "flex";

        lightboxImg.src = image.querySelector("img").src;

    });

});


// ================= NEXT =================

nextBtn.addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= visibleImages.length){

        currentIndex = 0;

    }

    lightboxImg.src =
    visibleImages[currentIndex].querySelector("img").src;

});


// ================= PREVIOUS =================

prevBtn.addEventListener("click",()=>{

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = visibleImages.length-1;

    }

    lightboxImg.src =
    visibleImages[currentIndex].querySelector("img").src;

});


// ================= CLOSE =================

closeBtn.addEventListener("click",()=>{

    lightbox.style.display="none";

});


// Click Outside to Close

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

});


// ================= KEYBOARD =================

document.addEventListener("keydown",(e)=>{

    if(lightbox.style.display==="flex"){

        if(e.key==="Escape"){

            lightbox.style.display="none";

        }

        if(e.key==="ArrowRight"){

            nextBtn.click();

        }

        if(e.key==="ArrowLeft"){

            prevBtn.click();

        }

    }

});

// Theme

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="light"){

    document.body.classList.add("light");
    themeBtn.textContent="🌙";

}else{

    themeBtn.textContent="☀️";

}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        themeBtn.textContent="🌙";
        localStorage.setItem("theme","light");

    }else{

        themeBtn.textContent="☀️";
        localStorage.setItem("theme","dark");

    }

});

const favorites = document.querySelectorAll(".favorite");

favorites.forEach((heart,index)=>{

    const saved = localStorage.getItem("fav"+index);

    if(saved==="true"){

        heart.classList.add("active");
        heart.innerHTML="&#10084;";

    }

    heart.addEventListener("click",(e)=>{

        e.stopPropagation();

        heart.classList.toggle("active");

        if(heart.classList.contains("active")){

            heart.innerHTML="&#10084;";
            localStorage.setItem("fav"+index,true);

        }else{

            heart.innerHTML="&#9825;";
            localStorage.setItem("fav"+index,false);

        }

    });

});