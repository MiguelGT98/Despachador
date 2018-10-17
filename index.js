document.addEventListener(
  "DOMContentLoaded",
  () => {
    let addProcessButton = document.getElementById("add-process-button");

    addProcessButton.addEventListener("click", e => {
      addProcess();
    });

    let calculateProcessButton = document.getElementById(
      "calculate-process-button"
    );

    calculateProcessButton.addEventListener("click", e => {
      obtainData();
    });
  },
  false
);

let arrayProcesos = [];

calcularTiempo = algo => {};

let addProcess = () => {
  let nameInput = document.getElementById("process_name");
  let startTimeInput = document.getElementById("process_start");
  let durationInput = document.getElementById("process_duration");
  let blockagesInput = document.getElementById("process_blockages");

  if (
    nameInput.value === "" ||
    startTimeInput.value === "" ||
    durationInput.value === "" ||
    blockagesInput.value === "" ||
    !isNumber(startTimeInput.value) ||
    !isNumber(durationInput.value) ||
    !isNumber(blockagesInput.value)
  ) {
    if (nameInput.value === "") {
      nameInput.classList.add("invalid");
    }

    if (startTimeInput.value === "" || !isNumber(startTimeInput.value)) {
      startTimeInput.classList.add("invalid");
    }

    if (durationInput.value === "" || !isNumber(durationInput.value)) {
      durationInput.classList.add("invalid");
    }

    if (blockagesInput.value === "" || !isNumber(blockagesInput.value)) {
      blockagesInput.classList.add("invalid");
    }
    return;
  }

  let newProcess = new Proceso(
    nameInput.value,
    startTimeInput.value,
    durationInput.value,
    blockagesInput.value
  );

  emptyInput(nameInput);
  emptyInput(startTimeInput);
  emptyInput(durationInput);
  emptyInput(blockagesInput);

  arrayProcesos.push(newProcess);
  showProcess(newProcess);
};

function Proceso(name, startTime, duration, blockages) {
  this.nombre = name;
  this.empiezaEn = startTime;
  this.tiempoDeEjecucion = duration;
  this.numeroDeBloqueos = blockages;
  this.tiempoDeCambioDeContexto = null;
  this.tiempoDeVencimientoDeQuantum = null;
  this.tiempoDeInicio = null;
  this.tiempoTotal = null;
  this.tiempoFinal = null;
}

let showProcess = process => {
  let collection = document.getElementById("process_collection");

  let processLi = document.createElement("li");
  processLi.classList.add("collection-item");

  let processDiv = document.createElement("div");
  processDiv.innerText = process.nombre;
  processLi.appendChild(processDiv);

  let processSecondary = document.createElement("div");
  processSecondary.classList.add("secondary-content");
  processSecondary.innerText =
    "Tiempo de ejecución: " + process.tiempoDeEjecucion;
  processDiv.appendChild(processSecondary);

  collection.appendChild(processLi);
};

let emptyInput = input => {
  input.classList.remove("valid");
  input.value = "";
};

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
    !isNumber(contextTimeInput.value)
  ) {
    if (processorsInput.value === "" || !isNumber(processorsInput.value)) {
      processorsInput.classList.add("invalid");
    }

    if (quantumInput.value === "" || !isNumber(quantumInput.value)) {
      quantumInput.classList.add("invalid");
    }

    if (blockageTimeInput.value === "" || !isNumber(blockageTimeInput.value)) {
      blockageTimeInput.classList.add("invalid");
    }

    if (contextTimeInput.value === "" || !isNumber(contextTimeInput.value)) {
      contextTimeInput.classList.add("invalid");
    }
    return;
  }

  let tiempoDeQuantum = parseInt(quantumInput.value);
  let tiempoDeCambioDeContexto = parseInt(contextTimeInput.value);
  let tiempoDeBloqueo = parseInt(blockageTimeInput.value);
  let numeroDeMicros = parseInt(processorsInput.value);

  calculate(numeroDeMicros, tiempoDeBloqueo, tiempoDeCambioDeContexto, tiempoDeQuantum, arrayProcesos);
};

let calculate = () =>{
  console.log("calcular");
}