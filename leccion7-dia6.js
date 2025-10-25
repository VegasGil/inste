let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen10-testigos');
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
    localStorage.removeItem('examen10-testigos');
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

  // Preguntas tipo test (1 punto cada una)
  const respuestasCorrectas = {
    p1: "B",
    p2: "A",
    p3: "C"
  };
  for (let key in respuestasCorrectas) {
    const respuesta = document.querySelector(`select[name="${key}"]`).value;
    if (respuesta === respuestasCorrectas[key]) score++;
  }

  // Pregunta 4–6: oración (3 puntos si tiene contenido)
  const oracion = document.querySelector('textarea[name="oracion"]').value.trim();
  if (oracion.length > 0) score += 3;

  // Pregunta 7–9: ayuda al nuevo creyente (3 puntos si tiene contenido)
  const ayuda = document.querySelector('textarea[name="ayuda"]').value.trim();
  if (ayuda.length > 0) score += 3;

  // Pregunta 10: pregunta difícil (1 punto si tiene contenido)
  const dificil = document.querySelector('textarea[name="dificil"]').value.trim();
  if (dificil.length > 0) score++;

  // Pregunta 11–15: versículo (5 puntos si contiene "señor")
  const versiculo = document.querySelector('textarea[name="versiculo"]').value.trim().toLowerCase();
  if (versiculo.includes("señor")) score += 5;

  // Confirmaciones (1 punto cada una)
  const extra1 = document.querySelector('input[name="extra1"]').checked;
  const extra2 = document.querySelector('input[name="extra2"]').checked;
  if (extra1) score++;
  if (extra2) score++;

  const total = 17;
  const porcentaje = ((score / total) * 100).toFixed(2);

  document.getElementById("resultado").innerHTML =
    `<strong>Resultado final:</strong> ${score}/${total} (${porcentaje}%)`;

  const resultado = {
    nombre: alumno,
    puntaje: score,
    porcentaje: porcentaje
  };
  localStorage.setItem('examen10-testigos', JSON.stringify(resultado));

  window.print();
}