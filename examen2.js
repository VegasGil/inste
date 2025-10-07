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

    for (let i = 1; i <= 8; i++) {
      const campo = document.querySelector(`select[name="p${i}"]`);
      const respuesta = campo.value.trim().toUpperCase();
      if (respuesta === respuestas[`p${i}`]) {
        puntaje += 2;
      } else {
        incorrectas++;
      }
    }

    // const estudie = document.querySelector('input[name="extra1"]')?.checked;
    const termine = document.querySelector('input[name="extra2"]')?.checked;
    // if (estudie) puntaje++;
    if (termine) puntaje++;

    const total = 17;
    const porcentaje = Math.round((puntaje / total) * 100);

    document.getElementById('resultado').innerText =
      `Alumno: ${alumno} | Puntaje: ${puntaje}/17 (${porcentaje}%)`;

    localStorage.setItem('examen2-discipulado', JSON.stringify({
      nombre: alumno,
      puntaje,
      porcentaje,
      fecha: new Date().toISOString()
    }));

    window.print();
  }
