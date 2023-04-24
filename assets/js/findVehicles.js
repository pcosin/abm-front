import { findVehiclesByPatente, deleted } from "../utils/fetch.js";
import { obtainNameCollectionVehicle } from "../utils/obtainCredentialsSStorage.js";

const formSearch = document.querySelector("#formSearch");
const vehicleFind = document.querySelector("#vehicleFind");
const containerVehicles = document.querySelector("#containerVehicles");
let vehiclesCollection = obtainNameCollectionVehicle()

// let tokenFindVehicle = sessionStorage.getItem('tokenFindVehicle')

const generatedHTMLVehicles = (data) => {
  let html = "";
  console.log('[DATA VEHICULO]', data);

    html += `
        
                                       <div class="card col-6">
                                        <div class="card-body">
                                          <h5 class="card-title text-center">Marca: ${data.marca} </h5>
                                          <h5 class="card-title text-center">Modelo: ${data.modelo}</h5>
                                          <h6 class="card-subtitle mb-2 text-muted text-center">Patente: ${data.patente}</h6>
                                        </div>
                                       <div class='d-flex justify-content-center'> 
                                      <button id=btn-${data._id} data-id=${data._id} class="btn btn-primary me-2">Editar</button>
                                      <button id=btn-eliminar-${data._id} data-id=${data._id} class="btn btn-danger btn-eliminar ms-2">Eliminar</button></div>
                                        </div>
        
        `;


  containerVehicles.innerHTML = html;
 
  handleUpdate(document.querySelector(`#btn-${data._id}`));
  handleDelete(document.querySelector(`#btn-eliminar-${data._id}`));

};

function handleUpdate(btn) {
  btn.addEventListener("click", () => {
    console.log(btn.dataset.id);
    sessionStorage.setItem("updateVehicleId", btn.dataset.id);
    window.location = "./abm-vehiculos.html";
  });
}

// Delete vehicles

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
          `vehicles/${vehiclesCollection}`,
          btn.dataset.id,
          Swal.fire({
            icon: "success",
            title: "Eliminado...",
            text: "Vehículo eliminado",
          })
        );
        e.target.parentElement.parentElement.remove();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar vehículo",
      });
    }
  });
}

// find vehicles by patente
formSearch.addEventListener("submit", async (e) => {
  e.preventDefault();
  let tokenFindVehicle = vehicleFind.value;
  let data;
  data = await findVehiclesByPatente(`vehicles/${vehiclesCollection}`, tokenFindVehicle);
  sessionStorage.setItem("updateVehicleData", JSON.stringify(data));
  console.log(data);
  if (data.length === 0) {
    containerVehicles.innerHTML = `<p>Vehículo no encontrado</p>`;
    console.log("vehículo no encontrado");
  } else {
    generatedHTMLVehicles(data);
  }
});
