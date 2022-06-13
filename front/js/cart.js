const cart = [];

/** Retrieve elements from local storage by sorting it for display. */
getCart();
function getCart() {
  for (let i = 0; i < localStorage.length; i++) {
    const obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
    cart.push(obj);
    cart.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  if (cart === null || cart.length == 0) {
    document.querySelector("#cartAndFormContainer > h1").textContent +=
      " est vide !";
    document.querySelector("#totalQuantity").textContent = 0;
    document.querySelector("#totalPrice").textContent = 0;
  }
  cart.forEach((item) => makeArticle(item));
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

  /** Listen for the click on the quantity element. */
  inputQuantity.addEventListener("change", () =>
    updateValue(item, inputQuantity.value)
  );

  divQuantity.appendChild(inputQuantity);

  const divDelete = document.createElement("div");
  divDelete.classList.add("cart__item__content__settings__delete");

  /** Listen for the click on the delete element. */
  divDelete.addEventListener("click", () => deleteItem(item));
  divSettings.appendChild(divDelete);

  const pDelete = document.createElement("p");
  pDelete.classList.add("deleteItem");
  pDelete.textContent = "Supprimer";
  divDelete.appendChild(pDelete);

  return divSettings;
}

/** Update product quantity and price. */
function updateValue(item, inputQuantity) {
  const foundKey = cart.find((p) => p.id == item.id && p.color == item.color);
  foundKey.quantity = Number(inputQuantity);
  addToCart(foundKey);
  displayTotalQuantity();
  displayTotalPrice();
}

/** Add product to local storage. */
function addToCart(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.setItem(key, JSON.stringify(item));
}

/** Remove the element from the dom and the local storage. */
function deleteItem(item) {
  const key = `${item.id}-${item.color}`;
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

/** Make and display the article. */
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

/** Calculation of the quantity to be displayed. */
function displayTotalQuantity() {
  let totalQuantity = 0;
  if (cart === null || cart.length == 0) {
    document.querySelector("#totalQuantity").textContent = 0;
    document.querySelector("#cartAndFormContainer > h1").textContent +=
      " est vide !";
  }
  cart.forEach((item) => {
    if (item.quantity > 0) {
      totalQuantity += item.quantity;
      document.querySelector("#totalQuantity").textContent = totalQuantity;
    } else {
      deleteItem(item);
    }
  });
}

/** Calculation of the price to be displayed. */
function displayTotalPrice() {
  let totalPrice = 0;
  if (cart === null || cart.length == 0) {
    document.querySelector("#totalPrice").textContent = 0;
  }
  cart.forEach((item) => {
    const totalPriceItem = item.price * item.quantity;
    totalPrice += totalPriceItem;
    document.querySelector("#totalPrice").textContent = totalPrice;
  });
}

function displayArticle(cartArticle) {
  document.querySelector("#cart__items").appendChild(cartArticle);
}

// ********* ORDER FORM ********* //

/** Listen to the click on the submit button. */
const submitButton = document.querySelector("#order");
submitButton.addEventListener("click", (e) => submitForm(e));
function submitForm(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  if (invalidFirstName() === true) return;
  if (invalidLastName() === true) return;
  if (invalidAddress() === true) return;
  if (invalidCity() === true) return;
  if (invalidEmail() === true) return;

  const body = submitBody();

  /** API request to send data. */
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      localStorage.clear();

      /** Set confirm order id to local storage. */
      localStorage.setItem("confirmOrder", JSON.stringify(orderId));

      /** Redirects to the confirmation page. */
      window.location = "confirmation.html";
    })
    .catch((err) => console.error(err));
}

function invalidFirstName() {
  const regex = /^[a-zA-ZÀ-ÿ-. ]+$/;
  const firstName = document.querySelector("#firstName").value;
  if (regex.test(firstName) === false) {
    document.querySelector("#firstNameErrorMsg").textContent =
      "Veuillez entrer un prenom valide.";
    return true;
  } else {
    document.querySelector("#firstNameErrorMsg").textContent = "";
  }
}

function invalidLastName() {
  const regex = /^[a-zA-ZÀ-ÿ-. ]+$/;
  const lastName = document.querySelector("#lastName").value;
  if (regex.test(lastName) === false) {
    document.querySelector("#lastNameErrorMsg").textContent =
      "Veuillez entrer un nom valide.";
    return true;
  } else {
    document.querySelector("#lastNameErrorMsg").textContent = "";
  }
}

function invalidAddress() {
  const regex = /^[#.0-9a-zA-ZÀ-ÿ-. \s,-]+$/;
  const address = document.querySelector("#address").value;
  if (regex.test(address) === false) {
    document.querySelector("#addressErrorMsg").textContent =
      "Veuillez entrer une adresse valide.";
    return true;
  } else {
    document.querySelector("#addressErrorMsg").textContent = "";
  }
}

function invalidCity() {
  //invalidcity
  const regex = /^[a-zA-ZÀ-ÿ-. ]+$/;
  const city = document.querySelector("#city").value;
  if (regex.test(city) === false) {
    document.querySelector("#cityErrorMsg").textContent =
      "Veuillez entrer une ville valide.";
    return true;
  } else {
    document.querySelector("#cityErrorMsg").textContent = "";
  }
}

function invalidEmail() {
  const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
  const email = document.querySelector("#email").value;
  if (regex.test(email) === false) {
    document.querySelector("#emailErrorMsg").textContent =
      "Veuillez entrer un email valide.";
    return true;
  } else {
    document.querySelector("#emailErrorMsg").textContent = "";
  }
}

/** Prepare the body for the request. */
function submitBody() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getProductId(),
  };
  return body;
}

/** Prepare an array of ids. */
function getProductId() {
  const products = [];

  for (let i = 0; i < localStorage.length; i++) {
    const obj = localStorage.getItem(localStorage.key(i));
    const object = JSON.parse(obj);
    const objectId = object.id;
    products.push(objectId);
  }
  return products;
}
