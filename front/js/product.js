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
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;

  const item = document.querySelector(".item__img");
  if (item != null) {
    item.appendChild(image);
  }
}

function addTitle(name) {
  const title = document.querySelector("#title");
  if (title != null) {
    title.textContent = name;
  }
}

function addPrice(price) {
  const span = document.querySelector("#price");
  if (span != null) {
    span.textContent = price;
  }
}

function addDescription(description) {
  const p = document.querySelector("#description");
  if (p != null) {
    p.textContent = description;
  }
}

function addColors(colors) {
  const select = document.querySelector("#colors");
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  }
}
