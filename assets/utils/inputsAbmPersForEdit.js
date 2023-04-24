import { inputText, inputCheckbox, inputTextArea, inputNumber, inputRadio, inputDate, inputSelect } from "./PaintDataDbInInput.js";

// function print date of input edit
export function valueOfInput(data) {
    for (const key in data) {
      if (key == "datosBancarios") {
        for (const key in data.datosBancarios) {
          let input = document.querySelector(`[name="${key}"]`);
          inputText(input, data.datosBancarios[key]);
        }
      }
  
      if (key == "estudios") {
        for (const key in data.estudios) {
          let input = document.querySelector(`[name="${key}"]`);
          inputCheckbox(input, data.estudios, key);
          inputTextArea(input, data.estudios[key]);
        }
      }
  
      if (key == "equipoPP") {
        for (const key in data.equipoPP.camisa) {
          let input = document.querySelector(`[name="${key}"]`);
          console.log(key);
          inputText(input, data.equipoPP.camisa[key]);
          inputCheckbox(input, data.equipoPP.camisa, key);
          inputNumber(input, data.equipoPP.camisa[key]);
          inputTextArea(input, data.equipoPP.camisa[key]);
          inputDate(input, data.equipoPP.camisa[key]);
        }
  
        for (const key in data.equipoPP.pantalon) {
          let input = document.querySelector(`[name="${key}"]`);
          console.log(key);
          inputText(input, data.equipoPP.pantalon[key]);
          inputCheckbox(input, data.equipoPP.pantalon, key);
          inputNumber(input, data.equipoPP.pantalon[key]);
          inputTextArea(input, data.equipoPP.pantalon[key]);
          inputDate(input, data.equipoPP.pantalon[key]);
        }
  
        for (const key in data.equipoPP.botas) {
          let input = document.querySelector(`[name="${key}"]`);
          console.log(key);
          inputText(input, data.equipoPP.botas[key]);
          inputCheckbox(input, data.equipoPP.botas, key);
          inputNumber(input, data.equipoPP.botas[key]);
          inputTextArea(input, data.equipoPP.botas[key]);
          inputDate(input, data.equipoPP.botas[key]);
        }
  
        for (const key in data.equipoPP.campera) {
          let input = document.querySelector(`[name="${key}"]`);
          console.log(key);
          inputText(input, data.equipoPP.campera[key]);
          inputCheckbox(input, data.equipoPP.campera, key);
          inputNumber(input, data.equipoPP.campera[key]);
          inputTextArea(input, data.equipoPP.campera[key]);
          inputDate(input, data.equipoPP.campera[key]);
        }
  
        for (const key in data.equipoPP.chaleco) {
          let input = document.querySelector(`[name="${key}"]`);
          console.log(key);
          inputText(input, data.equipoPP.chaleco[key]);
          inputCheckbox(input, data.equipoPP.chaleco, key);
          inputNumber(input, data.equipoPP.chaleco[key]);
          inputTextArea(input, data.equipoPP.chaleco[key]);
          inputDate(input, data.equipoPP.chaleco[key]);
        }
  
        for (const key in data.equipoPP.casco) {
          let input = document.querySelector(`[name="${key}"]`);
          console.log(key);
          inputText(input, data.equipoPP.casco[key]);
          inputCheckbox(input, data.equipoPP.casco, key);
          inputNumber(input, data.equipoPP.casco[key]);
          inputTextArea(input, data.equipoPP.casco[key]);
          inputDate(input, data.equipoPP.casco[key]);
        }
  
        for (const key in data.equipoPP.pullover) {
          let input = document.querySelector(`[name="${key}"]`);
          console.log(key);
          inputText(input, data.equipoPP.pullover[key]);
          inputCheckbox(input, data.equipoPP.pullover, key);
          inputNumber(input, data.equipoPP.pullover[key]);
          inputTextArea(input, data.equipoPP.pullover[key]);
          inputDate(input, data.equipoPP.pullover[key]);
        }
  
        for (const key in data.equipoPP.otrosElementos) {
          let input = document.querySelector(`[name="${key}"]`);
          console.log(key);
          inputText(input, data.equipoPP.otrosElementos[key]);
          inputCheckbox(input, data.equipoPP.otrosElementos, key);
          inputNumber(input, data.equipoPP.otrosElementos[key]);
          inputTextArea(input, data.equipoPP.otrosElementos[key]);
          inputDate(input, data.equipoPP.otrosElementos[key]);
        }
  
        let input = document.querySelector(`[name="observacionesGenerales"]`);
        inputTextArea(input, data.equipoPP.observacionesGenerales);
      }
  
      if (key == "domicilio") {
        for (const key in data.domicilio) {
          let input = document.querySelector(`[name="${key}"]`);
          inputText(input, data.domicilio[key]);
          inputNumber(input, data.domicilio[key]);
        }
      }
  
      if (key == "personalDe") {
        for (const key in data.personalDe) {
          let input = document.querySelector(`[name="personalDe"]`);
          console.log("personal de ", input, key);
          inputSelect(input, data.personalDe[key]);
        }
      }
  
      if (key == "tipoContrato") {
        if (data[key] == "Monotributista") {
          document.getElementById("monotributista").style.display = "block";
          for (const key in data["contratoMonotributista"]) {
            let input = document.querySelector(`[name="${key}"]`);
            inputCheckbox(input, data["contratoMonotributista"], key);
          }
        } else if (data[key] == "Efectivo") {
          document.getElementById("efectivo").style.display = "block";
          for (const key in data["contratoEfectivo"]) {
            let input = document.querySelector(`[name="${key}"]`);
            inputCheckbox(input, data["contratoEfectivo"], key);
          }
        } else if (data[key] == "Contratado") {
          document.getElementById("contratado").style.display = "block";
          console.log("se ejecuta");
          for (const key in data["contratoContratado"]) {
            let input = document.querySelector(`[name="${key}"]`);
            inputCheckbox(input, data["contratoContratado"], key);
          }
        }
      }
      // para inputs datos personales y los que esten fuera de objetos
      let input = document.querySelector(`[name="${key}"]`);
      console.log(input);
      inputText(input, data[key]);
      inputRadio(input, data, key);
      inputSelect(input, data[key]);
      inputTextArea(input, data[key]);
      inputDate(input, data[key]);
  
      if (input == null || input.type === "file") {
        continue;
      }
    }
  }