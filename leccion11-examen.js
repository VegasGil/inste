let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen11-como-estudiar-la-biblia');
  if (resultadoGuardado) {
    const datos = JSON.parse(resultadoGuardado);
    document.getElementById('modal-bloqueo').style.display = 'flex';
    document.getElementById('mensaje-bloqueo').innerText =
      `El alumno "${datos.nombre}" ya presentó el examen.\nPuntaje: ${datos.puntaje}/17 (${datos.porcentaje}%)`;
  } else {
    document.getElementById('modal-instrucciones').style.display = 'flex';
  }
};

function desbloquearExamen() {
  const clave = document.getElementById('clave').value.trim();
  if (clave === "59") {
    localStorage.removeItem('examen11-como-estudiar-la-biblia');
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

  // Preguntas de opción múltiple (1–8)
  const respuestasCorrectas = {
    pregunta1: "C",
    pregunta2: "C",
    pregunta3: "A",
    pregunta4: "D",
    pregunta5: "C",
    pregunta6: "B",
    pregunta7: "A",
    pregunta8: "D"
  };

  for (let i = 1; i <= 8; i++) {
    const campo = document.querySelector(`select[name="pregunta${i}"]`);
    if (campo && campo.value === respuestasCorrectas[`pregunta${i}`]) score++;
  }

  // Pregunta abierta 9–10 (respuesta de sermón)
  const respuestaSermon = document.querySelector('textarea[name="respuesta_sermon"]');
  if (respuestaSermon && respuestaSermon.value.trim().length > 0) score++;

  // Versículo de memoria (11–15)
  const versiculo = document.querySelector('textarea[name="versiculo"]');
  if (versiculo) {
    const texto = versiculo.value.toLowerCase();
    if (texto.includes("todo lo puedo")) score += 2;
    if (texto.includes("en cristo")) score += 2;
    if (texto.includes("que me fortalece")) score += 2;
  }

  // Confirmaciones (16–17)
  const estudie = document.querySelector('input[name="estudie"]');
  const termine = document.querySelector('input[name="termine"]');
  if (estudie && estudie.checked) score++;
  if (termine && termine.checked) score++;

  // Total = 17
  const total = 17;
  const porcentaje = ((score / total) * 100).toFixed(2);

  document.getElementById("resultado").innerHTML =
    `<strong>Resultado final:</strong> ${score}/${total} (${porcentaje}%)`;

  const resultado = {
    nombre: alumno,
    puntaje: score,
    porcentaje: porcentaje
  };
  localStorage.setItem('examen11-como-estudiar-la-biblia', JSON.stringify(resultado));

  window.print();
}