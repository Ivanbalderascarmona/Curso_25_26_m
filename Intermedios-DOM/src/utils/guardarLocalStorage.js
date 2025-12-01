
function guardarLocalStorage(clave, data) {
  if (typeof clave !== "string") {
    throw new Error("El nombre no es una cadena de caracteres");
  }
  if (!(data instanceof Map)) {
    throw new Error("La data debe ser un Map");
  }
  const nombreClean = clave.trim().toLowerCase();
  try {
    const dataString = JSON.stringify(Array.from(data));
    localStorage.setItem(nombreClean,dataString);
    return true;
  } catch (err) {
    console.log(`Error al guardar en el localStorage con la clave ${nombre}:`,err);
    return false;
  }
}

export default guardarLocalStorage