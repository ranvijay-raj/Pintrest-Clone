let counter = 0
let slides = document.querySelectorAll(".imgContainer")
slides.forEach((slide, index) => {
    slide.style.left = `${index*100}%`
});
const goPrev = () => {
    if (counter == 0) {
        counter = slides.length - 1;
        slideShow();
    } else {
        counter--;
        slideShow();
    }
}
const goNext = () => {
    if (counter == slides.length - 1) {
        counter = 0;
        slideShow();
    } else {
        counter++;
        slideShow();
    }
}
const slideShow = ()=>{
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${counter*100}%)`
    });
}