// Array para armazenar tarefas
let tasks = carregaInfo();
console.log(tasks);

// Acessando inputs e botões
let criaTarefa = document.getElementById("criar-tarefa");
let botaoCriaTarefa = document.getElementById("criar-tarefa");
let tituloTarefa = document.getElementById("task-title");
let descricaoTarefa = document.getElementById("task-description");
let tipoTarefa = document.getElementById("task-type");
let searchInputTxt = document.getElementById("search-input-text");
let searchInputBtn = document.getElementById("search-input-btn");
let labelTaskTitle = document.getElementById("label-task-title");

// Criando mensagem de erro
let errorMsg = document.createElement("span");
errorMsg.textContent = "Título é obrigatório";

// Variável para verificar se a task está sendo editada
let editandoId = 0;

// Acessando o DOM para modificar HTML
let containerExibeTarefas = document.getElementById("listagem");

// Criando um elemento HTML que será o card de tarefas
function criaCardTarefa(task) {
  // Criando os elementos HTML
  let div = document.createElement("div");
  let titleDiv = document.createElement("div");
  let titleAndCheckDiv = document.createElement("div");
  let statusInput = document.createElement("input");
  let taskTitle = document.createElement("h2");
  let taskType = document.createElement("h2");
  let descriptionDiv = document.createElement("div");
  let descriptionParagraph = document.createElement("p");
  let detailsDiv = document.createElement("div");
  let statusDiv = document.createElement("div");
  let statusParagraph = document.createElement("p");
  let actionsDiv = document.createElement("div");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  // Personalizando os Elementos HTML com suas devidas classes e tipos
  div.classList.add("task-card");
  titleDiv.classList.add("task-title");
  titleAndCheckDiv.classList.add("title-and-check");
  statusInput.type = "checkbox";
  statusInput.classList.add("status-check");
  descriptionDiv.classList.add("task-description");
  detailsDiv.classList.add("task-details");
  statusDiv.classList.add("task-status");
  actionsDiv.classList.add("task-actions");
  editButton.type = "button";
  deleteButton.type = "button";
  editButton.classList.add("editBtn");
  deleteButton.classList.add("delBtn");

  // Colocando texto nos elementos
  div.dataset.id = task.id;
  taskTitle.textContent = task.titulo;
  taskType.textContent = task.tipo;
  descriptionParagraph.textContent = task.descricao;
  editButton.textContent = "Edite sua tarefa";
  deleteButton.textContent = "Exclua sua tarefa";
  if (task.done) {
    statusInput.checked = true;
    div.classList.remove("pending");
    div.classList.add("done");
    statusParagraph.textContent = "Concluída";
  } else {
    statusInput.checked = false;
    div.classList.remove("done");
    div.classList.add("pending");
    statusParagraph.textContent = "Pendente";
  }

  //   Adicionando evento ao checkbox
  statusInput.addEventListener("click", (e) => {
    let id = Number(div.dataset.id);
    console.log(id);
    for (i = 0; i < tasks.length; i++) {
      console.log(div.dataset.id);
      if (tasks[i].id == div.dataset.id) {
        if (statusInput.checked) {
          tasks[i].done = true;
          div.classList.remove("pending");
          div.classList.add("done");
          statusParagraph.textContent = "Concluída";
          console.log(task.done);
          salvaInfo(tasks);
        } else {
          tasks[i].done = false;
          div.classList.remove("done");
          div.classList.add("pending");
          statusParagraph.textContent = "Pendente";
          console.log(task.done);
          salvaInfo(tasks);
        }
      }
    }
  });

  //   Adicionando evento ao botão de edição
  editButton.addEventListener("click", (e) => {
    let elementId = Number(div.dataset.id);
    for (i = 0; i < tasks.length; i++) {
      if (tasks[i].id == elementId) {
        console.log(tasks[i]);
        window.scrollTo({
          top: 100,
          behavior: "smooth",
        });
        botaoCriaTarefa.textContent = "Salvar";
        editandoId = tasks[i].id;
        console.log(editandoId);
        tituloTarefa.value = tasks[i].titulo;
        descricaoTarefa.value = tasks[i].descricao;
        tipoTarefa.value = tasks[i].tipo;
      }
    }
  });

  //   Adicionando evento ao botão de deletar
  deleteButton.addEventListener("click", (e) => {
    let id = Number(div.dataset.id);
    console.log(id);
    console.log(tasks);
    tasks = tasks.filter((activeTask) => activeTask.id != id);
    console.log(tasks);
    salvaInfo(tasks);
    renderizaTela();
  });

  // Conectando os elementos HTML para exibição correta
  // Montando a div principal
  div.appendChild(titleDiv);
  div.appendChild(descriptionDiv);
  div.appendChild(detailsDiv);

  // Montando a div de Titulo, Tipo e Status Check
  titleDiv.appendChild(titleAndCheckDiv);
  titleAndCheckDiv.appendChild(statusInput);
  titleAndCheckDiv.appendChild(taskTitle);
  titleDiv.appendChild(taskType);

  // Montando a div de descrição
  descriptionDiv.appendChild(descriptionParagraph);

  // Montando a div de detalhes da tarefa
  detailsDiv.appendChild(statusDiv);
  statusDiv.appendChild(statusParagraph);
  detailsDiv.appendChild(actionsDiv);
  actionsDiv.appendChild(editButton);
  actionsDiv.appendChild(deleteButton);

  console.log(div);
  salvaInfo(tasks);
  // Retornando o elemento completo criado
  return div;
}

