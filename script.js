function login(event) {
  event.preventDefault();

  const user = document.getElementById("username")?.value;
  const pass = document.getElementById("password")?.value;
  const error = document.getElementById("error");

  if (user === "admin" && pass === "123") {
    window.location.href = "admin.html";
  } else {
    if (error) error.innerText = "Sai tài khoản hoặc mật khẩu";
  }
}

let products = JSON.parse(localStorage.getItem("products")) || [];

const imageInput = document.getElementById("imageUpload");
if (imageInput) {
  imageInput.addEventListener("change", function (e) {
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("preview").src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  });
}

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const img = document.getElementById("preview").src;

  if (!name || !price || !img) {
    alert("Nhập đầy đủ thông tin!");
    return;
  }

  products.push({ name, price, img });
  localStorage.setItem("products", JSON.stringify(products));
  renderAdmin();
}

function renderAdmin() {
  const list = document.getElementById("list");
  if (!list) return;

  list.innerHTML = "";
  products.forEach((p, i) => {
    list.innerHTML += `
      <li>
        <img src="${p.img}" width="60"><br>
        ${p.name} - ${p.price}đ
        <button onclick="deleteProduct(${i})">❌</button>
      </li>
    `;
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderAdmin();
}

function renderProductsPage() {
  const container = document.getElementById("productContainer");
  if (!container) return;

  const products = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p class="price">${Number(p.price).toLocaleString()}đ</p>
      <button onclick="addToCart('${p.name}', ${p.price})">
        Thêm vào giỏ
      </button>
    `;
    container.appendChild(div);
  });
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const item = cart.find((p) => p.name === name);
  if (item) item.quantity++;
  else cart.push({ name, price, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  showToast();
}

function loadCart() {
  const cartList = document.getElementById("cartList");
  const totalPriceEl = document.getElementById("totalPrice");
  if (!cartList || !totalPriceEl) return;

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartList.innerHTML += `
      <li>
        ${item.name} x ${item.quantity}
        <button onclick="removeItem(${index})">❌</button>
      </li>
    `;
  });

  totalPriceEl.innerText = total.toLocaleString();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function clearCart() {
  if (!confirm("Xoá giỏ hàng?")) return;
  cart = [];
  localStorage.removeItem("cart");
  loadCart();
}

function showToast() {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

function animateButton(btn) {
  btn.classList.add("active");
  setTimeout(() => btn.classList.remove("active"), 300);
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  renderAdmin();
  renderProductsPage();
});
