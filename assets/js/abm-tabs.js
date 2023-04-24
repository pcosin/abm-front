import { CapitalizeFirstLetter } from "../utils/CapitalizeFirstLetter.js";
import { valueOfInput } from "../utils/inputsAbmPersForEdit.js";
import { getAll, getUserById, post, updateUser } from "../utils/fetch.js";
import { convertDate } from "../utils/convertDate.js";
import { generatedCredencialinTab } from "../utils/generatedCredencialinTab.js";
import { logout } from "../utils/logout.js";
import { showTabs } from "../utils/showTabs.js";
import { inputSelect } from "../utils/PaintDataDbInInput.js";
import { srcProfileImage } from "../utils/srcProfileImage.js";
import { obtainNameCollectionUser, obtainNameCollectionVehicle } from "../utils/obtainCredentialsSStorage.js";
import { addInputInformData } from "../utils/addInputinFormData.js";

// operations form for post mongodb
const formPerfil = document.querySelector("#formPerfil");
const formEstudios = document.querySelector("#formEstudios");
const formBanco = document.querySelector("#formBanco");
const formEPP = document.querySelector("#formEPP");
const formVehiculo = document.querySelector("#formVehiculo");

const imgUploadBtn = document.querySelector("#imgUploadBtn");
const imgInput = document.querySelector("#imgInput");
const personalDeSelect = document.getElementById("personalDe");
const otrosContainer = document.getElementById("otrosContainer");

const tipoContrato = document.getElementById("tipoContrato");

const nameInput = document.querySelector("#nombre");
const apellidoInput = document.querySelector("#apellido");
const identificacionInput = document.querySelector("#identificacion");
const contratoSelect = document.querySelector("#tipoContrato");
const $requerimiento = document.querySelector("#requerimiento");

const logoutBtn = document.querySelector("[data-logout]");

let updateUserId = sessionStorage.getItem("updateUserId");
let collectionUser = obtainNameCollectionUser()
let vehiclesCollection = obtainNameCollectionVehicle()

// LOGOUT

logoutBtn.addEventListener("click", () => {
  logout();
});

/// Oye los inputs de los documentos en Personal
function deselectOthers(selected) {
  let dniOptions = document.getElementsByClassName("form-check-input");
  for (let i = 0; i < dniOptions.length; i++) {
    if (dniOptions[i] !== selected) {
      dniOptions[i].checked = false;
    }
  }
}

// VALIDACIONES DE LOS INPUTS
function validacion(obrero) {
  let valido = true;
  if (obrero.apellido == null || obrero.apellido == "") {
    apellidoInput.classList.add("is-invalid");
    valido = false;
  } else {
    apellidoInput.classList.remove("is-invalid");
  }

  if (obrero.nombre == null || obrero.nombre == "") {
    nameInput.classList.add("is-invalid");
    valido = false;
  } else {
    nameInput.classList.remove("is-invalid");
  }

  if (obrero.identificacion == null || obrero.identificacion == "") {
    identificacionInput.classList.add("is-invalid");
    valido = false;
  } else {
    identificacionInput.classList.remove("is-invalid");
  }

  if (contratoSelect.value === "" || contratoSelect.value === null) {
    contratoSelect.classList.add("is-invalid");
    valido = false;
  } else {
    contratoSelect.classList.remove("is-invalid");
  }

  // validar que se haya seleccionado al menos un requerimiento para el tipo de contrato elegido
  let checkboxList = [];
  let seleccionado = false;
  if (tipoContrato.value === "Efectivo") {
    checkboxList = document.querySelectorAll('#efectivo input[type="checkbox"]');
  } else if (tipoContrato.value === "Contratado") {
    checkboxList = document.querySelectorAll('#contratado input[type="checkbox"]');
  } else if (tipoContrato.value === "Monotributista") {
    checkboxList = document.querySelectorAll('#monotributista input[type="checkbox"]');
  }

  for (let i = 0; i < checkboxList.length; i++) {
    if (checkboxList[i].checked) {
      seleccionado = true;
      break;
    }
  }

  if (!seleccionado) {
    // si no se ha seleccionado al menos un checkbox, mostrar error
    $requerimiento.style.display = "block";
    valido = false;
  }

  return valido;
}

