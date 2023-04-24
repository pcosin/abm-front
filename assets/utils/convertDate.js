export const convertDate = (date) => {

    if (date == null || date == undefined || date == '') {
        return
    }
    else{
        const fecha = new Date(date); // Obtiene la fecha actual
        const anio = fecha.getFullYear();
        const mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // Agrega un cero inicial si el mes es menor a 10
        const dia = ('0' + fecha.getDate()).slice(-2); // Agrega un cero inicial si el día es menor a 10
        const fechaISO = `${anio}-${mes}-${dia}`; // Combina los componentes de la fecha en una cadena de texto
    
        return fechaISO
    }
}