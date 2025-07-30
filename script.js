//guardar tareas en localStorage
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

const form = document.getElementById('formTarea');
const input = document.getElementById('inputTarea');
const lista = document.getElementById('listaTareas');
const alerta = document.getElementById('alerta');
// Mostrar tareas guardadas al cargar
tareas.forEach(t => agregarTarea(t.texto, t.completada));
//enviar formulario
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto !== '') {
    agregarTarea(texto, false);
    tareas.push({ texto, completada: false });
    localStorage.setItem('tareas', JSON.stringify(tareas));
    input.value = '';
    mostrarAlerta();
  }
});

 //Agrega las tareas a la lista
function agregarTarea(texto, completada = false) {
  const item = document.createElement('li');
  item.className = 'list-group-item tarea d-flex justify-content-between align-items-center';

  item.innerHTML = `
      <div class="form-check d-flex align-items-center flex-grow-1">
      <input class="form-check-input me-2 custom-checkbox" type="checkbox">
      <label class="form-check-label flex-grow-1 mb-0">${texto}</label>
      </div>
      <button class="btn btn-sm btn-lila ms-2">Eliminar</button>
  `;
  // casilla de check
    const checkbox = item.querySelector('input');
    if (completada) item.classList.add('tarea-completada');

    checkbox.addEventListener ('change', function () {
      if (this.checked) {
      item.classList.add('tarea-completada');
      } else {
      item.classList.remove('tarea-completada');
      }
      actualizarTareaEstado(texto, this.checked);

    });
    //boton de eliminar tarea
   item.querySelector('button').addEventListener('click', () => {
    item.remove();
  });

  lista.appendChild(item);
}
 
 function mostrarAlerta() {
  alerta.classList.remove('d-none');
  setTimeout(() => {
    alerta.classList.add('d-none');
  }, 3000);
}
function actualizarTareaEstado(texto, completada) {
  tareas = tareas.map(t => t.texto === texto ? { ...t, completada } : t);
  localStorage.setItem('tareas', JSON.stringify(tareas));
}
function eliminarTarea(texto) {
  tareas = tareas.filter(t => t.texto !== texto);
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Navegación entre secciones
const enlaces = document.querySelectorAll('.nav-link');
const secciones = {
  'seccion-inicio': document.getElementById('seccion-inicio'),
  'seccion-agregar': document.getElementById('seccion-agregar'),
  'seccion-tareas': document.getElementById('seccion-tareas')
};

enlaces.forEach(enlace => {
  enlace.addEventListener('click', (e) => {
    e.preventDefault();

    // Quitar active a todos
    enlaces.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');


    // Mostrar la sección seleccionada y aplicarle la animación
    const seccion = e.target.dataset.seccion;
    const elemento = secciones[seccion];
    elemento.classList.remove('d-none');

    // Aplicar clase animada por un breve momento
    elemento.classList.add('seccion-activa');
    setTimeout(() => {
      elemento.classList.remove('seccion-activa');
    }, 800);
  });
});








