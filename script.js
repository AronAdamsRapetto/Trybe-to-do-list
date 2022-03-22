const botaoCriaTarefa = document.getElementById('criar-tarefa');
let listaDeTarefas = [];
const botaoApagaTudo = document.getElementById('apaga-tudo');
const botaoapagaFinalizados = document.getElementById('remover-finalizados');
const botaoSalvaTarefas = document.getElementById('salvar-tarefas');

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

function criaTarefa(texto) {
  const listaTarefas = document.getElementById('lista-tarefas');
  const tarefa = document.createElement('li');
  tarefa.innerText = texto;
  tarefa.classList = 'tarefa';
  tarefa.addEventListener('click', selecionaTarefa);
  tarefa.addEventListener('dblclick', completaTarefa);
  listaTarefas.appendChild(tarefa);
  return tarefa;
}

function addTarefa() {
  const textoTarefa = document.getElementById('texto-tarefa').value;
  const tarefa = criaTarefa(textoTarefa);
  document.getElementById('texto-tarefa').value = '';
  armazenaTarefa(tarefa.innerText);
}

function apagaTudo() {
  document.getElementById('lista-tarefas').innerHTML = '';
  listaDeTarefas = [];
  localStorage.clear();
}

function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas));
}

function removeFinalizados() {
  const tarefas = document.getElementsByClassName('tarefa');
  listaDeTarefas = [];
  for (let i = tarefas.length - 1; i >= 0; i -= 1) {
    if (tarefas[i].classList.contains('completed')) {
      tarefas[i].remove();
    } else {
      listaDeTarefas.unshift(tarefas[i].innerText);
    }
  }
  salvarTarefas();
}

function recarregaTarefas() {
  if (localStorage.getItem('tarefas') === null) {
    localStorage.setItem('tarefas', JSON.stringify([]));
  } else {
    listaDeTarefas = JSON.parse(localStorage.getItem('tarefas'));
    for (let i = 0; i < listaDeTarefas.length; i += 1) {
      criaTarefa(listaDeTarefas[i]);
    }
  }
}

botaoCriaTarefa.addEventListener('click', addTarefa);

botaoApagaTudo.addEventListener('click', apagaTudo);

botaoapagaFinalizados.addEventListener('click', removeFinalizados);

botaoSalvaTarefas.addEventListener('click', salvarTarefas);

window.onload = function () {
  recarregaTarefas();
};
