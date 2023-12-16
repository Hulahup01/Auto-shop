const cardContainers = document.querySelectorAll(".container");
for (let i = 0; i < cardContainers.length; i++) {
  cardContainers[i].addEventListener("mousemove", movingAnimation);
  cardContainers[i].addEventListener("mouseenter", animationIn);
  cardContainers[i].addEventListener("mouseleave", animationOut);
}

function movingAnimation(e) {
  const product = this.querySelector(".product");
  const container = this;
  
  const containerRect = container.getBoundingClientRect();
  const offsetX = e.clientX - containerRect.left;
  const offsetY = e.clientY - containerRect.top;

  let xAxis = (container.offsetWidth / 2 - offsetX) / 20;
  let yAxis = (container.offsetHeight / 2 - offsetY) / 20;

  product.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
}

function animationIn(e) {
  const product = this.querySelector(".product");
  const title = this.querySelector(".title");
  const type = this.querySelector(".type");
  const price = this.querySelector(".price");
  const purchase = this.querySelector(".purchase");
  const image = this.querySelector(".product-image");

  image.style.transform = "translateZ(100px)";
  title.style.transform = "translateZ(100px)";
  type.style.transform = "translateZ(80px)";
  price.style.transform = "translateZ(60px)";
  purchase.style.transform = "translateZ(40px)";
  product.style.transition = "transform 0.2s linear";
}

function animationOut(e) {
  const product = this.querySelector(".product");
  const title = this.querySelector(".title");
  const type = this.querySelector(".type");
  const price = this.querySelector(".price");
  const purchase = this.querySelector(".purchase");
  const image = this.querySelector(".product-image");

  image.style.transform = "translateZ(0px)";
  title.style.transform = "translateZ(0px)";
  type.style.transform = "translateZ(0px)";
  price.style.transform = "translateZ(0px)";
  purchase.style.transform = "translateZ(0px)";
  product.style.transition = "transform 0.9s linear";
  product.style.transform = `rotateY(0deg) rotateX(0deg)`;
}
