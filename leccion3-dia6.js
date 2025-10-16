let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen6-oracion');
  if (resultadoGuardado) {
    const datos = JSON.parse(resultadoGuardado);
    document.getElementById('modal-bloqueo').style.display = 'flex';
    document.getElementById('mensaje-bloqueo').innerText =
      `El alumno "${datos.nombre}" ya presentó el examen.\nPuntaje: ${datos.puntaje}/14 (${datos.porcentaje}%)`;
  } else {
    document.getElementById('modal-instrucciones').style.display = 'flex';
  }
};

function iniciarExamenOracion() {
  const nombreInput = document.getElementById('nombre').value.trim();
  if (nombreInput === "") {
    alert("Por favor ingresa tu nombre.");
    return;
  }
  alumno = nombreInput;
  document.getElementById('modal-instrucciones').style.display = 'none';
  document.getElementById('nombre-impreso').innerText = `Alumno: ${alumno}`;
}

function desbloquearExamenOracion() {
  const clave = document.getElementById('clave').value.trim();
  if (clave === "59") {
    localStorage.removeItem('examen6-oracion');
    location.reload();
  } else {
    alert("Clave incorrecta.");
  }
}

function calcularExamenOracion() {
  let total = 0;
  let errores = 0;

  const respuestasCorrectas = [
    "alabanza",
    "acción de gracias",
    "confesión",
     "intercesión",
     "súplica",
    "petición"
  ];

  for (let i = 1; i <= 6; i++) {
    const respuesta = document.querySelector(`input[name="oracion${i}"]`)?.value.trim().toLowerCase();
    if (respuesta === respuestasCorrectas[i - 1]) {
      total += 1;
    } else {
      errores += 1;
    }
  }

  const padrenuestro = document.querySelector('textarea[name="padrenuestro"]')?.value.trim();
  if (padrenuestro.length >= 100) {
    total += 6;
  } else {
    errores += 1;
  }

  const testimonio = document.querySelector('textarea[name="testimonio"]')?.value.trim();
  if (testimonio.length >= 50) {
    total += 3;
  } else {
    errores += 1;
  }

  const estudio = document.querySelector('input[name="estudio_diario"]')?.checked;
  const leccion = document.querySelector('input[name="leccion_terminada"]')?.checked;

  if (estudio) total += 1;
  if (leccion) total += 1;

  const puntaje = total;
  const porcentaje = Math.round((puntaje / 14) * 100);

  document.getElementById("resultado").innerHTML = `
    <h3>Resultado del examen</h3>
    <p><strong>Alumno:</strong> ${alumno}</p>
    <p><strong>Puntaje:</strong> ${puntaje}/14 (${porcentaje}%)</p>
    <p><strong>Respuestas incorrectas:</strong> ${errores}</p>
  `;

  localStorage.setItem('examen6-oracion', JSON.stringify({
    nombre: alumno,
    puntaje,
    porcentaje,
    fecha: new Date().toISOString()
  }));

  window.print();
}