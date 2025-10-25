let alumno = "";

window.onload = function () {
  const resultadoGuardado = localStorage.getItem('examen8-orando-espiritu');
  if (resultadoGuardado) {
    const datos = JSON.parse(resultadoGuardado);
    document.getElementById('modal-bloqueo').style.display = 'flex';
    document.getElementById('mensaje-bloqueo').innerText =
      `El alumno "${datos.nombre}" ya presentó el examen.\nPuntaje: ${datos.puntaje}/12 (${datos.porcentaje}%)`;
  } else {
    document.getElementById('modal-instrucciones').style.display = 'flex';
  }
};

function desbloquearExamen() {
  const clave = document.getElementById('clave').value.trim();
  if (clave === "59") {
    localStorage.removeItem('examen8-orando-espiritu');
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
  const respuestasCorrectas = {
    p1: "C",
    p2: "B",
    p3: "D",
    p4: "B",
    p5: "B"
  };

  let score = 0;

  // Evaluar preguntas tipo test
  for (let key in respuestasCorrectas) {
    const respuesta = document.querySelector(`select[name="${key}"]`).value;
    if (respuesta === respuestasCorrectas[key]) score++;
  }

  // Evaluar versículo (normalizado)
 const versiculo = document.querySelector('textarea[name="versiculo"]').value.trim().toLowerCase();

// Validación flexible: solo verifica si contiene la palabra "señor"
if (versiculo.includes("señor")) score += 5;



  // Evaluar confirmaciones
  const extra1 = document.querySelector('input[name="extra1"]').checked;
  const extra2 = document.querySelector('input[name="extra2"]').checked;
  if (extra1) score++;
  if (extra2) score++;

  const total = 12;
  const porcentaje = ((score / total) * 100).toFixed(2);

  document.getElementById("resultado").innerHTML =
    `<strong>Resultado final:</strong> ${score}/${total} (${porcentaje}%)`;

  // Guardar resultado
  const resultado = {
    nombre: alumno,
    puntaje: score,
    porcentaje: porcentaje
  };
  localStorage.setItem('examen8-orando-espiritu', JSON.stringify(resultado));

  window.print();
}