const botaoCriaTarefa = document.getElementById('criar-tarefa');
let listaDeTarefas = [];
const botaoApagaTudo = document.getElementById('apaga-tudo');
const botaoapagaFinalizados = document.getElementById('remover-finalizados');
const botaoSalvaTarefas = document.getElementById('salvar-tarefas');
const botaoMoveCima = document.getElementById('mover-cima');
// const botaoMoveBaixo = document.getElementById('mover-baixo');
const listaTarefas = document.getElementById('lista-tarefas');

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

// function moverCima() {
//   const tarefas = document.getElementsByClassName('tarefa');
//   let auxMoveTarefa = '';
//   for (let i = 0; i < tarefas.length; i += 1) {
//     if (tarefas[i].classList.contains('selected')) {
//       const verificaElemento = verificaPrimeiroUltimo(tarefas[i]);
//       if (verificaElemento === true) {
//         break;
//       } else {
//         auxMoveTarefa = tarefas[i].previousElementSibling.innerHTML;
//         tarefas[i].previousElementSibling.innerHTML = tarefas[i].innerHTML;
//         tarefas[i].innerHTML = auxMoveTarefa;
//         tarefas[i].previousElementSibling.classList.add('selected');
//         tarefas[i].classList.remove('selected');
//       }
//     }
//   }
// }

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

function validaUltimoElemento(elemento) {
  let resposta;
  if (elemento.innerText === listaTarefas.lastElementChild.innerText) {
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

function moveClasseDeConclusao(elemento) {
  if (elemento.previousElementSibling.classList.contains('completed') && elemento.classList.contains('completed')) {
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

function moverCima() {
  const selecionado = document.getElementsByClassName('selected');
  const verificaElemento = validaPrimeiroElemento();
  let auxMoveTarefa;
  if (verificaElemento === false) {
    moveClasseDeConclusao(selecionado[0]);
    auxMoveTarefa = selecionado[0].previousElementSibling.innerHTML;
    selecionado[0].previousElementSibling.innerHTML = selecionado[0].innerHTML;
    selecionado[0].innerHTML = auxMoveTarefa;
    moveClasseDeSelecaoCima();
  }
}

// function moverBaixo() {
//   const tarefas = document.getElementsByClassName('tarefa');
//   let auxMoveTarefa = '';
//   for (let i = 0; i < tarefas.length; i += 1) {
//     if (tarefas[i].classList.contains('selected')) {
//       const verificaElemento = verificaPrimeiroUltimo(tarefas[i]);
//       if (verificaElemento === true) {
//         break;
//       } else {
//         auxMoveTarefa = tarefas[i].nextElementSibling.innerHTML;
//         tarefas[i].nextElementSibling.innerHTML = tarefas[i].innerHTML;
//         tarefas[i].innerHTML = auxMoveTarefa;
//         tarefas[i].nextElementSibling.classList.add('selected');
//         tarefas[i].classList.remove('selected');
//       }
//     }
//   }
// }

botaoCriaTarefa.addEventListener('click', addTarefa);

botaoApagaTudo.addEventListener('click', apagaTudo);

botaoapagaFinalizados.addEventListener('click', removeFinalizados);

botaoSalvaTarefas.addEventListener('click', salvarTarefas);

botaoMoveCima.addEventListener('click', moverCima);

// botaoMoveBaixo.addEventListener('click', moverBaixo);

window.onload = function () {
  recarregaTarefas();
};
