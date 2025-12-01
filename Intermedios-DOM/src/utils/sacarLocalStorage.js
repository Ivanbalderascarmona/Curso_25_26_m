

function sacarLocalStorage(clave) {
  if (typeof clave !== "string") {
    throw new Error("El nombre no es una cadena de caracteres");
  }
  try {
    const dataJson = localStorage.getItem(clave);
    if (!dataJson) {
      return null;
    }
    return new Map(JSON.parse(dataJson));
  } catch (error) {
    console.error("Error al obtener datos del localStorage:", error);
    return null;
  }
}

export default sacarLocalStorage