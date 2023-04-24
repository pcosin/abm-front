const exportBtn = document.getElementById("export-btn");

exportBtn.addEventListener("click", exportToExcel);

function exportToExcel() {
  // Obtener la tabla HTML
  let table = document.getElementById("tableBodyComplet");

  // Crear un objeto workbook de SheetJS
  let wb = XLSX.utils.table_to_book(table);

  // Convertir el workbook a un archivo .xlsx binario
  let wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  // Descargar el archivo .xlsx
  saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "miArchivo.xlsx");
}

// Función auxiliar para convertir un string a ArrayBuffer
function s2ab(s) {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}
