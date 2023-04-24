import { generatedBarcode } from "../utils/generatedBarcode.js";
import { obtainNameCollectionUser } from "../utils/obtainCredentialsSStorage.js";
import { srcProfileImage } from "../utils/srcProfileImage.js";
import { validateToken } from "../utils/validateToken.js";

const containerUsers = document.querySelector("#containerUsers");
const inputSearchUsers = document.querySelector("#inputSearchUsers");
const formSearch = document.querySelector("#formSearch");
const btnImprimir = document.querySelector("#imprimir");
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
    .catch((err) => console.log("error al filtrar", err));

  return response;
};

const generatedHTMLUsers = (data) => {
  let html = "";
  data.map((el) => {
    let pathImg = srcProfileImage(el.archivos);

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
                                src="http://localhost:8000/${pathImg || null}"
                                class="img-fluid foto-credencial"
                               
                            />
                            </div>
                            <div class="col-8">
                            <h5 class="card-title"> ${el.nombre} ${el.apellido}</h5>
                             <p class="card-text"> ${el.personalDe.De || el.personalDe.otros}</p>
                            <p class="card-text"><small class="text-muted">Puesto / Sector</small></p>
                           
                            <p class="card-text">${el.sector}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div>
                    <div class="card card-credencial">
                        <div class="card-header credencial-padding">
                        <p class="card-text">Grupo y factor sanguíneos: ${el.grupoSanguineo}</p>
                        </div>
                        <div class="card-body-credencial text-center">
                        <div class="col-12">
                            <p class="card-text">Nombre de la empresa: ${
                              el.personalDe.De || el.personalDe.otros
                            }</p>
                            <p class="card-text"> ${el.nombre} ${el.apellido}</p>
                        <div class="div-code">
                                <svg id="pngCode${
                                  el.identificacion
                                }" class="img-barras-credencial"> </svg>
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
                
                </div>
                
     </article>   `;
  });

  containerUsers.innerHTML = html;
  data.forEach((el) => {
    // genereted code b
    generatedBarcode(`#pngCode${el.identificacion}`, el.identificacion);
  });
};

// find users by last name
formSearch.addEventListener("submit", async (e) => {
  e.preventDefault();
  let tokenFindUsers = inputSearchUsers.value;
  //   sessionStorage.setItem("tokenFindUsers", tokenFindUsers);
  let users = await findUsers(tokenFindUsers);
  console.log(users);
  if (users.length === 0) {
    containerUsers.innerHTML = `<p>Usuario no encontrado</p>`;
    console.log("usuario no encontrado");
  } else {
    generatedHTMLUsers(users);
  }
});

btnImprimir.addEventListener("click", () => {
  document.getElementsByTagName("header")[0].style.display = "none"; // seleccionar el encabezado
  document.getElementsByTagName("h2")[0].style.display = "none"; // seleccionar el encabezado
  document.getElementsByTagName("form")[0].style.display = "none"; // seleccionar el encabezado
  document.getElementsByTagName("button")[1].style.display = "none"; // seleccionar el encabezado

  window.print(); // imprimir la página
  window.close(); // cerrar la ventana después de imprimir
  window.location.reload();
});
