import { controller } from '../controller/controller.js';
const { saveEvent, editEvent, deleteEvent, checkEvent } = controller();
const todoContainer = document.querySelector('.todoContainer');
export function TodoListView() {
    return {
        addEvent: function (result) {
            const para = prepareTodoPara();
            const node = prepareTodoItem(result.name);
            if (result.id) {
                // const dBtn = prepareDeleteBtn(result.id);
                // const eBtn = prepareEditBtn(result.id);
                let cBox = prepareCheckBox(result.id);
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
        prepareSaveBtn: function (saveId, editText) {
            const saveBtn = createElement('button', 'saveBn');
            saveBtn.innerText = 'SAVE';
            addAttributeEventListener(saveBtn, saveId, () => {
                saveEvent(saveBtn, editText, saveId);
            });
            return saveBtn;
        },
    };
}
function createElement(element, elementClassName) {
    let task = document.createElement(element);
    task.className = elementClassName;
    return task;
}
function addAttributeEventListener(element, id, onClickFunction) {
    element.setAttribute('id', id);
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
    addAttributeEventListener(checkBox, checkId, () => {
        checkEvent(checkBox, checkId);
    });
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
    addAttributeEventListener(editBtn, editId, () => {
        editEvent(editBtn, editId);
    });
    return editBtn;
}
function prepareDeleteBtn(deleteId) {
    const deleteBtn = createElement('button', 'deleteBn');
    deleteBtn.innerText = 'DELETE\n';
    addAttributeEventListener(deleteBtn, deleteId, () => {
        deleteEvent(deleteBtn, deleteId);
    });
    return deleteBtn;
}
export function append(parent, child) {
    parent.appendChild(child);
}
