const botaoCriaTarefa = document.getElementById('criar-tarefa');
const listaDeTarefas = [];

function armazenaTarefa(texto) {
  listaDeTarefas.push(texto);
}

// function validaSelected() {
//   const tarefas = document.getElementsByClassName('tarefas');
//   let contSelected = 0;
//   for (let i = 0; i < tarefas.length; i += 1) {
//     if (tarefas[i].classList.contains('selected')) {
//       contSelected += 1;
//     }
//   }
//   console.log(contSelected);
//   return contSelected;
// }

function selecionaTarefa(event) {
  const tarefaSelecionada = document.getElementsByClassName('selected');

  if (event.target.classList.contains('selected')) {
    event.target.classList.remove('selected');
  } else if (tarefaSelecionada.length >= 1) {
    alert('Apenas uma tarefa pode ser selecionada por vez');
  } else {
    event.target.classList.add('selected');
  }
  console.log(tarefaSelecionada);
}

function criaTarefa() {
  const tarefa = document.createElement('li');
  tarefa.innerText = document.getElementById('texto-tarefa').value;
  tarefa.classList = 'tarefa';
  tarefa.addEventListener('click', selecionaTarefa);
  return tarefa;
}

function addTarefa() {
  const listaTarefas = document.getElementById('lista-tarefas');
  const tarefa = criaTarefa();
  listaTarefas.appendChild(tarefa);
  armazenaTarefa(tarefa.innerText);
  document.getElementById('texto-tarefa').value = '';
}

botaoCriaTarefa.addEventListener('click', addTarefa);