tituloTarefa.addEventListener("input", (e) => {
  labelTaskTitle.classList.remove("error");
  errorMsg.remove();
});

// Função para pegar e salvar os valores dos inputs
function pegaInput(tituloTarefa, descricaoTarefa, tipoTarefa) {
  let titulo = tituloTarefa.value;
  let descricao = descricaoTarefa.value;
  let tipo = tipoTarefa.value;
  return { titulo, descricao, tipo };
}

// Uma função para limpar os inputs
function limpaInput(tituloTarefa, descricaoTarefa, tipoTarefa) {
  tituloTarefa.value = "";
  descricaoTarefa.value = "";
  tipoTarefa.value = "";
}

// Lógica para pesquisar tarefas
function exibeTelaFiltrada(filteredTasks) {
  containerExibeTarefas.replaceChildren();

  filteredTasks.forEach((task) => {
    let div = criaCardTarefa(task);
    containerExibeTarefas.appendChild(div);
  });
}

searchInputBtn.addEventListener("click", (e) => {
  let txtSearchInput = searchInputTxt.value;
  let statusFilter = document.querySelector(
    'input[name="task-status-filter"]:checked',
  ).value;
  console.log(txtSearchInput);
  console.log(statusFilter);

  if (statusFilter == "done") {
    let filteredTasks = tasks.filter(
      (filteredTask) =>
        filteredTask.done == true &&
        filteredTask.titulo
          .toLowerCase()
          .includes(txtSearchInput.toLowerCase()),
    );
    exibeTelaFiltrada(filteredTasks);
    console.log(filteredTasks);
  } else if (statusFilter == "pending") {
    let filteredTasks = tasks.filter(
      (filteredTask) =>
        filteredTask.done == false &&
        filteredTask.titulo
          .toLowerCase()
          .includes(txtSearchInput.toLowerCase()),
    );
    exibeTelaFiltrada(filteredTasks);
    console.log(filteredTasks);
  } else {
    if (txtSearchInput != "") {
      let filteredTasks = tasks.filter((filteredTask) =>
        filteredTask.titulo
          .toLowerCase()
          .includes(txtSearchInput.toLowerCase()),
      );
      exibeTelaFiltrada(filteredTasks);
    } else {
      renderizaTela();
    }
  }
});

// Função para renderizar a tela
function renderizaTela() {
  containerExibeTarefas.replaceChildren();

  tasks.forEach((task) => {
    let div = criaCardTarefa(task);
    containerExibeTarefas.appendChild(div);
  });
}

// Função para salvar no localStorage
function salvaInfo(tasks) {
  let tasksJSON = JSON.stringify(tasks);
  localStorage.setItem("taskSaved", tasksJSON);
}

// Função para carregar do localStorage
function carregaInfo() {
  let tasksSaved = localStorage.getItem("taskSaved");
  if (tasksSaved != null) {
    let tasks = JSON.parse(tasksSaved);
    console.log(tasks);
    return tasks;
  } else return [];
}

// Renderiza caso reload
renderizaTela();
// Chamo a função para criar tarefa através do clique e atualizo a tela
criaTarefa.addEventListener("click", (e) => {
  e.preventDefault();

  let { titulo, descricao, tipo } = pegaInput(
    tituloTarefa,
    descricaoTarefa,
    tipoTarefa,
  );

  if (titulo.trim() === "") {
    labelTaskTitle.classList.add("error");
    labelTaskTitle.appendChild(errorMsg);
    return;
  }

  if (editandoId == 0) {
    let task = {
      id: Date.now(),
      titulo,
      descricao,
      tipo,
      done: false,
    };
    tasks.push(task);
  } else {
    for (i = 0; i < tasks.length; i++) {
      if (tasks[i].id == editandoId) {
        tasks[i].titulo = tituloTarefa.value;
        tasks[i].descricao = descricaoTarefa.value;
        tasks[i].tipo = tipoTarefa.value;
        editandoId = 0;
        criaTarefa.textContent = "Criar tarefa!";
      }
    }
  }
  listagem.scrollIntoView({ behavior: "smooth" });
  renderizaTela();
  limpaInput(tituloTarefa, descricaoTarefa, tipoTarefa);
});
