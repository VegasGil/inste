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

  // Pasos del estudio biográfico (5 pasos × 4 puntos)
  const pasos = ['paso1', 'paso2', 'paso3', 'paso4', 'paso5'];
  pasos.forEach(p => {
    const campo = document.querySelector(`input[name="${p}"]`);
    if (campo && campo.checked) score += 2;
  });

  // Evaluación del resumen biográfico (5 puntos)
  const biografico = document.querySelector('textarea[name="biografico"]');
  if (biografico) {
    const texto = biografico.value.toLowerCase();
    if (texto.includes("timoteo")) score += 3;
  }

  // Versículo de memoria (Josué 1:8) – 5 puntos
  const versiculo = document.querySelector('textarea[name="versiculo"]');
  if (versiculo) {
    const texto = versiculo.value.toLowerCase();
    if (texto.includes("nunca se apartará de tu boca este libro de la ley")) score += 2;
  }

  // Confirmaciones (26–27) – 2 puntos
  const estudie = document.querySelector('input[name="estudie"]');
  const termine = document.querySelector('input[name="termine"]');
  if (estudie && estudie.checked) score++;
  if (termine && termine.checked) score++;

  // DEFINIR TOTAL (esto faltaba)
  const total = 17;

  const porcentaje = ((score / total) * 100).toFixed(2);

  document.getElementById("resultado").innerHTML =
    `<strong>Resultado final:</strong> ${score}/${total} (${porcentaje}%)`;

  const resultado = {
    nombre: alumno,
    puntaje: score,
    porcentaje: porcentaje
  };

  localStorage.setItem('examen13-como-estudiar-la-biblia', JSON.stringify(resultado));

  window.print();
}