let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen8-identidad');
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
    localStorage.removeItem('examen8-identidad');
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

  // Preguntas 1–5: texto libre
  let respuestasCompletas = 0;
  for (let i = 1; i <= 5; i++) {
    const campo = document.querySelector(`input[name="p${i}"]`);
    if (campo && campo.value.trim().length > 0) respuestasCompletas++;
  }
  if (respuestasCompletas >= 3) score++;

  // Preguntas 6–7: selección
  const respuestasSeleccion = {
    p6: "A",
    p7: "D"
  };
  for (let key in respuestasSeleccion) {
    const campo = document.querySelector(`select[name="${key}"]`);
    if (campo && campo.value === respuestasSeleccion[key]) score++;
  }

  // Preguntas 8–17: ventana de Johari
  const respuestasJohari = {
    johari8: "D",
    johari9: "A",
    johari10: "C",
    johari11: "B",
    johari12: "A",
    johari13: "B",
    johari14: "C",
    johari15: "D",
    johari16: "A",
    johari17: "C"
  };
  for (let key in respuestasJohari) {
    const campo = document.querySelector(`select[name="${key}"]`);
    if (campo && campo.value === respuestasJohari[key]) score++;
  }

  // Versículo 18–20
  const versiculo = document.querySelector('textarea[name="versiculo"]');
  if (
    versiculo &&
    versiculo.value.toLowerCase().includes("nueva criatura") &&
    versiculo.value.toLowerCase().includes("cosas viejas pasaron") &&
    versiculo.value.toLowerCase().includes("todas son hechas nuevas")
  ) score++;

  // Ejercicio del día 2
  const compañero = document.querySelector('textarea[name="compañero"]');
  if (compañero && compañero.value.trim().length > 0) score++;

  // Confirmaciones
  const extra1 = document.querySelector('input[name="extra1"]')?.checked;
  const extra2 = document.querySelector('input[name="extra2"]')?.checked;
  if (extra1) score++;
  if (extra2) score++;

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
  localStorage.setItem('examen8-identidad', JSON.stringify(resultado));

  // Inyectar el botón de descarga manual de forma limpia
  document.getElementById('acciones-pdf').innerHTML = `
    <button type="button" onclick="generarPDFExamen()" style="background: #1f4e8c; color: white; border: none; width: 100%; padding: 12px; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">
      📥 Descargar mi Examen en PDF
    </button>
  `;
}