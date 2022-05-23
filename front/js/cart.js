const cart = [];

getCart();

function getCart() {
  for (let i = 0; i < localStorage.length; i++) {
    const foundKey = localStorage.key(i);
    const object = JSON.parse(localStorage.getItem(foundKey));
    cart.push(object);
  }
  cart.forEach((object) => makeArticle(object));
}

function addCartArticle(item) {
  const cartArticle = document.createElement("article");
  cartArticle.classList.add("cart__item");
  cartArticle.dataset.id = item.id;
  cartArticle.dataset.color = item.color;

  return cartArticle;
}

function addCartImage(item) {
  const divImage = document.createElement("div");
  divImage.classList.add("cart__item__img");

  const cartImage = document.createElement("img");
  cartImage.src = item.imageUrl;
  cartImage.alt = item.altTxt;
  divImage.appendChild(cartImage);

  return divImage;
}

function addCartContent(item) {
  const divContent = document.createElement("div");
  divContent.classList.add("cart__item__content");

  const divDescription = addDescription(item);
  divContent.appendChild(divDescription);

  const divSettings = addSettings(item);
  divContent.appendChild(divSettings);

  return divContent;
}

function addDescription(item) {
  const divDescription = document.createElement("div");
  divDescription.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  h2.textContent = item.title;
  divDescription.appendChild(h2);

  const pColor = document.createElement("p");
  pColor.textContent = item.color;
  divDescription.appendChild(pColor);

  const pPrice = document.createElement("p");
  pPrice.textContent = item.price + " €";
  divDescription.appendChild(pPrice);

  return divDescription;
}

function addSettings(item) {
  const divSettings = document.createElement("div");
  divSettings.classList.add("cart__item__content__settings");

  const divQuantity = document.createElement("div");
  divQuantity.classList.add("cart__item__content__settings__quantity");
  divSettings.appendChild(divQuantity);

  const pQuantity = document.createElement("p");
  pQuantity.textContent = "Qté : ";
  divQuantity.appendChild(pQuantity);

  const inputQuantity = document.createElement("input");
  inputQuantity.type = "number";
  inputQuantity.classList.add("itemQuantity");
  inputQuantity.name = "itemQuantity";
  inputQuantity.min = "1";
  inputQuantity.max = "100";
  inputQuantity.value = item.quantity;
  inputQuantity.addEventListener("change", () =>
    updateValue(item, inputQuantity.value)
  );
  divQuantity.appendChild(inputQuantity);

  const divDelete = document.createElement("div");
  divDelete.classList.add("cart__item__content__settings__delete");
  divDelete.addEventListener("click", () => deleteItem(item));
  divSettings.appendChild(divDelete);

  const pDelete = document.createElement("p");
  pDelete.classList.add("deleteItem");
  pDelete.textContent = "Supprimer";
  divDelete.appendChild(pDelete);

  return divSettings;
}

function updateValue(item, inputQuantity) {
  let foundKey = cart.find((p) => p.id == item.id && p.color == item.color);
  foundKey.quantity = Number(inputQuantity);
  addToCart(foundKey);
  displayTotalQuantity();
  displayTotalPrice();
}

function addToCart(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.setItem(key, JSON.stringify(item));
}

function deleteItem(item) {
  let key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
  const removeArticle = document.querySelector(
    `[data-id="${item.id}"][data-color="${item.color}"]`
  );
  const removeItem = cart.findIndex(
    (p) => p.id == item.id && p.color == item.color
  );
  cart.splice(removeItem, 1);
  removeArticle.remove();
  displayTotalQuantity();
  displayTotalPrice();
}

function makeArticle(item) {
  const cartArticle = addCartArticle(item);

  const divImage = addCartImage(item);
  cartArticle.appendChild(divImage);

  const divContent = addCartContent(item);
  cartArticle.appendChild(divContent);

  displayArticle(cartArticle);
  displayTotalQuantity();
  displayTotalPrice();
}

function displayTotalQuantity() {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
    document.querySelector("#totalQuantity").textContent = totalQuantity;
  });
}

function displayTotalPrice() {
  let totalPrice = 0;
  cart.forEach((item) => {
    let totalPriceItem = item.price * item.quantity;
    totalPrice += totalPriceItem;
    document.querySelector("#totalPrice").textContent = totalPrice;
  });
}

function displayArticle(cartArticle) {
  document.querySelector("#cart__items").appendChild(cartArticle);
}
