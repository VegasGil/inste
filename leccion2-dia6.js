 let alumno = "";

  window.onload = function () {
    const resultadoGuardado = localStorage.getItem('examen2-discipulado');
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
      localStorage.removeItem('examen2-discipulado');
      location.reload();
    } else {
      alert("Clave incorrecta.");
    }
  }

 function calcularExamen() {
  const respuestas = {
    p1: 'A', p2: 'C', p3: 'D', p4: 'B', p5: 'A',
    p6: 'D', p7: 'D', p8: 'B'
  };

  let puntaje = 0;
  let incorrectas = 0;

  // Evaluar preguntas tipo test (p1 a p8)
  for (let i = 1; i <= 8; i++) {
    const campo = document.querySelector(`select[name="p${i}"]`);
    const respuesta = campo.value.trim().toUpperCase();
    if (respuesta === respuestas[`p${i}`]) {
      puntaje += 2;
    } else {
      incorrectas++;
    }
  }

  // Evaluar versículo (p9): debe contener la palabra "lucas"
  const versiculo = document.querySelector('textarea[name="p9"]')?.value.trim().toLowerCase();
  if (versiculo && versiculo.includes("lucas")) {
    puntaje += 5;
  } else {
    incorrectas++;
  }

  // Evaluar autoevaluación devocional (p10): debe estar entre 1 y 10
  const devocional = parseInt(document.querySelector('input[name="p10"]')?.value);
  if (!isNaN(devocional) && devocional >= 1 && devocional <= 10) {
    puntaje += 1;
  } else {
    incorrectas++;
  }

  // Evaluar si terminó la lección (extra2)
  const termine = document.querySelector('input[name="extra2"]')?.checked;
  if (termine) puntaje += 1;

  // Limitar puntaje máximo a 17
  const total = 17;
  if (puntaje > total) puntaje = total;

  const porcentaje = Math.round((puntaje / total) * 100);

  // Mostrar resultado
  document.getElementById('resultado').innerText =
    `Alumno: ${alumno} | Puntaje: ${puntaje}/${total} (${porcentaje}%)`;

  // Guardar en localStorage
  localStorage.setItem('examen2-discipulado', JSON.stringify({
    nombre: alumno,
    puntaje,
    porcentaje,
    fecha: new Date().toISOString()
  }));

  // Imprimir
  window.print();
}