import { getAll } from "../utils/fetch.js";
import { obtainNameCollectionUser } from "../utils/obtainCredentialsSStorage.js";
import { totalHoras, totalHorasExtras, restarHoras } from "../utils/totalHoras.js";

let credentialUser = obtainNameCollectionUser()
const searchForm = document.querySelector("form");
const tablefoot = document.querySelector('#tablefoot')
const tableBody = document.querySelector('#tableBody')
const tableHead = document.querySelector('#tableHead')
const btnReport = document.querySelector('#btn-report')

const empleados = await getAll(`/users/${credentialUser}`);



function renderAll(empleados){
  console.log('click');
  let fecha = new Date();
  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1;
  let anio = fecha.getFullYear();
  let fechaFormateada = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + anio;

  tableBody.innerHTML = ''
  tablefoot.innerHTML = ''

  tableHead.innerHTML = ` 
                            <tr>
                              <th>Nombre</th>
                              <th>Empleado-DNI</th>
                              <th>Sector</th>
                              <th>Fecha</th>
                              <th>Total horas</th>
                              <th>Horas extras</th>
                              <th>Observaciones</th>
                            </tr>
`

  for (const empleado of empleados) {
    if (empleado.horas.length >= 4) {
      let horasTotalesDia = totalHoras(empleado.horas);
      let horasExtras = totalHorasExtras(horasTotalesDia.arrayHoras)
      let horasTotalesReales = restarHoras(horasTotalesDia.horasTotales, horasExtras) 
      console.log(horasTotalesDia, horasExtras);
      tableBody.innerHTML += `
                                <td>${empleado.nombre}</td>
                                <td>${empleado.identificacion}</td>
                                <td>${empleado.sector}</td>
                                <td>${fechaFormateada}</td>
                                <td>${horasTotalesReales}</td>
                                <td>${horasExtras}</td>
                                <td></td>
                                
      `
    }
  }


}

/**
 * 
 * @param {object obrero del cual se calcula el total de horas} empleado 
 */
function renderTable(empleado) {
  
  let horasTotalesDia = totalHoras(empleado.horarios);
  let horasExtras = totalHorasExtras(horasTotalesDia.arrayHoras)
  let horasTotalesReales = restarHoras(horasTotalesDia.horasTotales, horasExtras) 
  let fechaAnterior = ''  
  let i = 0;

  tableHead.innerHTML = ` 
      <tr>
        <th>Nombre</th>
        <th>Empleado-DNI</th>
        <th>Sector</th>
        <th>Fecha</th>
        <th>Horario</th>
        <th>Estado</th>
        <th>Total horas</th>
        <th>Horas extras</th>
        <th>Observaciones</th>
      </tr>
`

  for (const fechaActual of empleado.horarios) {
    if (fechaAnterior !== fechaActual.fecha) {
      let row = tableBody.insertRow();
      // Creamos dos celdas y las agregamos a la fila
      let nombre = row.insertCell(0);
      let dni = row.insertCell(1);
      let sector = row.insertCell(2);
      let fecha = row.insertCell(3);
      let hora = row.insertCell(4);
      let estado = row.insertCell(5);
      let rowTotalHs = row.insertCell(6);
      let rowExtrasHs = row.insertCell(7);
      let rowObs = row.insertCell(8);
      // Agregamos los valores correspondientes del objeto a las celdas
      nombre.innerHTML = empleado.nombre;
      dni.innerHTML = empleado.identificacion;
      sector.innerHTML = empleado.sector
      fecha.innerHTML = fechaActual.fecha
      hora.innerHTML = fechaActual.hora
      estado.innerHTML = fechaActual.estado
      rowTotalHs.innerHTML = ''
      rowExtrasHs.innerHTML = ''
      rowObs.innerHTML = ''

      
      fechaAnterior = fechaActual.fecha
    
    }else{
          
          tableBody.innerHTML += `
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>${fechaActual.hora}</td>
          <td>${fechaActual.estado}</td>
          <td>${fechaActual.estado == 'egreso' ? horasTotalesDia.arrayHoras[i]?.horasTrabajadasTurno : '' }</td>
          <td>${fechaActual.estado == 'egreso' && horasTotalesDia.arrayHoras[i]?.horasExtras !== 0 ? horasTotalesDia.arrayHoras[i]?.horasExtras : '' }</td>
          <td></td>
          
          `
          if (fechaActual.estado == 'egreso') {
            i++
          }
    }
  }
  
 
    tablefoot.innerHTML += `  <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>${horasTotalesReales}</td>
                              <td>${horasExtras}</td>
                              <td></td>
                              <td></td>
      `

}

function clearTable() {
  tableBody.innerHTML = ''
  tablefoot.innerHTML = ''
}

/**
 * 
 * @param {value del input para buscar el personal del cual se va a calcular el total de horas} searchTerm 
 */
function searchEmpleado(searchTerm) {

  clearTable();
  let empleadoFound = false;
  for (const empleado of empleados) {

    if (empleado.identificacion === Number(searchTerm)) {
      empleadoFound = true;
      renderTable({
        nombre: empleado.nombre,
        identificacion: empleado.identificacion,
        sector: empleado.sector,
        horarios: empleado.horas,
        
      });
    }
  }
  if (!empleadoFound) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="9">No se encontró el empleado</td>`;
    tableBody.appendChild(tr);
  }
}




btnReport.addEventListener("click", () => {
 renderAll(empleados)
})

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = e.target.querySelector("input").value;
  searchEmpleado(searchTerm);
});
  




