{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];
    render();
  };

  const removeTask = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1),
    ];
    render();
  };

  const toggleTaskDone = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      { ...tasks[index], done: !tasks[index].done },
      ...tasks.slice(index + 1),
    ];
    render();
  };

  const setAllTasksDone = () => {
    tasks = tasks.map(task => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let taskListHTMLContent = "";

    for (const task of tasks) {
      taskListHTMLContent += `
           <li
            class="list__item ${hideDoneTasks && task.done ? "list__item--hide" : ""}"
           >
             <button class="list__button list__button--done js-done">
               ${task.done ? "✓" : ""}
             </button>
             <p class="${task.done ? " list__item--done" : ""}">
               ${task.content}
             </p>
             <button class="list__button list__button--remove js-remove">&#128465</button>
           </li>
            `;
    };

    document.querySelector(".js-tasks").innerHTML = taskListHTMLContent;
  };

  const renderButtons = () => {
    let buttonsEvent = document.querySelector(".js-buttonsEvent");
    let buttonsEventHTMLContent = "";

    if (!tasks.length) {
      buttonsEvent.innerHTML = "";
      return;
    }

    buttonsEventHTMLContent += `
    <button class="section__button js-hideDoneTasks">${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
    <button 
     ${tasks.every(({ done }) => done) ? "disabled" : ""}
     class="section__button js-setAllTasksDone"
    >
     Ukończ wszystkie
    </button>
    `;

    buttonsEvent.innerHTML = buttonsEventHTMLContent;
  };

  const bindButtonsEvents = () => {
    setAllTasksDoneButton = document.querySelector(".js-setAllTasksDone");

    if (setAllTasksDoneButton) {
      setAllTasksDoneButton.addEventListener("click", () => {
        setAllTasksDone();
      });
    }

    hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");

    if (hideDoneTasksButton) {
      hideDoneTasksButton.addEventListener("click", () => {
        toggleHideDoneTasks();
      });
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindDoneEvents();
    bindRemoveEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}