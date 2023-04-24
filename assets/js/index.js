const form = document.querySelector("form");
const emailInput = form.querySelector('input[placeholder="Email"]');
const passwordInput = form.querySelector('input[placeholder="Contraseña"]');
const obraSelect =  document.querySelector('#obra')
const $errorMessage = document.querySelector("#error-message");
const $togglePassword = document.querySelector(".toggle-password");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  emailInput.style.borderColor = "";
  passwordInput.style.borderColor = "";
  const formData = new FormData(form);

  let email = formData.get("email");
  let password = formData.get("password");
  saveCredentialsSesionStorage(obraSelect.value)
  // console.log(obraSelect.value);
  await login(email, password);
});

async function login(email, password) {
  try {
    let req = fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let resp = await req;
    if (resp.status !== 200) {
      throw new Error("Error en la solicitud");
    }
    let data = await resp.json();

    sessionStorage.setItem("tokenAuth", data.token);
    if (data.rol === "administrador") {
      window.location = "./pages/cpanel.html";
    } else if (data.rol === "pos") {
      window.location = "./pages/pos.html";
    }
    console.log(resp);
  } catch (error) {
    console.log("[ERROR LOGIN]", error.status);
    emailInput.style.borderColor = "red";
    passwordInput.style.borderColor = "red";
    $errorMessage.style.display = "block";
  }
}

const saveCredentialsSesionStorage = (key) => {
  switch (key) {
    case 'montelectro':
      sessionStorage.setItem('collectionUsers', 'montelectrousers')
      sessionStorage.setItem('collectionVehicles', 'montelectrovehicles')
      break;
    case 'otro':
      sessionStorage.setItem('collectionUsers', 'users')
      sessionStorage.setItem('collectionVehicles', 'montelectrovehicles')
      break;
    default:
      break;
  }
}


// Toggle para visualizar la contraseña en el input

$togglePassword.addEventListener("click", function () {
  const passwordField = document.querySelector(this.getAttribute("toggle"));
  if (passwordField.type === "password") {
    passwordField.type = "text";
    this.classList.remove("fa-eye");
    this.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-eye");
  }
});
