const searchId = window.location.search;
const paramsId = new URLSearchParams(searchId);
const id = paramsId.get("id");

fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => addElements(data));

function addElements(data) {
  const { imageUrl, altTxt, name, price, description, colors } = data;

  addImage(imageUrl, altTxt);
  addTitle(name);
  addPrice(price);
  addDescription(description);
  addColors(colors);
}

function addImage(imageUrl, altTxt) {
  image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;

  const item = document.querySelector(".item__img");
  item.appendChild(image);
}

function addTitle(name) {
  const title = document.querySelector("#title");
  title.textContent = name;
}

function addPrice(price) {
  const span = document.querySelector("#price");
  span.textContent = price;
}

function addDescription(description) {
  const p = document.querySelector("#description");
  p.textContent = description;
}

function addColors(colors) {
  const select = document.querySelector("#colors");
  colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    select.appendChild(option);
  });
}

function getQuantity() {
  const quantity = document.querySelector("#quantity").value;
  return JSON.parse(quantity);
}

function getColor() {
  const color = document.querySelector("#colors").value;
  return color;
}

const button = document.querySelector("#addToCart");
button.addEventListener("click", (e) => {
  const color = getColor();
  const quantity = getQuantity();
  const price = document.querySelector("#price").textContent;
  const title = document.querySelector("#title").textContent;

  if (color == null || color === "" || quantity == null || quantity == 0) {
    return alert("Please select a color and quantity");
  } else {
    let product = {
      id: id,
      color: color,
      quantity: Number(quantity),
      price: Number(price),
      imageUrl: image.src,
      altTxt: image.alt,
      title: title,
    };
    addToCart(product);
  }
});

function saveCart(cart) {
  localStorage.setItem(id, JSON.stringify(cart));
}

function getCart() {
  let cart = localStorage.getItem(id);
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

function addToCart(product) {
  let cart = getCart();
  let foundColor = cart.find((p) => p.color == product.color);
  if (foundColor != undefined) {
    foundColor.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  saveCart(cart);
}
