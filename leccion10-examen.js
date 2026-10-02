let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen10-unidad-del-cuerpo');
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

  // Preguntas de opción múltiple (1–3) -> 2 puntos cada una (Total: 6 pts)
  const respuestasCorrectas = {
    pregunta1: "B",
    pregunta2: "A",
    pregunta3: "A"
  };
  for (let i = 1; i <= 3; i++) {
    const campo = document.querySelector(`select[name="pregunta${i}"]`);
    if (campo && campo.value === respuestasCorrectas[`pregunta${i}`]) score += 2;
  }

  // Emparejar niveles de comunicación (4–9) -> 1 punto cada una (Total: 6 pts)
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

  // Versículo de memoria (10–12) -> 3 puntos distribuidos (Total: 3 pts)
  const versiculo = document.querySelector('textarea[name="versiculo"]');
  if (versiculo) {
    const texto = versiculo.value.toLowerCase();
    if (texto.includes("un mandamiento nuevo os doy")) score++;
    if (texto.includes("que os améis unos a otros")) score++;
    if (texto.includes("en esto conocerán todos")) score++;
  }

  // Confirmaciones (13–14) -> 1 punto cada una (Total: 2 pts)
  const estudie = document.querySelector('input[name="estudie"]')?.checked;
  const termine = document.querySelector('input[name="termine"]')?.checked;
  if (estudie) score++;
  if (termine) score++;

  // Total de puntaje máximo de la escala = 17 puntos
  const total = 17;
  const porcentaje = Math.round((score / total) * 100);

  // Mostrar resultado en pantalla
  document.getElementById("resultado").innerHTML =
    `<strong>Resultado final:</strong> ${score}/${total} (${porcentaje}%)`;

  // Guardar en localStorage de forma segura
  const resultado = {
    nombre: alumno,
    puntaje: score,
    porcentaje: porcentaje,
    fecha: new Date().toISOString()
  };
  localStorage.setItem('examen10-unidad-del-cuerpo', JSON.stringify(resultado));

  // Inyectar el botón de descarga manual de forma limpia
  document.getElementById('acciones-pdf').innerHTML = `
    <button type="button" onclick="generarPDFExamen()" style="background: #1f4e8c; color: white; border: none; width: 100%; padding: 12px; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">
      📥 Descargar mi Examen en PDF
    </button>
  `;
}