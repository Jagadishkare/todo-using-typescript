import { controller } from '../controller/controller.js';
import { IObjectType } from '../utils/types.js';
const { saveEvent, editEvent, deleteEvent, checkEvent } = controller()
const todoContainer = document.querySelector('.todoContainer') as HTMLDivElement

export function TodoListView() {
  return {
    addEvent: function (result: IObjectType) {
      const para = prepareTodoPara();
      const node = prepareTodoItem(result.name);
        const checkBox = prepareCheckBox(result.id) as HTMLInputElement;        
        append(para, node);
        append(para, checkBox);
        if (result.isCompleted) {
          checkBox.checked = true;
          node.style.textDecoration = 'line-through';
        }
        append(para, prepareEditBtn(result.id));
        append(para, prepareDeleteBtn(result.id));
        append(todoContainer, para);
    },

    prepareSaveBtn: function ( editText: string, saveId?: number) {
      const saveBtn = createElement('button', 'saveBn');
      saveBtn.innerText = 'SAVE';
      addAttributeEventListener(saveBtn, () => {
        saveEvent(saveBtn as HTMLButtonElement, editText, saveId);
      }, saveId);
      return saveBtn;
    },
  };
}

function createElement(element: string, elementClassName: string) {
  let task = document.createElement(element);
  task.className = elementClassName;
  return task;
}

function addAttributeEventListener(element: HTMLElement, onClickFunction: Function, id?: number) {
  element.setAttribute('id', `${id}`);
  element.addEventListener('click', () => onClickFunction());
  return element;
}

function prepareTodoPara() {
  const taskPara = createElement('p', 'task-para');
  return taskPara;
}

function prepareCheckBox(checkId?: number) {
  const checkBox = createElement('input', 'check') as HTMLInputElement;
  checkBox.type = 'checkbox';
    addAttributeEventListener(checkBox, () => {
    checkEvent(checkBox, checkId);
  }, checkId);
  return checkBox;
}

function prepareTodoItem(taskName: string) {
  const taskNode = createElement('span', 'task-span');
  taskNode.innerText = taskName;
  return taskNode;
}

function prepareEditBtn(editId?: number) {
  const editBtn = createElement('button', 'editBn');
  editBtn.innerText = 'EDIT';
  addAttributeEventListener(editBtn, () => {
    editEvent(editBtn as HTMLButtonElement, editId);
  }, editId);
  return editBtn;
}

function prepareDeleteBtn(deleteId?: number) {
  const deleteBtn = createElement('button', 'deleteBn');
  deleteBtn.innerText = 'DELETE\n';
  addAttributeEventListener(deleteBtn, () => {
    deleteEvent(deleteBtn as HTMLButtonElement, deleteId);
  }, deleteId);
  return deleteBtn;
}


export function append(parent: HTMLElement, child: HTMLElement) {
  parent.appendChild(child);
}

