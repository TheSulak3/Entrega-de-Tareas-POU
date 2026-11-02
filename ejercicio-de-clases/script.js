// Devuelve un arreglo con la tabla de multiplicar del numero, del 1 al 10
function crearTablaDeMultiplicar(numero) {
  const tabla = [];

  for (let i = 1; i <= 10; i++) {
    tabla[tabla.length] = numero * i;
  }

  return tabla;
}

const numero = 7;
const tabla = crearTablaDeMultiplicar(numero);

console.log("Tabla del " + numero + ":");
console.log(tabla);