let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen9-testigos');
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
    localStorage.removeItem('examen9-testigos');
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

  // Evaluar solo los principios (1 punto por cada uno si tiene contenido)
  for (let i = 1; i <= 7; i++) {
    const principio = document.querySelector(`textarea[name="principio${i}"]`);
    if (principio && principio.value.trim().length > 0) score +=2;
  }

  // Evaluar testimonio (1 punto si tiene contenido)
  const testimonio = document.querySelector('textarea[name="testimonio"]');
  if (testimonio && testimonio.value.trim().length > 0) score++;

  // Confirmaciones
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
  localStorage.setItem('examen9-testigos', JSON.stringify(resultado));

  window.print();
}