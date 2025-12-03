
export default async function fetching(endpoint){
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1497/";
  console.log("Fetching from:", `${API_URL}${endpoint}`);
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ",error);
    throw error;
  }
}