// CHANGE BLUR OF INPUTS

function validarNombre() {
  if (nameInput.value === "") {
    nameInput.classList.add("is-invalid");
  } else {
    nameInput.classList.remove("is-invalid");
  }
}

function validarApellido() {
  if (apellidoInput.value === "") {
    apellidoInput.classList.add("is-invalid");
  } else {
    apellidoInput.classList.remove("is-invalid");
  }
}

function validarIdentificacion() {
  if (identificacionInput.value === "") {
    identificacionInput.classList.add("is-invalid");
  } else {
    identificacionInput.classList.remove("is-invalid");
  }
}

function validarContrato() {
  if (contratoSelect.value === "" || contratoSelect.value === null) {
    contratoSelect.classList.add("is-invalid");
  } else {
    contratoSelect.classList.remove("is-invalid");
  }
}

// save step user
function saveUserSessionStorage(addProperty, nameProperty = null) {
  let userData = JSON.parse(sessionStorage.getItem("userData"));

  if (nameProperty != null) {
    userData[nameProperty] = addProperty;
    sessionStorage.setItem("userData", JSON.stringify(userData));
    return userData;
  } else {
    console.log(addProperty);
    sessionStorage.setItem("userData", JSON.stringify(addProperty));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Seleccione la lista de pestañas
  const tabsList = document.querySelector("#myTab");

  //Agregue un evento de clic a cada elemento de la lista de pestañas y en el tab vehiculo get a la db
  tabsList.addEventListener("click", async function (event) {
    // Verifique si el elemento clicado es una pestaña
    if (event.target.matches(".nav-link")) {
      // Obtenga el identificador de la pestaña y la sección correspondiente
      let tabId = event.target.getAttribute("href");

      const tabSection = document.querySelector(tabId);

      // Oculte todas las secciones de la pestaña y muestre la sección correspondiente
      const tabSections = document.querySelectorAll(".tab-pane");
      for (let i = 0; i < tabSections.length; i++) {
        tabSections[i].classList.remove("active");
      }
      tabSection.classList.add("active");

      if (tabId === "#vehiculo") {


        let result = await getAll(`/vehicles/${vehiclesCollection}`);
        let select = document.querySelector("#patente");
        result.forEach((el) => {
          select.innerHTML += `<option value="${el.patente}">${el.patente}</option>`;
        });
        if (updateUserId !== null) {
          let data = JSON.parse( sessionStorage.getItem('updateUser'))
          inputSelect(select, data.vehiculoPatente)
        }
      }

      if (tabId === "#credencial") {
        await generatedCredencialinTab();
      }
      // Marque la pestaña activa
      const tabs = document.querySelectorAll(".nav-link");
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
      }
      event.target.classList.add("active");
    }
  });

  // DESAHBILITA LAS TABS
  const tabList = document.querySelectorAll(".nav-tabs .nav-link");
  for (let i = 1; i < tabList.length; i++) {
    tabList[i].classList.add("disabled");
  }
});

// Código para subir imagen en perfil
imgUploadBtn.addEventListener("click", function () {
  document.querySelector("#imgInput").click();
});

imgInput.addEventListener("change", function () {
  const preview = document.querySelector("#imgPreview");
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
    preview.style.display = "block";
  });

  if (file) {
    reader.readAsDataURL(file);
  }
});

//Para el input Personal de cuando se selecciona Otro //
personalDeSelect.addEventListener("change", function () {
  if (this.value === "Otros") {
    otrosContainer.style.display = "block";
  } else {
    otrosContainer.style.display = "none";
  }
});

// Oye los cambios en el input de Tipo de contratos
tipoContrato.addEventListener("change", function showRequirements(value) {
  if (this.value === "Efectivo") {
    document.getElementById("efectivo").style.display = "block";
    document.getElementById("contratado").style.display = "none";
    document.getElementById("monotributista").style.display = "none";
  } else if (this.value === "Contratado") {
    document.getElementById("efectivo").style.display = "none";
    document.getElementById("contratado").style.display = "block";
    document.getElementById("monotributista").style.display = "none";
  } else if (this.value === "Monotributista") {
    document.getElementById("efectivo").style.display = "none";
    document.getElementById("contratado").style.display = "none";
    document.getElementById("monotributista").style.display = "block";
  }
});

