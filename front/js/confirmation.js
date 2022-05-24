function getConfirmOrder() {
  return localStorage.getItem("confirmOrder");
}
const confirmOrder = getConfirmOrder();
const orderId = document.querySelector("#orderId");
orderId.textContent = confirmOrder;
localStorage.clear();
