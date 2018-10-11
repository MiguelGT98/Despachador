tiempoDeQuantum = 3000;
tiempoDeCambioDeContexto = 10;
tiempoDeBloqueo = 10;
numeroDeMicros = 1;

calcularTiempo = algo => {};

procesos = [
  {
    nombre: "B",
    empiezaEn: 0,

    numeroDeBloqueos: 2,
    tiempoDeCambioDeContexto: null,
    tiempoDeEjecucion: 300,
    tiempoDeVencimientoDeQuantum: null,
    tiempoTotal: null,
    tiempoDeInicio: null,
    tiempoFinal: null
  },
  {
    nombre: "D",
    empiezaEn: 0,

    numeroDeBloqueos: 2,
    tiempoDeCambioDeContexto: null,
    tiempoDeEjecucion: 100,
    tiempoDeVencimientoDeQuantum: null,
    tiempoTotal: null,
    tiempoDeInicio: null,
    tiempoFinal: null
  },
  {
    nombre: "H",
    empiezaEn: 1500,

    numeroDeBloqueos: 4,
    tiempoDeCambioDeContexto: null,
    tiempoDeEjecucion: 700,
    tiempoDeVencimientoDeQuantum: null,
    tiempoTotal: null,
    tiempoDeInicio: null,
    tiempoFinal: null
  },
  {
    nombre: "F",
    empiezaEn: 0,

    numeroDeBloqueos: 3,
    tiempoDeCambioDeContexto: null,
    tiempoDeEjecucion: 500,
    tiempoDeVencimientoDeQuantum: null,
    tiempoTotal: null,
    tiempoDeInicio: null,
    tiempoFinal: null
  }
];

ejecucion = (
  numeroDeMicros,
  tiempoDeQuantum,
  tiempoDeBloqueo,
  tiempoDeCambioDeContexto,
  procesos
) => {
  console.log(procesos);

  let procesosOrdenados = procesos.slice(0).sort((a, b) => {
    return a.empiezaEn > b.empiezaEn;
  });

  console.log(procesosOrdenados);
};

ejecucion(
  numeroDeMicros,
  tiempoDeQuantum,
  tiempoDeBloqueo,
  tiempoDeCambioDeContexto,
  procesos
);
