// ---------- Datos de entrada ----------
const gastos = [
  { descripcion: "Almuerzo en la universidad", monto: 4.75, categoria: "alimentacion" },
  { descripcion: "Compras del supermercado", monto: 62.25, categoria: "alimentacion" },
  { descripcion: "Pasaje del bus", monto: 0.75, categoria: "transporte" },
  { descripcion: "Tanque de gasolina", monto: 38.5, categoria: "transporte" },
  { descripcion: "Libro de JavaScript", monto: 27.75, categoria: "estudio" },
  { descripcion: "Audifonos", monto: 135, categoria: "estudio" },
  { descripcion: "Cine con amigos", monto: 12, categoria: "entretenimiento" },
  { descripcion: "Mantenimiento del carro", monto: 118.5, categoria: "transporte" }
];

// ---------- Funciones ----------
const esNumeroValido = (valor) => typeof valor === "number";

function calcularTotal(gastos) {
  if (gastos.length === 0) {
    throw new Error("No hay gastos para calcular el total.");
  }
  let total = 0;
  for (let i = 0; i < gastos.length; i++) {
    if (!esNumeroValido(gastos[i].monto)) {
      throw new Error("El monto del gasto '" + gastos[i].descripcion + "' no es un numero.");
    }
    total = total + gastos[i].monto;
  }
  return total;
}

function calcularPromedio(gastos) {
  if (gastos.length === 0) {
    throw new Error("No se puede calcular el promedio de una lista vacia.");
  }
  return calcularTotal(gastos) / gastos.length;
}

function filtrarPorCategoria(gastos, categoria) {
  const resultado = [];
  for (let i = 0; i < gastos.length; i++) {
    if (gastos[i].categoria === categoria) {
      resultado[resultado.length] = gastos[i];
    }
  }
  return resultado;
}

function obtenerMayorGasto(gastos) {
  if (gastos.length === 0) {
    return null;
  }
  let mayor = gastos[0];
  for (let i = 1; i < gastos.length; i++) {
    if (gastos[i].monto > mayor.monto) {
      mayor = gastos[i];
    }
  }
  return mayor;
}

function clasificarGasto(monto) {
  if (monto >= 100) {
    return "Alto";
  } else if (monto >= 50) {
    return "Medio";
  } else {
    return "Bajo";
  }
}

function describirCategoria(categoria) {
  switch (categoria) {
    case "alimentacion":
      return "Comidas y compras de alimentos";
    case "transporte":
      return "Movilidad, combustible y mantenimiento";
    case "estudio":
      return "Material y equipo para estudiar";
    case "entretenimiento":
      return "Ocio y salidas";
    default:
      return "Categoria sin descripcion";
  }
}

function crearContadorDeAltos() {
  let cantidadAltos = 0;
  return function () {
    cantidadAltos = cantidadAltos + 1;
    return cantidadAltos;
  };
}

// ---------- Proceso principal ----------
try {
  const gastosClasificados = [];
  const contarAlto = crearContadorDeAltos();
  let cantidadAltos = 0;

  for (let i = 0; i < gastos.length; i++) {
    const nivel = clasificarGasto(gastos[i].monto);
    gastosClasificados[gastosClasificados.length] = {
      descripcion: gastos[i].descripcion,
      monto: gastos[i].monto,
      categoria: gastos[i].categoria,
      nivel: nivel,
      descripcionCategoria: describirCategoria(gastos[i].categoria)
    };
    if (nivel === "Alto") {
      cantidadAltos = contarAlto();
    }
  }

  console.log("=== Gastos clasificados ===");
  console.table(gastosClasificados);

  const total = calcularTotal(gastos);
  const promedio = calcularPromedio(gastos);
  console.log("Total gastado: $" + total);
  console.log("Promedio por gasto: $" + promedio);

  const mayorGasto = obtenerMayorGasto(gastos);
  console.log(
    "Gasto mas alto: " + mayorGasto.descripcion +
    " ($" + mayorGasto.monto + ", categoria " + mayorGasto.categoria + ")"
  );

  console.log("Cantidad de gastos de nivel Alto: " + cantidadAltos);

  const categoriaElegida = "transporte";
  const gastosDeCategoria = filtrarPorCategoria(gastos, categoriaElegida);
  console.log("Gastos de la categoria '" + categoriaElegida + "':");
  console.table(gastosDeCategoria);

  const resumenPorCategoria = {};
  for (let i = 0; i < gastos.length; i++) {
    const categoria = gastos[i].categoria;
    if (resumenPorCategoria[categoria] === undefined) {
      resumenPorCategoria[categoria] = 0;
    }
    resumenPorCategoria[categoria] = resumenPorCategoria[categoria] + gastos[i].monto;
  }

  const informe = {
    total: total,
    promedio: promedio,
    cantidadAltos: cantidadAltos,
    mayorGasto: mayorGasto,
    resumenPorCategoria: resumenPorCategoria
  };
  console.log("=== Informe final (JSON) ===");
  console.log(JSON.stringify(informe, null, 2));
} catch (error) {
  console.error("Error en el proceso principal: " + error.message);
}

// ---------- Prueba controlada del error ----------
try {
  calcularPromedio([]);
} catch (error) {
  console.error("Error controlado: " + error.message);
}
