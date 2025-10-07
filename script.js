 const lecciones = {
      leccion1: [
        "Día 1: Introducción",
        "Día 2: Formación espiritual",
        "Día 3: El grupo de INSTE",
        "Día 4: Cómo memorizar",
        "Día 5: Repaso",
        "Día: exámen"
      ],
      leccion2: [
        "Día 1: Relación con Cristo",
        "Día 2: Costo de seguir",
        "Día 3: Señales del discípulo",
        "Día 4: Gran Comisión (exposición)",
        "Día 5: Gran Comisión (aplicación)",
        "Día: exámen-2"
      ],
      leccion3: [
        "Día 1: ¿Qué es la oración?",
        "Día 2: Vida de oración de Jesús",
        "Día 3: Alabanza y acción de gracias",
        "Día 4: Confesión e intercesión",
        "Día 5: Súplica y petición",
        "Día: exámen3"
      ],
    
  leccion4: [
    "Día 1: La lucha espiritual",
    "Día 2: El bautismo en el Espíritu Santo",
    "Día 3: El ayuno y la oración",
    "Día 4: El ayuno general",
    "Día 5: Repaso"
  ],
  leccion5: [
    "Día 1: Orando en la voluntad de Dios",
    "Día 2: Descubriendo la voluntad de Dios",
    "Día 3: Utilizando una lista de oración",
    "Día 4: Grupos de oración",
    "Día 5: Repaso de la unidad"
  ],
  leccion6: [
    "Día 1: Tu mundo personal",
    "Día 2: El crecimiento espiritual y la evangelización",
    "Día 3: Cómo usar tu testimonio personal",
    "Día 4: Cómo explicar el plan de salvación",
    "Día 5: Repaso de la lección"
  ],
  leccion7: [
    "Día 1: Cómo usar las Escrituras en la evangelización",
    "Día 2: Tomar la decisión",
    "Día 3: El seguimiento",
    "Día 4: Cómo contestar las objeciones",
    "Día 5: Evangelizando en el mundo moderno"
  ],
  leccion8: [
    "Día 1: Cómo Dios nos ve",
    "Día 2: El concepto de sí mismo",
    "Día 3: La comunión como medio de crecimiento",
    "Día 4: Conociéndonos los unos a los otros",
    "Día 5: La vida cristiana es relacional"
  ],
  leccion9: [
    "Día 1: Los principios 1 y 2",
    "Día 2: Los principios 3 al 7",
    "Día 3: Los principios 8 al 10",
    "Día 4: Los principios 11 y 12",
    "Día 5: Repaso"
  ],
  leccion10: [
    "Día 1: Cómo resolver un conflicto",
    "Día 2: La verdadera reconciliación",
    "Día 3: La comunicación en la comunidad del Rey",
    "Día 4: Estudio temático: La lengua",
    "Día 5: Repaso"
  ],
  leccion11: [
    "Día 1: Cómo leer la Biblia",
    "Día 2: Cómo escuchar un sermón",
    "Día 3: Cómo usar las herramientas de estudio bíblico",
    "Día 4: Cómo usar la literatura cristiana en el estudio bíblico",
    "Día 5: Resumen"
  ],
  leccion12: [
    "Día 1: El método sintético",
    "Día 2: La introducción al libro",
    "Día 3: Los párrafos y el bosquejo",
    "Día 4: El resumen del mensaje del libro",
    "Día 5: Resumen y repaso"
  ],
  leccion13: [
    "Día 1: El método temático",
    "Día 2: El método temático",
    "Día 3: El método biográfico",
    "Día 4: El método biográfico",
    "Día 5: Repaso de los métodos de estudio bíblico"
  ],
  leccion14: [
    "Día 1: Repaso de las lecciones 1 y 2: El señorío de Cristo",
    "Día 2: Repaso de las lecciones 3 a 5: La oración",
    "Día 3: Repaso de las lecciones 6 y 7: El testimonio personal",
    "Día 4: Repaso de las lecciones 8 a 10: La iglesia",
    "Día 5: Repaso de las lecciones 11 a 13: El estudio bíblico"
  ]
};


  function openModal(leccionId) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modal-content');
  content.innerHTML = `<h2>${leccionId.replace('leccion', 'Lección ')}</h2>`;

  lecciones[leccionId].forEach((diaTexto, i) => {
    const diaId = `${leccionId}-dia${i + 1}`;
    const visto = localStorage.getItem(diaId) === 'vista';
    const clase = visto ? 'day-button visto' : 'day-button';
    const icono = visto ? '✅ ' : '';
    content.innerHTML += `<button class="${clase}" onclick="goToDia('${diaId}')">${icono}${diaTexto}</button>`;
  });

  content.innerHTML += `<button class="close" onclick="closeModal()">Cerrar</button>`;
  modal.style.display = 'flex';
}

    function closeModal() {
      document.getElementById('modal').style.display = 'none';
    }

       function goToDia(diaId) {
       window.location.href = `${diaId}.html`; // Aquí puedes usar window.location.href si tienes páginas reales
    }

    function toggleMode() {
      document.body.classList.toggle('dark');
      const button = document.querySelector('.toggle-mode');
      button.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    }
    function marcarLeccionVista(leccionId) {
  localStorage.setItem(leccionId, 'vista');
}
document.addEventListener('DOMContentLoaded', () => {
    marcarLeccionVista('leccion1-dia1');
  });
function actualizarProgreso() {
  document.querySelectorAll('.card').forEach(card => {
    const id = card.getAttribute('onclick').match(/'([^']+)'/)[1];
    if (localStorage.getItem(`${id}-dia1`) === 'vista') {
      card.classList.add('vista');
    }
  });
}

document.addEventListener('DOMContentLoaded', actualizarProgreso);

function openModal(leccionId) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modal-content');
  content.innerHTML = `<h2>${leccionId.replace('leccion', 'Lección ')}</h2>`;

  lecciones[leccionId].forEach((diaTexto, i) => {
    const diaId = `${leccionId}-dia${i + 1}`;
    const visto = localStorage.getItem(diaId) === 'vista';
    const clase = visto ? 'day-button visto' : 'day-button';
    const icono = visto ? '✅ ' : '';
    content.innerHTML += `<button class="${clase}" onclick="goToDia('${diaId}')">${icono}${diaTexto}</button>`;
  });

  content.innerHTML += `<button class="close" onclick="closeModal()">Cerrar</button>`;
  modal.style.display = 'flex';
}