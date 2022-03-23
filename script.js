const botaoCriaTarefa = document.getElementById('criar-tarefa');
let listaDeTarefas = [];
const botaoApagaTudo = document.getElementById('apaga-tudo');
const botaoapagaFinalizados = document.getElementById('remover-finalizados');
const botaoSalvaTarefas = document.getElementById('salvar-tarefas');
const botaoMoveCima = document.getElementById('mover-cima');
const botaoMoveBaixo = document.getElementById('mover-baixo');
const listaTarefas = document.getElementById('lista-tarefas');
let listaDeTarefasFinalizadas = [];
const botaoRemoveSelecionado = document.getElementById('remover-selecionado');

function armazenaTarefa(texto) {
  listaDeTarefas.push(texto);
}

function armazenaTarefaFinalizada(texto) {
  listaDeTarefasFinalizadas.push(texto);
}

function removeTarefaFinalizada(texto) {
  for (let i = 0; i < listaDeTarefasFinalizadas.length; i += 1) {
    if (listaDeTarefasFinalizadas[i] === texto) {
      listaDeTarefasFinalizadas.splice(i, 1);
    }
  }
}

function selecionaTarefa(event) {
  const tarefaSelecionada = document.getElementsByClassName('selected');

  if (tarefaSelecionada.length >= 1) {
    tarefaSelecionada[0].classList.remove('selected');
    event.target.classList.add('selected');
  } else if (event.target.classList.contains('selected')) {
    event.target.classList.remove('selected');
  } else if (event.target.classList.contains('selected') === false) {
    event.target.classList.add('selected');
  }
}

function completaTarefa(event) {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
    removeTarefaFinalizada(event.target.innerText);
  } else {
    event.target.classList.add('completed');
    armazenaTarefaFinalizada(event.target.innerText);
  }
}

