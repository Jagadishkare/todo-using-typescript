import { controller } from '../controller/controller.js';
const { saveEvent, editEvent, deleteEvent, checkEvent } = controller();
const todoContainer = document.querySelector('.todoContainer');
const select = document.querySelector('.select');
export function TodoListView() {
    return {
        addEvent: function (result) {
            const para = prepareTodoPara();
            let node = prepareTodoItem(result.name);
            const checkBox = prepareCheckBox(result.id);
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
        prepareSaveBtn: function (editText, saveId) {
            const saveBtn = createElement('button', 'saveBn');
            saveBtn.innerText = 'SAVE';
            addAttributeEventListener(saveBtn, () => {
                saveEvent(saveBtn, editText, saveId);
            }, saveId);
            return saveBtn;
        },
    };
}
function createElement(element, elementClassName) {
    let task = document.createElement(element);
    task.className = elementClassName;
    return task;
}
function addAttributeEventListener(element, onClickFunction, id) {
    element.setAttribute('id', `${id}`);
    element.addEventListener('click', () => onClickFunction());
    return element;
}
function prepareTodoPara() {
    const taskPara = createElement('p', 'task-para');
    return taskPara;
}
function prepareCheckBox(checkId) {
    const checkBox = createElement('input', 'check');
    checkBox.type = 'checkbox';
    addAttributeEventListener(checkBox, () => {
        checkEvent(checkBox, checkId);
    }, checkId);
    return checkBox;
}
function prepareTodoItem(taskName) {
    const taskNode = createElement('span', 'task-span');
    taskNode.innerText = taskName;
    return taskNode;
}
function prepareEditBtn(editId) {
    const editBtn = createElement('button', 'editBn');
    editBtn.innerText = 'EDIT';
    addAttributeEventListener(editBtn, () => {
        editEvent(editBtn, editId);
    }, editId);
    return editBtn;
}
function prepareDeleteBtn(deleteId) {
    const deleteBtn = createElement('button', 'deleteBn');
    deleteBtn.innerText = 'DELETE\n';
    addAttributeEventListener(deleteBtn, () => {
        deleteEvent(deleteBtn, deleteId);
    }, deleteId);
    return deleteBtn;
}
export function append(parent, child) {
    parent.appendChild(child);
}
