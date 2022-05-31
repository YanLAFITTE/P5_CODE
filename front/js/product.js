/** Recovery of the id in url with search params. */
const paramsId = new URLSearchParams(window.location.search);
const id = paramsId.get("id");

/** Request for product data using the id. */
fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => addElements(data));

/** Add data to dom elements. */
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

/** Retrieves the value of the quantity element. */
function getQuantity() {
  const quantity = document.querySelector("#quantity").value;
  return JSON.parse(quantity);
}

/** Retrieves the value of the color element. */
function getColor() {
  const color = document.querySelector("#colors").value;
  return color;
}

/** Add the product to local Storage. */
function addToCart(item) {
  const quantity = getQuantity();
  const key = `${item.id}-${item.color}`;
  const obj = JSON.parse(localStorage.getItem(key));
  if (obj != null) {
    obj.quantity += quantity;
    localStorage.setItem(key, JSON.stringify(obj));
  } else {
    localStorage.setItem(key, JSON.stringify(item));
  }
}

/** Listen to the click on the add to cart button. */
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
