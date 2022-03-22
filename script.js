const botaoCriaTarefa = document.getElementById('criar-tarefa');
const listaDeTarefas = [];
const botaoApagaTudo = document.getElementById('apaga-tudo');

function armazenaTarefa(texto) {
  listaDeTarefas.push(texto);
}

function selecionaTarefa(event) {
  const tarefaSelecionada = document.getElementsByClassName('selected');

  if (tarefaSelecionada.length >= 1) {
    tarefaSelecionada[0].classList.remove('selected');
    event.target.classList.add('selected');
  } else if (event.target.classList.contains('selected') === false) {
    event.target.classList.add('selected');
  }
}

function completaTarefa(event) {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}

function criaTarefa() {
  const tarefa = document.createElement('li');
  tarefa.innerText = document.getElementById('texto-tarefa').value;
  tarefa.classList = 'tarefa';
  tarefa.addEventListener('click', selecionaTarefa);
  tarefa.addEventListener('dblclick', completaTarefa);
  return tarefa;
}

function addTarefa() {
  const listaTarefas = document.getElementById('lista-tarefas');
  const tarefa = criaTarefa();
  listaTarefas.appendChild(tarefa);
  armazenaTarefa(tarefa.innerText);
  document.getElementById('texto-tarefa').value = '';
}


