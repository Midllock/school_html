
let n=0;
const btn = document.querySelector("button");
const h1=document.querySelector("h1");
btn.addEventListener("click",function(){
    n++;
    btn.innerHTML= (n);
    let r = Math.random() * 255;
    let b = Math.random() * 255;
    let g = Math.random() * 255;
    h1.style.color= rgb (, 111, 5);
    h1.style.fontSize="3rem";
    h1.style.transition="all 0.1s ease-in-out";
});