function criaTarefa(texto) {
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
  localStorage.setItem('finalizadas', JSON.stringify(listaDeTarefasFinalizadas));
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

function validaPrimeiroElemento() {
  let resposta;
  const selecionado = document.getElementsByClassName('selected');
  if (selecionado[0].innerText === listaTarefas.firstElementChild.innerText) {
    resposta = true;
  } else {
    resposta = false;
  }
  return resposta;
}
function validaUltimoElemento() {
  let resposta;
  const selecionado = document.getElementsByClassName('selected');
  if (selecionado[0].innerText === listaTarefas.lastElementChild.innerText) {
    resposta = true;
  } else {
    resposta = false;
  }
  return resposta;
}

function moveClasseDeSelecaoCima() {
  const tarefas = document.getElementsByClassName('tarefa');
  for (let i = 0; i < tarefas.length; i += 1) {
    if (tarefas[i].classList.contains('selected')) {
      tarefas[i].previousElementSibling.classList.add('selected');
      tarefas[i].classList.remove('selected');
    }
  }
}
function moveClasseDeSelecaoBaixo() {
  const tarefas = document.getElementsByClassName('tarefa');
  for (let i = 0; i < tarefas.length; i += 1) {
    if (tarefas[i].classList.contains('selected')) {
      tarefas[i].nextElementSibling.classList.add('selected');
      tarefas[i].classList.remove('selected');
      break;
    }
  }
}

function moveClasseDeConclusaoCima(elemento) {
  if (
    elemento.previousElementSibling.classList.contains('completed')
    && elemento.classList.contains('completed')
  ) {
    elemento.classList.add('completed');
    elemento.previousElementSibling.classList.add('completed');
  } else if (elemento.previousElementSibling.classList.contains('completed')) {
    elemento.previousElementSibling.classList.remove('completed');
    elemento.classList.add('completed');
  } else if (elemento.classList.contains('completed')) {
    elemento.classList.remove('completed');
    elemento.previousElementSibling.classList.add('completed');
  }
}
function moveClasseDeConclusaoBaixo(elemento) {
  if (
    elemento.nextElementSibling.classList.contains('completed')
    && elemento.classList.contains('completed')
  ) {
    elemento.classList.add('completed');
    elemento.nextElementSibling.classList.add('completed');
  } else if (elemento.nextElementSibling.classList.contains('completed')) {
    elemento.nextElementSibling.classList.remove('completed');
    elemento.classList.add('completed');
  } else if (elemento.classList.contains('completed')) {
    elemento.classList.remove('completed');
    elemento.nextElementSibling.classList.add('completed');
  }
}

function moverCima() {
  const selecionado = document.getElementsByClassName('selected');
  if (selecionado.length === 0) {
    console.log('Nenhuma seleção feita alterações indiponíveis');
  } else {
    const verificaElemento = validaPrimeiroElemento();
    let auxMoveTarefa;
    if (verificaElemento === false) {
      moveClasseDeConclusaoCima(selecionado[0]);
      auxMoveTarefa = selecionado[0].previousElementSibling.innerHTML;
      selecionado[0].previousElementSibling.innerHTML = selecionado[0].innerHTML;
      selecionado[0].innerHTML = auxMoveTarefa;
      moveClasseDeSelecaoCima();
    }
  }
}
function moverBaixo() {
  const selecionado = document.getElementsByClassName('selected');
  if (selecionado.length === 0) {
    console.log('Nenhuma seleção feita alterações indiponíveis');
  } else {
    const verificaElemento = validaUltimoElemento();
    let auxMoveTarefa;
    if (verificaElemento === false) {
      moveClasseDeConclusaoBaixo(selecionado[0]);
      auxMoveTarefa = selecionado[0].nextElementSibling.innerHTML;
      selecionado[0].nextElementSibling.innerHTML = selecionado[0].innerHTML;
      selecionado[0].innerHTML = auxMoveTarefa;
      moveClasseDeSelecaoBaixo();
    }
  }
}

function removeSelecionado() {
  const selecionado = document.getElementsByClassName('selected');
  for (let i = 0; i < listaDeTarefas.length; i += 1) {
    if (listaDeTarefas[i] === selecionado[0].innerText) {
      listaDeTarefas.splice(i, 1);
      selecionado[0].remove();
    }
  }
}

function validaStorage() {
  if (localStorage.getItem('tarefas') === null) {
    localStorage.setItem('tarefas', JSON.stringify([]));
  }
  if (localStorage.getItem('finalizadas') === null) {
    localStorage.setItem('finalizadas', JSON.stringify([]));
  }
}

function addClasseRecarregamento(elemento) {
  elemento.classList.add('completed');
}

function validadorRecarregamento(texto1, texto2, tarefa) {
  if (texto1 === texto2) {
    addClasseRecarregamento(tarefa);
  }
}

function recarregaTarefas() {
  validaStorage();
  listaDeTarefas = JSON.parse(localStorage.getItem('tarefas'));
  listaDeTarefasFinalizadas = JSON.parse(localStorage.getItem('finalizadas'));
  for (let i = 0; i < listaDeTarefas.length; i += 1) {
    const tarefa = criaTarefa(listaDeTarefas[i]);
    for (let k = 0; k < listaDeTarefasFinalizadas.length; k += 1) {
      validadorRecarregamento(listaDeTarefas[i], listaDeTarefasFinalizadas[k], tarefa);
    }
  }
}

botaoCriaTarefa.addEventListener('click', addTarefa);
botaoApagaTudo.addEventListener('click', apagaTudo);
botaoapagaFinalizados.addEventListener('click', removeFinalizados);
botaoSalvaTarefas.addEventListener('click', salvarTarefas);
botaoMoveCima.addEventListener('click', moverCima);
botaoMoveBaixo.addEventListener('click', moverBaixo);
botaoRemoveSelecionado.addEventListener('click', removeSelecionado);

window.onload = recarregaTarefas;
