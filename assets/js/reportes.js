import { findVehiclesByPatente, getAll } from "../utils/fetch.js";
import { obtainNameCollectionUser, obtainNameCollectionVehicle } from "../utils/obtainCredentialsSStorage.js";


const optionReportes = document.querySelector("#option-reportes");
const containerFilter = document.querySelector("#containerFilter");
let vehiclesCollection = obtainNameCollectionVehicle()
let collectionUser = obtainNameCollectionUser()

const htmlReportesPersonal = (data) => {
  containerFilter.innerHTML = "";
  let fragment = document.createDocumentFragment();
  let div = document.createElement("div");

  div.innerHTML = `<table class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Identificación</th>
                <th>Sector</th>
                <th>Personal de</th>
               
            </tr>
        </thead>
        <tbody>
            ${data
              .map(
                (el) => `
                <tr class ="table-registro">
                    <td>${el.nombre}</td>
                    <td>${el.apellido}</td>
                    <td>${el.identificacion}</td>
                    <td>${el.sector}</td>
                    <td>${el.personalDe.De}</td>
                    <td><button id=btn-${el._id} data-id=${el._id} class="btn btn-primary mt-3">Editar</button></td>
                                           
                </tr>
            `
              )
              .join("")}
        </tbody>
    </table>
`;
  fragment.append(div);

  containerFilter.append(fragment);
  data.forEach((el) => {
    console.log(`${el._id}`);
    handleUpdate(document.querySelector(`#btn-${el._id}`));
  });
};
function handleUpdate(btn) {
  btn.addEventListener("click", () => {
    console.log(btn.dataset.id);
    sessionStorage.setItem("updateUserId", btn.dataset.id);
    window.location = "./abm.html";
  });
}

const htmlReportesVehiculos = (data) => {
  containerFilter.innerHTML = "";
  let fragment = document.createDocumentFragment();

  let div = document.createElement("div");
  div.innerHTML = `<table class="table">
        <thead>
            <tr>
                <th>Patente</th>
                <th>Marca</th>
                <th>Modelo</th>
            </tr>
        </thead>
        <tbody>
            ${data
              .map(
                (el) => `
                <tr>
                    <td>${el.patente}</td>
                    <td>${el.marca}</td>
                    <td>${el.modelo}</td>
                    <td><button id=btn-${el._id} data-id=${el._id} class="btn btn-primary mt-3">Editar</button></td>
                </tr>
            `
              )
              .join("")}
        </tbody>
    </table>
`;
  fragment.append(div);

  containerFilter.append(fragment);
  data.forEach((el) => {
    console.log(`${el._id}`);
    handleUpdateVehicle(document.querySelector(`#btn-${el._id}`), el.patente);
  });
};

function handleUpdateVehicle(btn,tokenFindVehicle) {
  btn.addEventListener("click", async () => {
    console.log(btn.dataset.id);
    let  data = await findVehiclesByPatente(`vehicles/${vehiclesCollection}`, tokenFindVehicle);
    sessionStorage.setItem("updateVehicleData", JSON.stringify(data));
    sessionStorage.setItem("updateVehicleId", btn.dataset.id);
    window.location = "./abm-vehiculos.html";
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  if (optionReportes.value === "Personal") {
    let response = await getAll(`users/${collectionUser}`);
    console.log(response);
    htmlReportesPersonal(response);
  }

  optionReportes.addEventListener("change", async () => {
    let valueFilter = optionReportes.value;

    if (valueFilter === "Vehículos") {
      let response = await getAll(`vehicles/${vehiclesCollection}`);
      console.log(response);
      htmlReportesVehiculos(response);
    } else if (valueFilter === "Personal") {
      let response = await getAll(`users/${collectionUser}`);
      console.log(response);
      htmlReportesPersonal(response);
    }
  });
});
