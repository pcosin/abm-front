import { CapitalizeFirstLetter } from "../utils/CapitalizeFirstLetter.js";
import { deleted } from "../utils/fetch.js";
import { generatedBarcode } from "../utils/generatedBarcode.js";
import { obtainNameCollectionUser } from "../utils/obtainCredentialsSStorage.js";
import { srcProfileImage } from "../utils/srcProfileImage.js";
import { validateToken } from "../utils/validateToken.js";

const containerUsers = document.querySelector("#containerUsers");
const inputSearchUsers = document.querySelector("#inputSearchUsers");
const formSearch = document.querySelector("#formSearch");

let token = validateToken();
let collectionUser = obtainNameCollectionUser()

const findUsers = async (tokenFind) => {
  //   let tokenFindUsers = sessionStorage.getItem("tokenFindUsers");
  let response = "";
  await fetch(`http://localhost:8000/api/users/${collectionUser}?apellido=${tokenFind}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    })
    .catch((err) =>  Swal.fire({
      icon: "error",
      title: "Error...",
      text: err,
    }));

  return response;
};

const generatedHTMLUsers = (data) => {
  let html = "";
  data.map((el) => {
    let pathImg = srcProfileImage(el.archivos)
   

    html += `       <article class="credencial-users">    
                    <div class="d-flex gap-1">
                    <div>
                    <div class="card card-credencial">
                        <div class="card-header credencial-padding">
                        <img src="../assets/img/logo-apaisado.jpeg" class="img-fluid img-logo-credencial" />
                        </div>
                        <div class="card-body-credencial text-center">
                        <div class="row">
                            <div class="col-4">
                            <img
                                src="http://localhost:8000/${pathImg}"
                                class="img-fluid foto-credencial"
                            />
                            </div>
                            <div class="col-8">
                            <h5 class="card-title"> ${el.nombre} ${el.apellido}</h5>
                             <p class="card-text"> ${el.personalDe.De || el.personalDe.otros}</p>
                            <p class="card-text"><small class="text-muted">Puesto / Sector</small></p>
                            <p class="card-text">${el.puestoCargo.replace(/-/g, ' ')}</p>
                            <p class="card-text">${el.sector.replace(/-/g, ' ')}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div>
                    <div class="card card-credencial">
                        <div class="card-header credencial-padding">
                        <p class="card-text text-center">Grupo y factor sanguíneos: ${el.grupoSanguineo}</p>
                        </div>
                        <div class="card-body-credencial text-center">
                        <div class="col-12">
                            <p class="card-text">Nombre de la empresa: ${
                              el.personalDe.De || el.personalDe.otros
                            }</p>
                            <p class="card-text"> ${el.nombre} ${el.apellido}</p>
                            <div>
                                <svg id="pngCode${
                                  el.identificacion
                                }" class="img-barras-credencial"> </svg>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                
                </div>
                 <div class= ' d-flex justify-content-center '>   <button id=btn-${el._id} data-id=${
      el._id
    } class="btn btn-primary me-2 mt-3">Editar</button>
                    
     <button id=btn-eliminar-${el._id} data-id=${
      el._id
    } class="btn btn-danger btn-eliminar ms-2 mt-3" >Eliminar</button></div>
     </article>   `;
  });

  containerUsers.innerHTML = html;
  data.forEach((el) => {
    handleUpdate(document.querySelector(`#btn-${el._id}`));
    handleDelete(document.querySelector(`#btn-eliminar-${el._id}`));
    // genereted code b
    generatedBarcode(`#pngCode${el.identificacion}`, el.identificacion);
  });
};

function handleUpdate(btn) {
  btn.addEventListener("click", () => {
    console.log(btn.dataset.id);
    sessionStorage.setItem("updateUserId", btn.dataset.id);
    window.location = "./abm.html";
  });
}

// Delete user

function handleDelete(btn) {
  btn.addEventListener("click", async (e) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) {
        await deleted(
          `users/${collectionUser}`,
          btn.dataset.id,
          Swal.fire({
            icon: "success",
            title: "Eliminado...",
            text: "Usuario eliminado",
          })
        );
        e.target.parentElement.parentElement.remove();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar usuario",
      });
    }
  });
}

// find users by last name
formSearch.addEventListener("submit", async (e) => {
  e.preventDefault();
  let tokenFindUsers = inputSearchUsers.value;
  tokenFindUsers = CapitalizeFirstLetter(tokenFindUsers)
  //   sessionStorage.setItem("tokenFindUsers", tokenFindUsers);
  let users = await findUsers(tokenFindUsers);
  console.log(users);
  if (users.length === 0) {
    containerUsers.innerHTML = `<p>Usuario no encontrado</p>`;

  } else {
    generatedHTMLUsers(users);
  }
});

// document.addEventListener('DOMContentLoaded', async  () => {
//     let users =  await findUsers()
//     console.log(users);
//     generatedHTMLUsers(users)
// })
