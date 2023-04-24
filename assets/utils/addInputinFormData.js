export function addInputInformData(formData, clave, valor) {
    if (formData.has(clave)) {
        formData.set(clave, valor);
    } else {
        formData.append(clave, valor);
    }
}