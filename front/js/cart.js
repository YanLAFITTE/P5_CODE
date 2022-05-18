function makeKey() {
  let color = getColor();
  const key = `${id}-${color}`;
  return key;
}

function saveCart(cart) {
  let key = makeKey();
  localStorage.setItem(key, JSON.stringify(cart));
}

function getCart() {
  let key = makeKey();
  let cart = localStorage.getItem(key);
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

function addToCart(product) {
  let cart = getCart();
  let foundKey = cart.find(
    (p) => p.id == product.id && p.color == product.color
  );
  if (foundKey != undefined) {
    foundKey.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  saveCart(cart);
}

function removeFromCart(product) {
  let cart = getCart();
  cart = cart.filter((p) => p.id != product.id && p.color != product.color);
  saveCart(cart);
}

