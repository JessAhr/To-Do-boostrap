

const form = document.getElementById('formTarea');
const input = document.getElementById('inputTarea');
const lista = document.getElementById('listaTareas');
const alerta = document.getElementById('alerta');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto !== '') {
    agregarTarea(texto);
    input.value = '';
    mostrarAlerta();
  }
});

function agregarTarea(texto) {
  const item = document.createElement('li');
  item.className = 'list-group-item d-flex justify-content-between align-items-center';
  item.innerHTML = `
    ${texto}
    <button class="btn btn-sm btn-danger">Eliminar</button>
  `;

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

