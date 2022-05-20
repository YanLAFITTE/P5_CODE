const cart = [];

function makeKey() {
  let color = getColor();
  const key = `${id}-${color}`;
  return key;
}

function addToCart(product) {
  let key = makeKey();
  localStorage.setItem(key, JSON.stringify(product));
}

getFromCart();
function getFromCart() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}

cart.forEach((itemObject) => makeArticle(itemObject));

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
  divQuantity.appendChild(inputQuantity);

  const divDelete = document.createElement("div");
  divDelete.classList.add("cart__item__content__settings__delete");
  divSettings.appendChild(divDelete);

  const pDelete = document.createElement("p");
  pDelete.classList.add("deleteItem");
  pDelete.textContent = "Supprimer";
  divDelete.appendChild(pDelete);

  return divSettings;
}

function makeArticle(item) {
  const cartArticle = addCartArticle(item);

  const divImage = addCartImage(item);
  cartArticle.appendChild(divImage);

  const divContent = addCartContent(item);
  cartArticle.appendChild(divContent);

  displayArticle(cartArticle);
}

function displayArticle(cartArticle) {
    document.querySelector("#cart__items").appendChild(cartArticle);
}
