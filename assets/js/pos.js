import { validateToken } from "../utils/validateToken.js";
import { logout } from "../utils/logout.js";
import { srcProfileImage } from "../utils/srcProfileImage.js";
import { obtainNameCollectionUser } from "../utils/obtainCredentialsSStorage.js";

let token = validateToken();
let collectionUser = obtainNameCollectionUser()

const formPos = document.querySelector("#form-pos");
const main = document.querySelector("#main");
const $logoutBtn = document.querySelector("[data-logout]");

formPos.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let formData = new FormData(formPos);
  let userDni = formData.get("dni");
  getUserByDni(userDni);
});

function generatedHTMLModal(user) {
  let pathImg = srcProfileImage(user.archivos);
  // Crear elementos HTML
  const modalWrapper = document.createElement("div");
  const modalDialog = document.createElement("div");
  const modalContent = document.createElement("div");
  const modalHeader = document.createElement("div");
  const modalTitle = document.createElement("h2");
  const modalBody = document.createElement("div");
  const modalFooter = document.createElement("div");
  const closeButton = document.createElement("button");

  // Agregar clases a los elementos
  modalWrapper.classList.add("modal", "fade", "show", "d-block");
  modalWrapper.style.backgroundColor = "#212529";
  modalDialog.classList.add("modal-dialog");
  modalContent.classList.add("modal-content");
  modalHeader.classList.add("modal-header", "title-ingreso");
  modalHeader.style.backgroundColor = user.habilitadoIngreso === "SI" ? "green" : "red";
  modalTitle.classList.add("modal-title", "fs-5");
  modalBody.classList.add("modal-body");
  modalFooter.classList.add("modal-footer");
  closeButton.classList.add("modal-close", "btn", "btn-secondary");

  // Agregar contenido a los elementos
  modalTitle.innerHTML =
    user.habilitadoIngreso === "SI"
      ? `<h3 class="text-uppercase">Usuario habilitado</h3>`
      : `<h3 class="text-uppercase">Usuario inhabilitado</h3>`;

  closeButton.textContent = "Cerrar";

  // Agregar eventos a los elementos
  closeButton.addEventListener("click", () => {
    modalWrapper.remove();
  });

  modalWrapper.addEventListener("click", (event) => {
    if (event.target === modalWrapper) {
      modalWrapper.remove();
    }
  });

  // Agregar elementos al DOM
  modalBody.innerHTML = `
        <div class="pos-box">
            <div class="pos-logo">
            <img src="../assets/img/logo.jpeg" alt="Logo" />
            </div>
            <div class="card">
                <div class="row g-0">
                    <div class="col-md-6">
                        <div class="card-body">
                            <h5 class="card-title"><b>DNI:</b> ${user.identificacion}</h5>
                            <img src="http://localhost:8000/${
                              pathImg || null
                            }" class="img-fluid" alt="Imagen de perfil" width='200px' />
                        </div>
                    </div>
                    <div class="col-md-6 d-flex align-items-center">
                        <div class="card-body">
                            <p class="card-text"><b>Apellido:</b> ${user.apellido}</p>
                            <p class="card-text mt-2"><b>Nombre:</b> ${user.nombre}</p>
                            <p class="card-text mt-2"><b>Puesto:</b> ${
                              user.personalDe.De || user.personalDe.otros
                            }</p>
                            <p class="card-text mt-2"><b>Sector:</b> ${user.sector}</p>
                            <p class="card-text mt-2"><b>Casco:</b> ${user.colorDeCasco}</p>
                            <h5 class="card-title mt-3"><b>Permitido el ingreso:</b> ${
                              user.habilitadoIngreso
                            }</h5>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-muted">MONTELECTRO S.A 2023</p>
        </div>
     
     `;
  modalFooter.appendChild(closeButton);
  modalHeader.appendChild(modalTitle);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modalWrapper.appendChild(modalDialog);
  main.appendChild(modalWrapper);
}

function getUserByDni(dni) {
  fetch(`http://localhost:8000/api/users/${collectionUser}?identificacion=${dni}`, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (
        data.identificacion === Number(dni) &&
        data.nombre != "" &&
        data.appelido != "" &&
        data.habilitadoIngreso === "SI" &&
        data.tipoContrato !== null &&
        data.tipoContrato !== undefined
      ) {
        console.log("entra aca");
        generatedHTMLModal(data);
        updateNewDate(data._id, data.estado);
      } else {
        // TODO generar modal (rojo)
        generatedHTMLModal(data);

        // alert("Usuario no habilitado, le pedimos que vaya a rrhh");
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario no encontrado",
        footer: '<a href="#">Le pedimos que vaya a RRHH</a>',
      });
    });
}

function updateNewDate(id, estado) {
  let newDate = new Date();
  let hour = ("0" + newDate.getHours()).slice(-2);
  let minutes = ("0" + newDate.getMinutes()).slice(-2);
  let seconds = ("0" + newDate.getSeconds()).slice(-2);
  let acountDate = {
    fecha: `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`,
    hora: `${hour}:${minutes}:${seconds}`,
    estado: `${estado === "ingreso" ? "egreso" : "ingreso"}`,
  };
  let newEstado = estado === "ingreso" ? "egreso" : "ingreso";

  let update = {
    acountDate,
    newEstado,
  };
  console.log(acountDate);
  fetch(`http://localhost:8000/api/pos/${collectionUser}?id=${id}`, {
    method: "PUT",
    body: JSON.stringify(update),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-access-token": token,
    },
  });
}

// LOGOUT

$logoutBtn.addEventListener("click", () => {
  logout();
});
