const city = document.querySelector('#city');
const sun= document.querySelector('#sun');
const clouds = document.querySelector('#clouds');
const car = document.querySelector('#car');
const text = document.querySelector('#text');

window.addEventListener('scroll',()=>{
    let value = scrollY;
    clouds.style.left = `${value/4}px`;
    sun.style.right = `${value/2}px`;
    text.style.top = `${value*1.1}px`;
    car.style.left = `${100 + value}px`;
})