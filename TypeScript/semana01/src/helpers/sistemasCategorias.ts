// ej crear un sistema de categorias 
// crear un map donde cada categoria tiene un set de productos. Llamar a dicho map catálogo. Crear las 
// siguientes funciones: agregar producto devuelve true o false, crear una funcion llamada mostrar catalogo 
// que me muestre todo el catálogo.
// adicionalmente crear una funcion llamada buscarProducto que le pase un string con el nombre del producto.
// nota: cuidado con  el get que devuelve undefined

const catalogo = new Map<string, Set<string> >();

const addProduct = (category:string, product: string):void =>  {

    if(!catalogo.has(category)){
        catalogo.set(category, new Set<string>());
    }
    catalogo.get(category)?.add(product);

}

addProduct("Electronica", "Portatil HP");
addProduct("Electronica", "Portatil HP");
addProduct("Electronica", "Teclado");
addProduct("Deportes", "Raqueta de Padel");
addProduct("Deportes", "Balón de Fútbol");
addProduct("Músuca", "Teclado");



function showCatalog ():void {
    console.log("<------- Catálogo de productos ------->")
    
    for(const [ categoria, productos ] of catalogo){
        console.log(`✅Categoría: ${categoria} -- Número de productos: ${productos.size}`)
        for(const producto of productos){
            console.log(`-👍   ${producto}`)
        }
    }
}

showCatalog();

function searchProduct (nameProduct:string):string[] {
    const categoriasEncontradas :string[] = [];

    for(const [ categoria, productos ] of catalogo){
        if(productos.has(nameProduct)){
            categoriasEncontradas.push(categoria);
        }
    }

    return categoriasEncontradas
}

console.log(`Las categorias del producto Teclado son: ${searchProduct("Teclado")}`)// ["Electronica", "Música"]

