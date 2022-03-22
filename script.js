const botaoCriaTarefa = document.getElementById('criar-tarefa');
const listaDeTarefas = [];

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
