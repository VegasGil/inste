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
    if (lectura.value === "1-4") score += 4;
    if (lectura.value === "5-6") score += 5;
    if (lectura.value === "7-8") score += 6;
  }

  // Pregunta 16–20: Estudio sintético (4 componentes)
  const componentes = document.querySelectorAll('input[name="componentes"]:checked');
  score += componentes.length; // cada componente = 1 punto

  // Versículo de memoria (26–30)
  const versiculo = document.querySelector('textarea[name="versiculo"]');
  if (versiculo) {
    const texto = versiculo.value.toLowerCase();
    if (texto.includes("la palabra de cristo more en abundancia")) score++;
    if (texto.includes("enseñándoos y exhortándoos unos a otros")) score++;
    if (texto.includes("en toda sabiduría")) score++;
    if (texto.includes("cantando con gracia en vuestros corazones")) score++;
    if (texto.includes("salmos e himnos y cánticos espirituales")) score++;
  }

  // Confirmaciones (31–32)
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
  localStorage.setItem('examen12-dia4-como-estudiar-la-biblia', JSON.stringify(resultado));

  window.print();
}