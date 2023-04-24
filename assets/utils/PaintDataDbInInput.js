
export const inputText = (inputHTML, dataDb) => {

    if ( inputHTML == null || inputHTML.type !== 'text') {
        return
      }
      else{
        inputHTML.value = dataDb
      }


}

export const inputNumber = (inputHTML, dataDb) => {

  if (inputHTML == null || inputHTML.type !== 'number') {
    return
  }
  else{
    inputHTML.value = dataDb
  }

}

export const inputTextArea = (inputHTML, dataDb) => {

  if (inputHTML == null || inputHTML.type !== 'textarea') {
    return
  }
  else{
    inputHTML.value = dataDb
  }
}

export const inputRadio = (inputHTML, dataDb, key) => {
    if ( (inputHTML == null )||( inputHTML.type !== 'radio' ) ) {
        return
      }else{
        if(inputHTML.value !== dataDb[key] ) {
           document.querySelector(`[name="${key}"][value="${dataDb[key]}"]`).checked = true
          }
          else{
            inputHTML.checked = true
          }
      }
}

export const inputSelect = (inputHTML, dataDb) => {
    if ( inputHTML == null || inputHTML.tagName !== 'SELECT') {
        return
    }else{
        for (let i = 0; i < inputHTML.options.length; i++) {
            if (inputHTML.options[i].value == dataDb) {
                inputHTML.options[i].selected = true
              break
            }
          }
    }
}

export const inputCheckbox = (inputHTML, dataDb, key) => {
    if (inputHTML == null || inputHTML.type !== 'checkbox' ) {
        return
    }else{
        if(inputHTML.value !== dataDb[key] ) {
            if (dataDb[key] == "null") {
                inputHTML.checked = false
              }else{
                console.log(key,dataDb[key]);
                console.log(document.querySelector(`[name="${key}"][value="${dataDb[key]}"]`));
                  document.querySelector(`[name="${key}"][value="${dataDb[key]}"]`).checked = true
                  console.log( document.querySelector(`[name="${key}"][value="${dataDb[key]}"]`));
              }
          }
          else{
            inputHTML.checked = true
          }
    }
}

export const inputDate = (inputHTML, dataDb) => {
  
  if (inputHTML == null || inputHTML.type !== 'date' || dataDb == null || dataDb == 'undefined' || dataDb == '') {
    return
  }else{
    const fechaGuardada = dataDb; // Fecha guardada en formato "YYYY-MM-DD"
    const fecha = new Date(fechaGuardada); // Crea un objeto Date a partir de la cadena de texto
    const fechaISO = fecha.toISOString().slice(0, 10); // Convierte la fecha a formato ISO 8601 y extrae solo la parte de la fecha
    inputHTML.value = fechaISO; // Establece el valor del input tipo date con la fecha en formato ISO 8601
  }

}