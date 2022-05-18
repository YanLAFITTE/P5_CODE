const searchId = window.location.search;
const paramsId = new URLSearchParams(searchId);
const id = paramsId.get("id");

fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => addElements(data));

function addElements(data) {
  let { imageUrl, altTxt, name, price, description, colors } = data;

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
  let color = getColor();
  let quantity = getQuantity();
  let price = document.querySelector("#price").textContent;
  let title = document.querySelector("#title").textContent;

  if (color == null || color === "" || quantity == null || quantity == 0) {
    return alert("Veuillez choisir la couleur et la quantité");
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
