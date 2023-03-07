import { controller } from '../controller/controller.js';
import { objectType } from '../utils/types.js';
const { saveEvent, editEvent, deleteEvent, checkEvent } = controller()
const todoContainer = document.querySelector('.todoContainer') as HTMLDivElement


export function TodoListView() {
  return {
    addEvent: function (result: objectType) {
      const para = prepareTodoPara();
      const node = prepareTodoItem(result.name);
      if (result.id) {
        // const dBtn = prepareDeleteBtn(result.id);
        // const eBtn = prepareEditBtn(result.id);
        let cBox = prepareCheckBox(result.id) as HTMLInputElement;
        append(para, node);
        append(para, cBox);
        if (result.isCompleted === true) {
          cBox.checked = true;
          node.style.textDecoration = 'line-through';
        }
        append(para, prepareEditBtn(result.id));
        append(para, prepareDeleteBtn(result.id));
        append(todoContainer, para);
      }
    },

    prepareSaveBtn: function (saveId: string, editText: string) {
      const saveBtn = createElement('button', 'saveBn');
      saveBtn.innerText = 'SAVE';
      addAttributeEventListener(saveBtn, saveId, () => {
        saveEvent(saveBtn as HTMLButtonElement, editText, saveId);
      });
      return saveBtn;
    },
  };
}

function createElement(element: string, elementClassName: string) {
  let task = document.createElement(element);
  task.className = elementClassName;
  return task;
}

function addAttributeEventListener(element: HTMLElement, id: string, onClickFunction: Function) {
  element.setAttribute('id', id);
  element.addEventListener('click', () => onClickFunction());
  return element;
}

function prepareTodoPara() {
  const taskPara = createElement('p', 'task-para');
  return taskPara;
}

function prepareCheckBox(checkId: string) {
  const checkBox = createElement('input', 'check') as HTMLInputElement;
  checkBox.type = 'checkbox';
  addAttributeEventListener(checkBox, checkId, () => {
    checkEvent(checkBox, checkId);
  });
  return checkBox;
}

function prepareTodoItem(taskName: string) {
  const taskNode = createElement('span', 'task-span');
  taskNode.innerText = taskName;
  return taskNode;
}

function prepareEditBtn(editId: string) {
  const editBtn = createElement('button', 'editBn');
  editBtn.innerText = 'EDIT';
  addAttributeEventListener(editBtn, editId, () => {
    editEvent(editBtn as HTMLButtonElement, editId);
  });
  return editBtn;
}

function prepareDeleteBtn(deleteId: string) {
  const deleteBtn = createElement('button', 'deleteBn');
  deleteBtn.innerText = 'DELETE\n';
  addAttributeEventListener(deleteBtn, deleteId, () => {
    deleteEvent(deleteBtn as HTMLButtonElement, deleteId);
  });
  return deleteBtn;
}


export function append(parent: Element, child: Element) {
  parent.appendChild(child);
}

