/** Get and display the confirm order id. */
function getConfirmOrder() {
  return localStorage.getItem("confirmOrder");
}

const confirmOrder = getConfirmOrder();
const orderId = document.querySelector("#orderId");
orderId.innerHTML =
  "<br/>" + confirmOrder + "<br/>" + "Merci pour votre commande !";

localStorage.clear();
