let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen13-como-estudiar-la-biblia');
  if (resultadoGuardado) {
    const datos = JSON.parse(resultadoGuardado);
    document.getElementById('modal-bloqueo').style.display = 'flex';
    document.getElementById('mensaje-bloqueo').innerText =
      `El alumno "${datos.nombre}" ya presentó el examen.\nPuntaje: ${datos.puntaje}/27 (${datos.porcentaje}%)`;
  } else {
    document.getElementById('modal-instrucciones').style.display = 'flex';
  }
};

function desbloquearExamen() {
  const clave = document.getElementById('clave').value.trim();
  if (clave === "59") {
    localStorage.removeItem('examen13-como-estudiar-la-biblia');
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

  // Pasos del estudio biográfico (5 pasos × 4 puntos máx = 20 puntos proporcionales si están marcados)
  const pasos = ['paso1', 'paso2', 'paso3', 'paso4', 'paso5'];
  pasos.forEach(p => {
    const campo = document.querySelector(`input[name="${p}"]`);
    if (campo && campo.checked) score += 4;
  });

  // Evaluación del resumen biográfico (Permite sumar hasta 2 puntos si redactó algo relevante)
  const biografico = document.querySelector('textarea[name="biografico"]');
  if (biografico && biografico.value.trim().length > 0) {
    score += 2;
  }

  // Versículo de memoria (Josué 1:8) – 3 puntos
  const versiculo = document.querySelector('textarea[name="versiculo"]');
  if (versiculo) {
    const texto = versiculo.value.toLowerCase();
    if (texto.includes("nunca se apartará de tu boca") || texto.length > 10) score += 3;
  }

  // Confirmaciones (26–27) – 2 puntos
  const estudie = document.querySelector('input[name="estudie"]')?.checked;
  const termine = document.querySelector('input[name="termine"]')?.checked;
  if (estudie) score++;
  if (termine) score++;

  // Total de puntaje ajustado acorde a la escala de la lección
  const total = 27;
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
  localStorage.setItem('examen13-como-estudiar-la-biblia', JSON.stringify(resultado));

  // Inyectar el botón de descarga manual de forma limpia
  document.getElementById('acciones-pdf').innerHTML = `
    <button type="button" onclick="generarPDFExamen()" style="background: #1f4e8c; color: white; border: none; width: 100%; padding: 12px; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">
      📥 Descargar mi Examen en PDF
    </button>
  `;
}