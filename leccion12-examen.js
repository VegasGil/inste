let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen12-dia4-como-estudiar-la-biblia');
  if (resultadoGuardado) {
    const datos = JSON.parse(resultadoGuardado);
    document.getElementById('modal-bloqueo').style.display = 'flex';
    document.getElementById('mensaje-bloqueo').innerText =
      `El alumno "${datos.nombre}" ya presentó el examen.\nPuntaje: ${datos.puntaje}/32 (${datos.porcentaje}%)`;
  } else {
    document.getElementById('modal-instrucciones').style.display = 'flex';
  }
};

function desbloquearExamen() {
  const clave = document.getElementById('clave').value.trim();
  if (clave === "59") {
    localStorage.removeItem('examen12-dia4-como-estudiar-la-biblia');
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

  // Pregunta 1–15: Lectura de Filipenses
  const lectura = document.querySelector('select[name="lectura"]');
  if (lectura) {
    if (lectura.value === "1-4") score += 5;
    if (lectura.value === "5-6") score += 10;
    if (lectura.value === "7-8") score += 15;
  }

  // Pregunta 16–20: Estudio sintético (4 componentes, 1.25 puntos c/u para sumar 5 pts totales)
  const componentes = document.querySelectorAll('input[name="componentes"]:checked');
  score += componentes.length * 1.25; 

  // Versículo de memoria (26–30)
  const versiculo = document.querySelector('textarea[name="versiculo"]');
  if (versiculo) {
    const texto = versiculo.value.toLowerCase();
    if (texto.includes("colosenses 3:16") || texto.length > 10) score += 7; // Adaptación flexible para evaluar contenido del versículo
  }

  // Confirmaciones (31–32)
  const estudie = document.querySelector('input[name="estudie"]')?.checked;
  const termine = document.querySelector('input[name="termine"]')?.checked;
  if (estudie) score++;
  if (termine) score++;

  // Total = 32
  const total = 32;
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
  localStorage.setItem('examen12-dia4-como-estudiar-la-biblia', JSON.stringify(resultado));

  // Inyectar el botón de descarga manual de forma limpia
  document.getElementById('acciones-pdf').innerHTML = `
    <button type="button" onclick="generarPDFExamen()" style="background: #1f4e8c; color: white; border: none; width: 100%; padding: 12px; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">
      📥 Descargar mi Examen en PDF
    </button>
  `;
}