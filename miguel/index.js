document.addEventListener(
  "DOMContentLoaded",
  () => {
    let calculateProcessButton = document.getElementById(
      "calculate-process-button"
    );

    calculateProcessButton.addEventListener("click", e => {
      obtainData();
    });
  },
  false
);

let tablaTiempoDeBloqueo = 0;
let tablaTiempoDeCambioDeContexto = 0;

let isNumber = n => {
  return !isNaN(+n) && isFinite(n);
};

let obtainData = () => {
  let processorsInput = document.getElementById("processor_amount");
  let quantumInput = document.getElementById("quantum_size");
  let blockageTimeInput = document.getElementById("blockage_time");
  let contextTimeInput = document.getElementById("context_time");

  if (
    processorsInput.value === "" ||
    quantumInput.value === "" ||
    blockageTimeInput.value === "" ||
    contextTimeInput.value === "" ||
    !isNumber(processorsInput.value) ||
    !isNumber(quantumInput.value) ||
    !isNumber(blockageTimeInput.value) ||
    !isNumber(contextTimeInput.value) ||
    Number(processorsInput.value) <= 0 ||
    Number(quantumInput.value) <= 0 ||
    Number(blockageTimeInput.value) <= 0 ||
    Number(contextTimeInput.value) <= 0
  ) {
    if (
      processorsInput.value === "" ||
      !isNumber(processorsInput.value) ||
      Number(processorsInput.value) <= 0
    ) {
      processorsInput.classList.add("invalid");
    }

    if (
      quantumInput.value === "" ||
      !isNumber(quantumInput.value) ||
      Number(quantumInput.value) <= 0
    ) {
      quantumInput.classList.add("invalid");
    }

    if (
      blockageTimeInput.value === "" ||
      !isNumber(blockageTimeInput.value) ||
      Number(blockageTimeInput.value) <= 0
    ) {
      blockageTimeInput.classList.add("invalid");
    }

    if (
      contextTimeInput.value === "" ||
      !isNumber(contextTimeInput.value) ||
      Number(contextTimeInput.value) <= 0
    ) {
      contextTimeInput.classList.add("invalid");
    }
    return;
  }

  let tiempoDeQuantum = parseInt(quantumInput.value);
  let tiempoDeCambioDeContexto = parseInt(contextTimeInput.value);
  let tiempoDeBloqueo = parseInt(blockageTimeInput.value);
  let numeroDeMicros = parseInt(processorsInput.value);

  calculate(
    numeroDeMicros,
    tiempoDeBloqueo,
    tiempoDeCambioDeContexto,
    tiempoDeQuantum
  );
};

/* Manejo de la logica del algoritmo */

