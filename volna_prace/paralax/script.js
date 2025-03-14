 window.onscroll=() => {
    const h1 = document.getElementById("11");
    const p = document.getElementById("12");
    h1.style.transform = `translateY(${window.scrollY /2}px)`;
    p.style.transform = `translateY(${window.scrollY /3}px)`;
};