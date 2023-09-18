const todo = {
  action(e) {
    const target = e.target;
    if (target.classList.contains('todoList__action')) {
      const action = target.dataset.todoAction;
      const elemItem = target.closest('.todoList__item');
      if (action === 'deleted') {
        elemItem.remove();
      } else {
        elemItem.dataset.todoState = action;
        const lexicon = {
          active: 'восстановлено',
          completed: 'завершено',
          deleted: 'удалено'
        };
      if (action === 'completed'){
        const ul = elemItem.closest('ul');
        ul.appendChild(elemItem);
      }
      }
      this.save();
    } else if (target.classList.contains('todoList__buttonAdd')) {
      this.add();
      this.save();
    } else if (target.classList.contains('button_selectEven')){
      this.selectEven();
    } else if (target.classList.contains('button_selectOdd')){
      this.selectOdd();
    } else if (target.classList.contains('button_delLast')){
      this.delLast();
    } else if (target.classList.contains('button_delFirst')){
      this.delFirst();
    }
  },

  selectEven(){
    let lis = document.querySelectorAll(".todoList__item");
    for (let i = 0; i < lis.length; i++) {
      if (i % 2 != 0) {
        lis[i].style.color = "red";
      }
    }
  },

  selectOdd(){
    let lis = document.querySelectorAll(".todoList__item");
    for (let i = 0; i < lis.length; i++) {
      if (i % 2 == 0) {
        lis[i].style.color = "#1d98f0";
      }
    }
  },

  delLast(){
    const todoList = document.getElementsByClassName("todoList__list")[0];
    if(todoList && todoList.childNodes && todoList.childNodes.length > 0){
      todoList.removeChild(todoList.lastChild);
  }
},
delFirst(){
  const todoList = document.getElementsByClassName("todoList__list")[0];
    if(todoList && todoList.childNodes && todoList.childNodes.length > 0){
      todoList.removeChild(todoList.firstChild);
    } 
  },

  add() {
    const elemText = document.querySelector('.todoList__text');
    if (elemText.disabled || !elemText.value.length) {
      return;
    }
    document.querySelector('.todoList__list').insertAdjacentHTML('afterbegin', this.createTask(elemText.value));
    elemText.value = '';
  },

  createTask(text) {
    const date = JSON.stringify({ add: new Date().toLocaleString().slice(0, -3) });
    return `<li class="todoList__item" data-todo-state="active">
      <span class="todoList__task">
        ${text}
      </span>
      <span class="todoList__action todoList__action_restore" data-todo-action="active"></span>
      <span class="todoList__action todoList__action_complete" data-todo-action="completed"></span>
      <span class="todoList__action todoList__action_delete" data-todo-action="deleted"></span></li>`;
  },

  init() {
    const fromStorage = localStorage.getItem('todoList');
    if (fromStorage) {
      document.querySelector('.todoList__list').innerHTML = fromStorage;
    }
    document.addEventListener('click', this.action.bind(this));
  },

  update() {
    document.querySelector('.todoList__list').dataset.todoOption = option;
    document.querySelector('.todoList__text').disabled = option !== 'active';
  },
  
  save() {
    localStorage.setItem('todoList', document.querySelector('.todoList__list').innerHTML);
  }
};

todo.init();
