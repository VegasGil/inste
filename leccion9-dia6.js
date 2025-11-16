let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen9-unos-a-otros');
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
    localStorage.removeItem('examen9-unos-a-otros');
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

// Pregunta 1–12: principios “unos a otros” (1 punto por cada respuesta completa)
for (let i = 1; i <= 12; i++) {
  const campo = document.querySelector(`input[name="principio${i}"]`);
  if (campo && campo.value.trim().length > 0) score++;
}

  // Pregunta 8–12: versículo (Hebreos 10:24–25)
  // Pregunta 8–12: versículo (Hebreos 10:24–25)
const versiculo = document.querySelector('textarea[name="versiculo"]');
if (versiculo) {
  const texto = versiculo.value.toLowerCase();
  if (texto.includes("considerémonos unos a otros")) score++;
  // if (texto.includes("estimularnos al amor")) score++;
  if (texto.includes("no dejando de congregarnos")) score++;
}

  // Pregunta 13: comparación con compañero
  const evaluacion = document.querySelector('textarea[name="evaluacion"]');
  if (evaluacion && evaluacion.value.trim().length > 0) score++;

  // Confirmaciones 14 y 15
  const extra1 = document.querySelector('input[name="extra1"]');
  const extra2 = document.querySelector('input[name="extra2"]');
  if (extra1 && extra1.checked) score++;
  if (extra2 && extra2.checked) score++;

  const total = 17;
  const porcentaje = ((score / total) * 100).toFixed(2);

  document.getElementById("resultado").innerHTML =
    `<strong>Resultado final:</strong> ${score}/${total} (${porcentaje}%)`;

  const resultado = {
    nombre: alumno,
    puntaje: score,
    porcentaje: porcentaje
  };
  localStorage.setItem('examen9-unos-a-otros', JSON.stringify(resultado));

  window.print();
}