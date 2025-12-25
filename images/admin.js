const uploadInput = document.getElementById("imageUpload");
if (uploadInput) {
  uploadInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      document.getElementById("preview").src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function login(event) {
  event.preventDefault();

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "123") {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error").innerText = "Sai tài khoản hoặc mật khẩu";
  }
}

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  if (!name || !price) return;

  document.getElementById("list").innerHTML += `<li>${name} - ${price}đ</li>`;
}
