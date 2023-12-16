class Product {
  constructor(type, price, manufacturer) {
    this._type = type;
    this._price = price;
    this._manufacturer = manufacturer;
  }

  set type(type) {
    this._type = type;
  }

  get type() {
    return this._type;
  }

  set manufacturer(manufacturer) {
    this._manufacturer = manufacturer;
  }

  get manufacturer() {
    return this._manufacturer;
  }

  get price(){
    return this._price;
  }

  info() {
    alert(
      "Type: " +
        this._type +
        "Manufacturer: " +
        this._manufacturer +
        "Price: " +
        this._price
    );
  }

  changePrice(newPrice) {
    this._price = newPrice;
    alert("The price has been successfully updated to: " + this._price);
  }

}


class Wheel extends Product {
  constructor(type, price, manufacturer, name, diameter) {
    super(type, price, manufacturer);
    this._name = name;
    this._diameter = diameter;
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set diameter(diameter) {
    if (diameter < 10){
        alert("Invlid diameter!");
        return;
    }
    this._diameter = diameter;
  }

  get diameter() {
    return this._diameter;
  }

  discountPrice(discountPercentage) {
    if (discountPercentage >= 0 && discountPercentage <= 100) {
      return this.price - this.price * (discountPercentage / 100);
    } else {
      alert("Invalid discount percentage");
      return null;
    }
  }
  
}

function timingDecorator(f) {
  return function() {
    var start = performance.now();

    var result = f.apply(this, arguments);
    
    alert("Time: " + (performance.now() - start));

    return result;
  }
}

function LATSGO() {
  const agissaWheel = new Wheel("wheel", 90, "MAPA", "agissaRT 80-2", 50);

  Product.prototype.changePrice = timingDecorator(
  Product.prototype.changePrice
  );

  agissaWheel.changePrice(100);

  const container = document.getElementById("classes");
  container.innerHTML = "<h2>AgissaWheeel:</h2>";

  container.innerHTML += `<p>${agissaWheel.type} <br> ${agissaWheel.price} </p>`;

}