let calculate = (
  numeroDeMicros,
  tiempoDeBloqueo,
  tiempoDeCambioDeContexto,
  tiempoDeQuantum
) => {
  var quantum = tiempoDeQuantum;
  var tiempoCambios = tiempoDeCambioDeContexto;
  var bloqueo = tiempoDeBloqueo;
  tablaTiempoDeBloqueo = tiempoDeBloqueo;
  tablaTiempoDeCambioDeContexto = tiempoDeCambioDeContexto;
  var micros = numeroDeMicros;

  var procesos = [];
  var microProcesador = [];
  createProceso(0, "B", 300);
  createProceso(0, "D", 100);
  createProceso(0, "F", 500);
  createProceso(0, "H", 700);

  createProceso(1500, "J", 300);
  createProceso(1500, "L", 3000);
  createProceso(1500, "N", 50);
  createProceso(1500, "O", 600);

  createProceso(3000, "A", 400);
  createProceso(3000, "C", 50);
  createProceso(3000, "E", 1000);
  createProceso(3000, "G", 10);
  createProceso(3000, "I", 450);

  createProceso(4000, "K", 100);
  createProceso(4000, "M", 80);
  createProceso(4000, "P", 800);

  createProceso(8000, "Ñ", 500);

  /*
  for (i = 0; i < arrayProcesos.length; i++) {
    createProceso(
      parseInt(arrayProcesos[i].empiezaEn),
      arrayProcesos[i].nombre,
      parseInt(arrayProcesos[i].tiempoDeEjecucion),
      parseInt(arrayProcesos[i].numeroDeBloqueos)
    )
  }

  for (i = 0; i < procesos.length; i++) {
    console.log(procesos[i]);
  }*/

  for (i = 0; i < micros; i++) {
    var m = {
      nombre: "Microprocesador " + (i + 1),
      tiempo: 0,
      proceso: [],
      espera: true
    };
    microProcesador.push(m);
  }

  function ejecutarDespachador() {
    document.getElementById("micro_collection").innerHTML = "";
    for (i = 0; i < procesos.length; i++) {
      b = bestMicro();
      if (microProcesador[b].tiempo < procesos[i].iniciaEn) {
        b = closestMicro(procesos[i]);
        microProcesador[b].espera = true;
        microProcesador[b].proceso.push(
          createProcesoE("", b, procesos[i].iniciaEn)
        );
        microProcesador[b].tiempo = procesos[i].iniciaEn;
      }

      if (microProcesador[b].espera == false) {
        procesos[i].cambioContexto = tiempoCambios;
      }

      calcularTiempos(procesos[i], microProcesador[b].tiempo);
      microProcesador[b].proceso.push(procesos[i]);
      microProcesador[b].tiempo = procesos[i].tiempoFinal;
      microProcesador[b].espera = false;
    }
  }

  function bestMicro() {
    var bestIndex = 0;
    for (j = 0; j < microProcesador.length; j++) {
      if (microProcesador[bestIndex].tiempo > microProcesador[j].tiempo) {
        bestIndex = j;
      }
    }
    return bestIndex;
  }

  function closestMicro(p) {
    var index = 0;
    var closest = 1000000;
    var distance;

    for (j = 0; j < microProcesador.length; j++) {
      distance = p.iniciaEn - microProcesador[j].tiempo;

      if (distance < closest && distance > 0) {
        index = j;
        return index;
      }
    }

    return index;
  }

  function calcularTiempos(p, ti) {
    p.tiempoInicial = ti;
    p.tiempoTotal =
      p.cambioContexto + p.ejecucion + p.vencimientoCuantum + p.tiempoBloqueo;
    p.tiempoFinal = p.tiempoTotal + p.tiempoInicial;
  }

  function createProceso(inicio, N, TE) {
    /* No lo manejamos de forma automatica */
    if (TE <= 400) {
      TB = 2 * bloqueo;
    } else if (TE <= 600) {
      TB = 3 * bloqueo;
    } else if (TE <= 800) {
      TB = 4 * bloqueo;
    } else {
      TB = 5 * bloqueo;
    }

    if (quantum < TE) {
      TVC = TE / quantum;
      TVC = (Math.ceil(TVC) - 1) * tiempoCambios;
    } else {
      TVC = 0;
    }
    var proceso = {
      nombre: N,
      cambioContexto: 0,
      ejecucion: TE,
      vencimientoCuantum: TVC,
      tiempoBloqueo: TB,
      tiempoTotal: 0,
      tiempoInicial: 0,
      tiempoFinal: 0,
      iniciaEn: inicio
    };
    procesos.push(proceso);
  }

  function createProcesoE(N, micro, tiempoProceso) {
    var proceso = {
      nombre: N,
      cambioContexto: "",
      ejecucion: "",
      vencimientoCuantum: "",
      tiempoBloqueo: "",
      tiempoTotal: "",
      tiempoInicial: microProcesador[micro].tiempo,
      tiempoFinal: tiempoProceso,
      iniciaEn: ""
    };
    return proceso;
  }

  function crearTablas() {
    // Para conseguir el div de las tablas
    let microCollection = document.getElementById("micro_collection");

    for (i = 0; i < microProcesador.length; i++) {
      let microLi = document.createElement("li");
      microLi.classList.add("collection-item");
      microLi.setAttribute("id", "Micro-" + parseInt(i + 1));

      let microTable = document.createElement("table");
      microTable.classList.add("striped");

      let microThead = document.createElement("thead");
      let microTbody = document.createElement("tbody");

      let microTitle = document.createElement("div");
      microTitle.classList.add("micro-title-container");
      let microTitleText = document.createElement("h5");
      let microTitleSpan = document.createElement("span");

      microTitleText.append(microProcesador[i].nombre);

      let procesosAtendidos = microProcesador[i].proceso.reduce(
        (cantidad, proceso) => {
          if (proceso.nombre !== "") {
            console.log(cantidad);
            cantidad += 1;
          }
          return cantidad;
        },
        0
      );

      microTitleSpan.append("Procesos atendidos: ");
      microTitleSpan.append(procesosAtendidos);
      microTitleSpan.append(" | ");
      microTitleSpan.append("Tiempo total: ");
      microTitleSpan.append(microProcesador[i].tiempo);
      microTitleSpan.append(" (ms)");

      microTitle.appendChild(microTitleText);
      microTitle.appendChild(microTitleSpan);

      let microTrow = document.createElement("tr");

      let microTh1 = document.createElement("th");
      microTh1.append("Proceso");

      let microTh2 = document.createElement("th");
      microTh2.append("Veces en MP");

      let microTh3 = document.createElement("th");
      microTh3.append("Tiempo en MP");

      let microTh4 = document.createElement("th");
      microTh4.append("Veces Bloqueado");

      let microTh5 = document.createElement("th");
      microTh5.append("Tiempo Bloqueado");

      let microTh7 = document.createElement("th");
      microTh7.append("Momento de Inicio");

      let microTh8 = document.createElement("th");
      microTh8.append("Momento de Fin");

      for (j = 0; j < microProcesador[i].proceso.length; j++) {
        let microTd1 = document.createElement("td");
        microTd1.append(microProcesador[i].proceso[j].nombre);

        let microTd2 = document.createElement("td");
        let vecesEnMicro =
          Math.ceil(
            microProcesador[i].proceso[j].vencimientoCuantum /
              tablaTiempoDeCambioDeContexto
          ) + 1;
        if (microProcesador[i].proceso[j].nombre === "") {
          vecesEnMicro = "";
        }
        microTd2.append(vecesEnMicro);

        let microTd3 = document.createElement("td");
        microTd3.append(microProcesador[i].proceso[j].tiempoTotal);

        let microTd4 = document.createElement("td");

        let vecesBloqueado =
          microProcesador[i].proceso[j].tiempoBloqueo / tablaTiempoDeBloqueo;
        if (microProcesador[i].proceso[j].nombre === "") {
          vecesBloqueado = "";
        }
        microTd4.append(vecesBloqueado);

        let microTd5 = document.createElement("td");
        microTd5.append(microProcesador[i].proceso[j].tiempoBloqueo);

        let microTd6 = document.createElement("td");
        microTd6.append(microProcesador[i].proceso[j].tiempoInicial);

        let microTd7 = document.createElement("td");
        microTd7.append(microProcesador[i].proceso[j].tiempoFinal);

        let microTrow2 = document.createElement("tr");

        if (microProcesador[i].proceso[j].nombre === "") {
          microTrow2.classList.add("salto");
        }

        microTrow2.append(
          microTd1,
          microTd2,
          microTd3,
          microTd4,
          microTd5,
          microTd6,
          microTd7
        );

        microTbody.append(microTrow2);
      }

      microTrow.append(
        microTh1,
        microTh2,
        microTh3,
        microTh4,
        microTh5,
        microTh7,
        microTh8
      );
      microThead.append(microTrow);
      microTable.append(microThead, microTbody);
      microLi.append(microTitle, microTable);
      microCollection.appendChild(microLi);
    }
  }

  /* Una vez establecidos los valores se llama a la funcion del despachador para ejecutarse */
  ejecutarDespachador();
  crearTablas();
  /**************************************************************************************** */
};