document.addEventListener("DOMContentLoaded", async (e) => {
  // verificamos si es un usuario para editar o crear nuevo
  let dniUpdate;
  if (updateUserId !== null) {

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
          sessionStorage.removeItem('updateUserId')
          sessionStorage.removeItem('updateUser')
          window.location.reload()
        }
      })



    })

    let data = await getUserById(`users/${collectionUser}`, updateUserId);
    sessionStorage.setItem('updateUser', JSON.stringify(data))
    dniUpdate = data.identificacion;

    valueOfInput(data);
    let pathImg = srcProfileImage(data.archivos);
    const Imgpreview = document.querySelector("#imgPreview");
    Imgpreview.src = `http://localhost:8000/${pathImg || null}`;
    Imgpreview.style.display = "block";
    showTabs(updateUserId);
  }

  let formData = new FormData();

  formPerfil.addEventListener("submit", async (e) => {
    let selectTipoContrato = document.querySelector("#tipoContrato").value;

    let datosPersonales = new FormData(formPerfil);
    // datosPersonales.delete()
    e.preventDefault();

    let obrero = {
      identificacion: datosPersonales.get("identificacion"),
      tipoDni: datosPersonales.get("tipoDni"),
      customFile: datosPersonales.get("customFile"),
      cuil: datosPersonales.get("cuil"),
      apellido: datosPersonales.get("apellido"),
      nombre: datosPersonales.get("nombre"),
      telefono: datosPersonales.get("telefono"),
      fechaNacimiento: convertDate(datosPersonales.get("fechaNacimiento")),
      nacionalidad: datosPersonales.get("nacionalidad"),
      grupoSanguineo: datosPersonales.get("grupoSanguineo"),
      estadoCivil: datosPersonales.get("estadoCivil"),
      nombreConyuge: datosPersonales.get("nombreConyuge"),
      hijos: datosPersonales.get("hijos"),
      domicilio: {
        calle: datosPersonales.get("calle"),
        manzana: datosPersonales.get("manzana"),
        parcela: datosPersonales.get("parcela"),
        entre: datosPersonales.get("entre"),
        calle1: datosPersonales.get("calle1"),
        calle2: datosPersonales.get("calle2"),
        numero: datosPersonales.get("numero"),
        piso: datosPersonales.get("piso"),
        depto: datosPersonales.get("depto"),
      },
      localidad: datosPersonales.get("localidad"),
      cp: datosPersonales.get("cp"),
      provincia: datosPersonales.get("provincia"),
      personalDe: {
        De: datosPersonales.get("personalDe"),
        otros: datosPersonales.get("otros"),
      },
      tipoContrato: datosPersonales.get("tipoContrato"),
      contratoEfectivo: {
        altaTempranaAfipEfectivo: datosPersonales.get("altaTempranaAfipEfectivo"),
        figurarNominaArtEfectivo: datosPersonales.get("figurarNominaArtEfectivo"),
        figurarNominaSeguroVidaEfectivo: datosPersonales.get("figurarNominaSeguroVidaEfectivo"),
        poseerPlanillaEPPEfectivo: datosPersonales.get("poseerPlanillaEPPEfectivo"),
        poseerConstanciaCapacitacionInduccionSeguridadEfectivo: datosPersonales.get(
          "poseerConstanciaCapacitacionInduccionSeguridadEfectivo"
        ),
      },
      contratoContratado: {
        altaTempranaAfipContratado: datosPersonales.get("altaTempranaAfipContratado"),
        figurarNominaArtContratado: datosPersonales.get("figurarNominaArtContratado"),
        figurarNominaSeguroVidaContratado: datosPersonales.get("figurarNominaSeguroVidaContratado"),
        poseerPlanillaEPPContratado: datosPersonales.get("poseerPlanillaEPPContratado"),
        poseerConstanciaCapacitacionInduccionSeguridadContratado: datosPersonales.get(
          "poseerConstanciaCapacitacionInduccionSeguridadContratado"
        ),
      },
      contratoMonotributista: {
        constanciaMonotributo: datosPersonales.get("constanciaMonotributo"),
        seguroAccidentesPersonales: datosPersonales.get("seguroAccidentesPersonales"),
        induccionDeSeguridad: datosPersonales.get("induccionDeSeguridad"),
        clausulaDeNoRepeticion: datosPersonales.get("clausulaDeNoRepeticion"),
      },
      puestoCargo: datosPersonales.get("puestoCargo"),
      sector: datosPersonales.get("sector"),
      cuadrilla: datosPersonales.get("cuadrilla"),
      casco: datosPersonales.get("colorDeCasco"),
      habilitadoIngreso: datosPersonales.get("habilitadoIngreso"),
      vehiculo: datosPersonales.get("vehiculoCargo"),
      otros: datosPersonales.get("anotaciones"),
    };

    if (validacion(obrero) == false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Faltan registrar datos",
      });
    } else {
      showTabs();

      // alert(
      //   "Se habilitaron las demás tabas. Para guardar el usuario debe enviar los datos de vehículos."
      // );
      for (const [name, value] of datosPersonales.entries()) {

        const valoresActuales = formData.getAll(name);
        if (!valoresActuales.includes(value)) {
          console.log(name, value);
          formData.delete(name);
          formData.append(name, CapitalizeFirstLetter(value));
        }
      }


      if (selectTipoContrato === "Efectivo" || selectTipoContrato === "Contratado" || selectTipoContrato === "Monotributista") {
        for (const key in obrero) {
          if ( typeof obrero[key] == "object") {
            // console.log('-------------------------------------------------');
            for (const clave in  obrero[key]) {
              // console.log(`${key}[${clave}]`);
              // console.log( obrero[key][clave]);
              addInputInformData(formData, `${key}[${clave}]`, obrero[key][clave] )
            }
          }
        }
        if (updateUserId !== null) {
              await updateUser(`users/${collectionUser}`, formData, updateUserId);
              Swal.fire({
                icon: "success",
                title: "Actualizado...",
                text: "Datos personales actualizados",
              });
            }
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "Seleccione el tipo de contrato para avanzar",
        });
      }

      goToNextTab();
    }

      


    saveUserSessionStorage(obrero);
  });

  formEstudios.addEventListener("submit", async (e) => {
    e.preventDefault();

    let datosEstudios = new FormData(formEstudios);
    let estudios = {
      primario: datosEstudios.get("primario"),
      secundario: datosEstudios.get("secundario"),
      terciarioUniviersitario: datosEstudios.get("terciarioUniviersitario"),
      otrosConocimientos: datosEstudios.get("otrosConocimientos"),
    };

    for (const key in estudios) {
      console.log(key);
      console.log(estudios[key]);
      console.log(`estudios[${[key]}]`);
      addInputInformData(formData, `estudios[${[key]}]`, estudios[key])
    }

    if (updateUserId !== null) {
      try {
        let fetch = await updateUser(`users/${collectionUser}`, formData, updateUserId);

        if (fetch.status !== 200) {
          throw new Error("Error en la solicitud");
        }

        Swal.fire({
          icon: "success",
          title: "Actualizado...",
          text: "Datos estudios actualizados",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error,
        });
      }
    }
    goToNextTab();

    //saveUserSessionStorage(estudios,'estudios')
  });

  formBanco.addEventListener("submit", async (e) => {
    e.preventDefault();
    let datosBancarios = new FormData(formBanco);
    let banco = {
      nombreBanco: datosBancarios.get("nombreBanco"),
      sucursal: datosBancarios.get("sucursal"),
      numeroCuenta: datosBancarios.get("numeroCuenta"),
      numeroCbu: datosBancarios.get("numeroCbu"),
      archivo: datosBancarios.get("fileUpload"),
    };

    for (const key in banco) {
      console.log(key);
      console.log(banco[key]);
      console.log(`datosBancarios[${[key]}]`);
      addInputInformData(formData, `datosBancarios[${[key]}]`, banco[key])
    }

    if (updateUserId !== null) {
      try {
        let fetch = await updateUser(`users/${collectionUser}`, formData, updateUserId);

        if (fetch.status !== 200) {
          throw new Error("Error en la solicitud");
        }

        Swal.fire({
          icon: "success",
          title: "Actualizado...",
          text: "Datos bancarios actualizados",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error,
        });
      }
    }
    goToNextTab();
    // saveUserSessionStorage(banco,'datosBancarios')
  });

  formEPP.addEventListener("submit", async (e) => {
    e.preventDefault();
    let datosEPP = new FormData(formEPP);
    let equipoPP = {
      camisa: {
        camisaTalle: datosEPP.get("camisaTalle"),
        camisaCantidad: datosEPP.get("camisaCantidad"),
        camisaTipoModelo: datosEPP.get("camisaTipoModelo"),
        camisaMarca: datosEPP.get("camisaMarca"),
        camisaFechaEntrega: convertDate(datosEPP.get("camisaFechaEntrega")),
        camisaCertificacion: datosEPP.get("camisaCertificacion"),
        observaciones: datosEPP.get("observacionesCamisa"),
      },
      pantalon: {
        pantalonTalle: datosEPP.get("pantalonTalle"),
        pantalonCantidad: datosEPP.get("pantalonCantidad"),
        pantalonTipoModelo: datosEPP.get("pantalonTipoModelo"),
        pantalonMarca: datosEPP.get("pantalonMarca"),
        pantalonFechaEntrega: convertDate(datosEPP.get("pantalonFechaEntrega")),
        pantalonCertificacion: datosEPP.get("pantalonCertificacion"),
        observaciones: datosEPP.get("observacionesPantalon"),
      },
      botas: {
        botasTalle: datosEPP.get("botasTalle"),
        botasCantidad: datosEPP.get("botasCantidad"),
        botasTipoModelo: datosEPP.get("botasTipoModelo"),
        botasMarca: datosEPP.get("botasMarca"),
        botasFechaEntrega: convertDate(datosEPP.get("botasFechaEntrega")),
        botasCertificacion: datosEPP.get("botasCertificacion"),
        observaciones: datosEPP.get("observacionesBotas"),
      },
      pullover: {
        pulloverTalle: datosEPP.get("pulloverTalle"),
        pulloverCantidad: datosEPP.get("pulloverCantidad"),
        pulloverTipoModelo: datosEPP.get("pulloverTipoModelo"),
        pulloverMarca: datosEPP.get("pulloverMarca"),
        pulloverFechaEntrega: convertDate(datosEPP.get("pulloverFechaEntrega")),
        pulloverCertificacion: datosEPP.get("pulloverCertificacion"),
        observaciones: datosEPP.get("observacionesPullover"),
      },
      campera: {
        camperaTalle: datosEPP.get("camperaTalle"),
        camperaCantidad: datosEPP.get("camperaCantidad"),
        camperaTipoModelo: datosEPP.get("camperaTipoModelo"),
        camperaMarca: datosEPP.get("camperaMarca"),
        camperaFechaEntrega: convertDate(datosEPP.get("camperaFechaEntrega")),
        camperaCertificacion: datosEPP.get("camperaCertificacion"),
        observaciones: datosEPP.get("observacionesCampera"),
      },
      chaleco: {
        chalecoTalle: datosEPP.get("chalecoTalle"),
        chalecoCantidad: datosEPP.get("chalecoCantidad"),
        chalecoTipoModelo: datosEPP.get("chalecoTipoModelo"),
        chalecoMarca: datosEPP.get("chalecoMarca"),
        chalecoFechaEntrega: convertDate(datosEPP.get("chalecoFechaEntrega")),
        chalecoCertificacion: datosEPP.get("chalecoCertificacion"),
        observaciones: datosEPP.get("observacionesChaleco"),
      },
      casco: {
        cascoTalle: datosEPP.get("cascoTalle"),
        cascoCantidad: datosEPP.get("cascoCantidad"),
        cascoTipoModelo: datosEPP.get("cascoTipoModelo"),
        cascoMarca: datosEPP.get("cascoMarca"),
        cascoFechaEntrega: convertDate(datosEPP.get("cascoFechaEntrega")),
        cascoCertificacion: datosEPP.get("cascoCertificacion"),
        observaciones: datosEPP.get("observacionesCasco"),
      },
      otrosElementos: {
        otrosTalle: datosEPP.get("otrosTalle"),
        otrosCantidad: datosEPP.get("otrosCantidad"),
        otrosTipoModelo: datosEPP.get("otrosTipoModelo"),
        otrosMarca: datosEPP.get("otrosMarca"),
        otrosFechaEntrega: convertDate(datosEPP.get("otrosFechaEntrega")),
        otrosCertificacion: datosEPP.get("otrosCertificacion"),
        observaciones: datosEPP.get("observacionesOtros"),
      },
      observacionesGenerales: datosEPP.get("observacionesGenerales"),
    };

    for (const key in equipoPP) {
      // TODO validar cuando el valor sea un objeto para poder entrar con otro ciclo
      console.log(key);
      console.log( equipoPP[key]);
      if ( typeof equipoPP[key] == "object") {
        console.log('-------------------------------------------------');
        for (const clave in  equipoPP[key]) {
          console.log(clave);
          console.log(equipoPP[key]);
          console.log(equipoPP[key][clave]);
          console.log(`equipoPP[${[key]}][${[clave]}]`);
          addInputInformData(formData, `equipoPP[${[key]}][${[clave]}]`, equipoPP[key][clave] )
        }
      }
    }



    if (updateUserId !== null) {
      try {
        let fetch = await updateUser(`users/${collectionUser}`, formData, updateUserId);
        if (fetch.status !== 200) {
          throw new Error("Error en la solicitud");
        }
        Swal.fire({
          icon: "success",
          title: "Actualizado...",
          text: "Datos EPP actualizados",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error,
        });
      }
    }
    goToNextTab();
    // let user = saveUserSessionStorage(data,'equipoPP')
  });

  formVehiculo.addEventListener("submit", async (e) => {
    e.preventDefault();
    let datosVehiculo = new FormData(formVehiculo);
    addInputInformData(formData,"vehiculoPatente", datosVehiculo.get("patente"));

    if (updateUserId == null) {

      console.log(formData);
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      try {
        let fetch = await post(`users/${collectionUser}`, formData);

        if (fetch.status !== 200) {
          throw new Error("Error en la solicitud");
        }
        let response = await fetch.json();
        Swal.fire({
          icon: "success",
          title: "Usuario creado",
          text: response.message,
        });
        formPerfil.reset();
        formEstudios.reset();
        formBanco.reset();
        formEPP.reset();
        formVehiculo.reset();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error,
        });
      }
    } else {
      try {
        let fetch = await updateUser(`users/${collectionUser}`, formData, updateUserId);
        if (fetch.status !== 200) {
          throw new Error("Error en la solicitud");
        }

        sessionStorage.removeItem("updateUserId");
        sessionStorage.removeItem("tokenFindUsers");
        Swal.fire({
          icon: "success",
          title: "Actualizado...",
          text: "Datos actualizados",
        });
        formPerfil.reset();
        formEstudios.reset();
        formBanco.reset();
        formEPP.reset();
        formVehiculo.reset();
        const Imgpreview = document.querySelector("#imgPreview");
        Imgpreview.src = ``;
        Imgpreview.style.display = "none";
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error,
        });
      }
    }
  });
});

// Cuando se realiza el submit, te lleva a la próxima tab.

async function goToNextTab() {
  const tabList = document.querySelectorAll(".nav-tabs .nav-link");
  const activeIndex = [...tabList].findIndex((tab) => tab.classList.contains("active"));
  //  tabList.forEach( el => {
  //     el.classList.remove('disabled')
  // })
  const nextTab = tabList[activeIndex + 1];
  nextTab.classList.remove("disabled");
  nextTab.classList.add("active");
  nextTab.click();
  nextTab.scrollIntoView({ behavior: "smooth" });
}

nameInput.addEventListener("change", validarNombre);
nameInput.addEventListener("blur", validarNombre);
apellidoInput.addEventListener("change", validarApellido);
apellidoInput.addEventListener("blur", validarApellido);
identificacionInput.addEventListener("change", validarIdentificacion);
identificacionInput.addEventListener("blur", validarIdentificacion);
contratoSelect.addEventListener("change", validarContrato);
contratoSelect.addEventListener("blur", validarContrato);
