let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen4-lucha-espiritual');
  if (resultadoGuardado) {
    const datos = JSON.parse(resultadoGuardado);
    document.getElementById('modal-bloqueo').style.display = 'flex';
    document.getElementById('mensaje-bloqueo').innerText =
      `El alumno "${datos.nombre}" ya presentó el examen.\nPuntaje: ${datos.puntaje}/17 (${datos.porcentaje}%)`;
  } else {
    document.getElementById('modal-instrucciones').style.display = 'flex';
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
    localStorage.removeItem('examen4-lucha-espiritual');
    location.reload();
  } else {
    alert("Clave incorrecta.");
  }
}

function calcularExamen() {
  const respuestas = {
    p1: 'A', p2: 'E', p3: 'A', p4: 'B', p5: 'D',
    p6: 'C', p7: 'F', p8: 'C', p9: 'A', p10: 'B',
    p11: 'D', p12: 'C'
  };

  let puntajeBruto = 0;
  let incorrectas = 0;

  for (let i = 1; i <= 12; i++) {
    const campo = document.querySelector(`select[name="p${i}"]`);
    const respuesta = campo?.value.trim().toUpperCase();
    if (respuesta === respuestas[`p${i}`]) {
      puntajeBruto += 2;
    } else {
      incorrectas++;
    }
  }

  const versiculo = document.querySelector('textarea[name="versiculo"]')?.value.trim().toLowerCase();
  if (versiculo.includes("por nada estéis afanosos") && versiculo.includes("la paz de dios")) {
    puntajeBruto++;
  }

  const termine = document.querySelector('input[name="extra2"]')?.checked;
  if (termine) puntajeBruto++;

  const totalReal = 17;
  const totalBruto = 26;
  const puntajeNormalizado = Math.round((puntajeBruto / totalBruto) * totalReal);
  const porcentaje = Math.round((puntajeNormalizado / totalReal) * 100);

  document.getElementById('resultado').innerText =
    `Alumno: ${alumno} | Puntaje: ${puntajeNormalizado}/17 (${porcentaje}%)`;

  localStorage.setItem('examen4-lucha-espiritual', JSON.stringify({
    nombre: alumno,
    puntaje: puntajeNormalizado,
    porcentaje,
    fecha: new Date().toISOString()
  }));

  window.print();
}