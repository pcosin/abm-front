import { generatedBarcode } from "./generatedBarcode.js";

const Imgpreview = document.querySelector("#imgPreview");
const apellido = document.querySelector('#apellido')
const nombre = document.querySelector('#nombre')
const puestoCargo = document.querySelector('#puestoCargo')
const sector = document.querySelector('#sector')
const grupoSanguineo = document.querySelector('#grupoSanguineo')
const identificacion = document.querySelector('#identificacion')
const empresa = document.querySelector('#personalDe')

export const generatedCredencialinTab = async  () => {
    let div = document.querySelector('#credencial')
    div.innerHTML = `
    
    <div class="d-flex gap-1">
    <div>
      <div class="card card-credencial">
        <div class="card-header credencial-padding">
          <img src="../assets/img/logo-apaisado.jpeg" class="img-fluid img-logo-credencial" />
        </div>
        <div class="card-body-credencial text-center">
          <div class="row">
            <div class="col-4">
              <img src="${Imgpreview.src}" class="img-fluid foto-credencial" />
            </div>
            <div class="col-8">
              <h5 class="card-title">${apellido.value}, ${nombre.value}</h5>
              <p class="card-text">${empresa.value}</p>
              <p class="card-text"><small class="text-muted">Puesto / Sector</small></p>
              <p class="card-text">${puestoCargo.value.replace(/-/g, ' ')}</p>
              <p class="card-text">${sector.value.replace(/-/g, ' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="card card-credencial">
        <div class="card-header credencial-padding">
          <p class="card-text tex-center">Grupoy y factor sanguíneos: ${grupoSanguineo.value}</p>
        </div>
        <div class="card-body-credencial text-center">
          <div class="col-12">
            <p class="card-text">Nombre de la empresa: ${empresa.value}</p>
            <p class="card-text"> ${apellido.value}, ${nombre.value}</p>
            <div>
              <svg id="pngCode${identificacion.value}" class="img-barras-credencial"> </svg>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    
    `
    generatedBarcode(document.querySelector(`#pngCode${identificacion.value}`), identificacion.value)
}