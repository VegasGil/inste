let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen10-unidad-del-cuerpo');
  if (resultadoGuardado) {
    const datos = JSON.parse(resultadoGuardado);
    document.getElementById('modal-bloqueo').style.display = 'flex';
    document.getElementById('mensaje-bloqueo').innerText =
      `El alumno "${datos.nombre}" ya presentó el examen.\nPuntaje: ${datos.puntaje}/14 (${datos.porcentaje}%)`;
  } else {
    document.getElementById('modal-instrucciones').style.display = 'flex';
  }
};

function desbloquearExamen() {
  const clave = document.getElementById('clave').value.trim();
  if (clave === "59") {
    localStorage.removeItem('examen10-unidad-del-cuerpo');
    location.reload();
  } else {
    alert("Clave incorrecta.");
  }
}

function iniciarExamen() {
  const nombreInput = document.getElementById('nombre').value.trim();
  if (nombreInput === "") {
    alert("Por favor ingresa tu nombre.");
    return;
  }
  alumno = nombreInput;
  document.getElementById('modal-instrucciones').style.display = 'none';
  document.getElementById('nombre-impreso').innerText = `Alumno: ${alumno}`;
}
function calcularExamen() {
  let score = 0;

  // Preguntas de opción múltiple (1–3)
  const respuestasCorrectas = {
    pregunta1: "B",
    pregunta2: "A",
    pregunta3: "A"
  };
  for (let i = 1; i <= 3; i++) {
    const campo = document.querySelector(`select[name="pregunta${i}"]`);
    if (campo && campo.value === respuestasCorrectas[`pregunta${i}`]) score += 2;

  }

  // Emparejar niveles de comunicación (4–9)
  const emparejarCorrecto = {
    pregunta4: "A",
    pregunta5: "C",
    pregunta6: "E",
    pregunta7: "B",
    pregunta8: "D",
    pregunta9: "A"
  };
  for (let i = 4; i <= 9; i++) {
    const campo = document.querySelector(`input[name="pregunta${i}"]`);
    if (campo && campo.value.toUpperCase() === emparejarCorrecto[`pregunta${i}`]) score++;
  }

  // Versículo de memoria (10–12)
  const versiculo = document.querySelector('textarea[name="versiculo"]');
  if (versiculo) {
    const texto = versiculo.value.toLowerCase();
    if (texto.includes("un mandamiento nuevo os doy")) score++;
    if (texto.includes("que os améis unos a otros")) score++;
    if (texto.includes("en esto conocerán todos")) score++;
  }

  // Confirmaciones (13–14)
  const estudie = document.querySelector('input[name="estudie"]');
  const termine = document.querySelector('input[name="termine"]');
  if (estudie && estudie.checked) score++;
  if (termine && termine.checked) score++;

  // 🔧 Ajuste: total = 17
  const total = 17;
  const porcentaje = ((score / total) * 100).toFixed(2);

  document.getElementById("resultado").innerHTML =
    `<strong>Resultado final:</strong> ${score}/${total} (${porcentaje}%)`;

  const resultado = {
    nombre: alumno,
    puntaje: score,
    porcentaje: porcentaje
  };
  localStorage.setItem('examen10-unidad-del-cuerpo', JSON.stringify(resultado));

  window.print();
}