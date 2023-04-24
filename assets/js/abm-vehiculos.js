
import { CapitalizeFirstLetter } from "../utils/CapitalizeFirstLetter.js";
import {  inputCheckbox, inputDate, inputRadio, inputSelect, inputText } from "../utils/PaintDataDbInInput.js";
import { getAll, post, updateVehicle } from "../utils/fetch.js";
import { obtainNameCollectionUser, obtainNameCollectionVehicle } from "../utils/obtainCredentialsSStorage.js";


const formVehicles = document.querySelector('#formVehicles')
const updateVehicleId = sessionStorage.getItem('updateVehicleId')
const personalCargo = document.querySelector('#personalCargo')
let vehiclesCollection = obtainNameCollectionVehicle()
let collectionUser = obtainNameCollectionUser()

const paintInPersonalCargo = async () => {

  let data = await getAll(`users/${collectionUser}`)
  data.forEach(usuario => {
    personalCargo.innerHTML += `
    
    <option value=${usuario.identificacion}> ${usuario.identificacion} , ${usuario.nombre}  ${usuario.apellido}</option>
    
    `
  });
}


document.addEventListener('DOMContentLoaded',  () => {
  paintInPersonalCargo()
  if (updateVehicleId !== null) {

    const btnEdit = document.querySelector('#btnEdit')
    btnEdit.classList.remove('d-none')
    btnEdit.addEventListener('click',  () => {
       Swal.fire({
        title: "¿Seguro quieres dejar de editar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, dejar de editar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('entra');
          sessionStorage.removeItem('updateVehicleId')
          sessionStorage.removeItem('updateVehicleData')
          window.location.reload()
        }
      })
     
     
     
    })


    let data = JSON.parse( sessionStorage.getItem('updateVehicleData') )
    for (const key in data) {
      let input = document.querySelector(`[name="${key}"]`)
      if (input == null || input == undefined) {
        continue
      }
      inputText(input, data[key])
      inputDate(input, data[key])
      inputSelect(input, data[key])
    
    }
   
  }


  formVehicles.addEventListener('submit', async (e) => {
    e.preventDefault()
    let datosVehiculo = new FormData(formVehicles)
    datosVehiculo.set('patente', datosVehiculo.get('patente').toUpperCase());
    
    if (updateVehicleId !== null) {
    try {
      let fetch = await updateVehicle(`vehicles/${vehiclesCollection}`, datosVehiculo, updateVehicleId)
      // alert(JSON.stringify(response))
      if (fetch.status !== 200) {
        throw new Error("Error en la solicitud");
      }
      let response = fetch.json()
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Actualizado...",
        text: response.message,
      });
      sessionStorage.removeItem('updateVehicleId')
      sessionStorage.removeItem('updateVehicleData')
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
      });
    }
    }else{
      try {
       let fetch = await post(`vehicles/${vehiclesCollection}`, datosVehiculo)
        if (fetch.status !== 200) {
          throw new Error("Error en la solicitud");
        }

      let response = fetch.json()
       Swal.fire({
        icon: "success",
        title: "Vehiculo registrado",
        text: response.message
      })
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error,
        });
      }
   
    }

    formVehicles.reset()
  })

})