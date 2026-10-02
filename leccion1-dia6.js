let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen1-orientacion');
  if (resultadoGuardado) {
    const datos = JSON.parse(resultadoGuardado);
    document.getElementById('modal-bloqueo').style.display = 'block';
    document.getElementById('mensaje-bloqueo').innerText =
      `El alumno "${datos.nombre}" ya presentó el examen.\nPuntaje: ${datos.puntaje}/17 (${datos.porcentaje}%)`;
  } else {
    document.getElementById('modal-instrucciones').style.display = 'block';
  }
};

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

function desbloquearExamen() {
  const clave = document.getElementById('clave').value.trim();
  if (clave === "59") {
    localStorage.removeItem('examen1-orientacion');
    location.reload();
  } else {
    alert("Clave incorrecta.");
  }
}

function calcularExamen() {
  const respuestas = {
    p1: 'A', p2: 'B', p3: 'C', p4: 'D', p5: 'D',
    p6: 'C', p7: 'A', p8: 'A', p9: 'B'
  };

  let puntaje = 0;
  let incorrectas = 0;

  // Preguntas tipo test
  for (let i = 1; i <= 9; i++) {
    const campo = document.querySelector(`select[name="p${i}"]`);
    const respuesta = campo.value.trim().toUpperCase();
    if (respuesta === respuestas[`p${i}`]) {
      puntaje += 2;
    } else {
      incorrectas++;
    }
  }

  // Pregunta 10: versículo lema
  const lema = document.querySelector('input[name="p10"]')?.value.trim().toLowerCase();
  if (lema && lema.includes("2 timoteo 2:15")) {
    puntaje += 1;
  } else {
    incorrectas++;
  }

  // Pregunta 11: versículo completo
  const versiculoCompleto = document.querySelector('textarea[name="p11"]')?.value.trim().toLowerCase();
  const claves = [
    "procura con diligencia",
    "presentarte a dios aprobado",
    "obrero",
    "no tiene de qué avergonzarse",
    "usa bien la palabra de verdad"
  ];
  let coincidencias = 0;
  claves.forEach(frase => {
    if (versiculoCompleto.includes(frase)) coincidencias++;
  });
  if (coincidencias >= 4) {
    puntaje += 5;
  } else {
    incorrectas++;
  }

  // Confirmación: ¿Terminó la lección?
  const termine = document.querySelector('input[name="extra2"]')?.checked;
  if (termine) puntaje += 1;

  // Limitar puntaje máximo
  const total = 17;
  if (puntaje > total) puntaje = total;

  const porcentaje = Math.round((puntaje / total) * 100);

  // Mostrar resultado en pantalla
  document.getElementById('resultado').innerText =
    `Alumno: ${alumno} | Puntaje: ${puntaje}/${total} (${porcentaje}%)`;

  // Guardar en localStorage de forma segura
  localStorage.setItem('examen1-orientacion', JSON.stringify({
    nombre: alumno,
    puntaje,
    porcentaje,
    fecha: new Date().toISOString()
  }));

  // Inyectar de manera segura el botón para la descarga manual opcional del PDF
  document.getElementById('acciones-pdf').innerHTML = `
    <button type="button" onclick="generarPDFExamen()" style="background: #1f4e8c; color: white; border: none; width: 100%; padding: 12px; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">
      📥 Descargar mi Examen en PDF
    </button>
  `;
}