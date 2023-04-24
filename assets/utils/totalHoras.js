
function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


const sumarHoras = (tiempo1, tiempo2) => {
    // Convertir el primer tiempo a segundos

    const [horas1, minutos1, segundos1] = tiempo1.split(':').map(Number);
    const totalSegundos1 = horas1 * 3600 + minutos1 * 60 + segundos1;

    // Convertir el segundo tiempo a segundos
    const [horas2, minutos2, segundos2] = tiempo2.split(':').map(Number);
    const totalSegundos2 = horas2 * 3600 + minutos2 * 60 + segundos2;

    // Sumar los segundos
    const totalSegundos = totalSegundos1 + totalSegundos2;
 
   return formatTime(totalSegundos)
}


export const restarHoras = (tiempo1, tiempo2) => {
   // Convertir el primer tiempo a segundos

   const [horas1, minutos1, segundos1] = tiempo1.split(':').map(Number);
   const totalSegundos1 = horas1 * 3600 + minutos1 * 60 + segundos1;

   // Convertir el segundo tiempo a segundos
   const [horas2, minutos2, segundos2] = tiempo2.split(':').map(Number);
   const totalSegundos2 = horas2 * 3600 + minutos2 * 60 + segundos2;

   // Sumar los segundos
   const totalSegundos = totalSegundos1 - totalSegundos2;

   return formatTime(totalSegundos)
}



/**
 * 
 * @param {el array de horas de un empleado} horas 
 * @returns un array de objetos con el calculo cada vez que hay una hora de ingreso y egreso y hace el push cuando el estado es egreso
 *          horasTrabajadasTurno: horasTrabajadasTurno,
            horasExtras: horasExtras,
            fechaActual,
            estado: hora.estado.

            Tambien retorna las horas totales
          
 */
export const totalHoras = (horas) => {
  let arrayHoras = []
  // Definir las variables para almacenar la hora de entrada y la hora de salida
  let horaEntrada = null;
  let horaSalida = null;
  let fechaActual;
  // Definir la variable para acumular la cantidad de horas trabajadas 
  let horasTrabajadasTurno = 0;
  let horasExtras = 0;
  let horasTotales= '00:00:00'
  let validateHoursExt = '00:00:00'

  // Recorrer el array de horas trabajadas
  if (Array.isArray(horas) && horas.length === 1 && horas[0] === "") {
    return horasTotales;
  } else {
    for (let i = 0; i < horas.length; i++) {
      const hora = horas[i];
      const partesFecha = hora.fecha.split("/");
      const fechaISO = `${partesFecha[2]}-${partesFecha[1].padStart(2,"0")}-${partesFecha[0].padStart(2, "0")}`;

        
      if (fechaActual !== fechaISO) {
        fechaActual = fechaISO;
        horasTrabajadasTurno = 0;
        horasExtras = 0
        validateHoursExt = '00:00:00'
      }


      if (hora.estado === "ingreso") {
        // Almacenar la hora de entrada
        horaEntrada = new Date(`${fechaISO}T${hora.hora}`);

      } else if (hora.estado === "egreso") {
        // Calcular la diferencia entre la hora de entrada y la hora de salida
       
        horaSalida = new Date(`${fechaISO}T${hora.hora}`);
      
        const diferenciaEnMilisegundos = horaSalida - horaEntrada;
        const diferenciaEnSegundos = diferenciaEnMilisegundos / 1000;

        horasTrabajadasTurno = formatTime(diferenciaEnSegundos)
        horasTotales = sumarHoras(horasTotales, horasTrabajadasTurno) 
        validateHoursExt = sumarHoras(validateHoursExt,horasTrabajadasTurno)

        let splitValidate = validateHoursExt.slice(0,4).replace(':', '.')

        if (splitValidate > 8.45) {
          let newHoursTotal = new Date(`${fechaISO}T${horasTotales}`)
          let newHoursExtr = new Date(`${fechaISO}T${"08:00:00"}`)
          let diferencia = newHoursTotal - newHoursExtr
          let diferenciaEnSegundos = diferencia / 1000;
          horasExtras = formatTime(diferenciaEnSegundos)
        }
        
        // Reiniciar las variables de hora de entrada y hora de salida
        horaEntrada = null;
        horaSalida = null;

        arrayHoras.push(
          { horasTrabajadasTurno: horasTrabajadasTurno,
            horasExtras: horasExtras,
            fechaActual,
            estado: hora.estado
          }
        )
      }
    }
  }


  return {
    arrayHoras,
    horasTotales: horasTotales
  }

};


/**
 * 
 * @param {array de horas para calcular el total de horas extras} array 
 * @returns las horas extras
 */
export const totalHorasExtras = (array) => {
  let horasExtras = '0:00:00'
  array.forEach(element => {
    if (element.horasExtras !== 0 ) {
      horasExtras = sumarHoras(horasExtras, element.horasExtras)
    }
  });
  return  horasExtras
}