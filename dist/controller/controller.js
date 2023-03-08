var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TodoListView, append } from '../view/view.js';
import { DataStructure } from '../utils/data-structure.js';
import { CloudStorage, URL } from '../model/cloud-storage.js';
import { LocalStore, setTodo } from '../model/local-storage.js';
import { checkEventCloud, checkEventLocal, selectMethod } from './controller-dependencies.js';
let todoInput = document.querySelector('.todoInput');
const select = document.querySelector('.select');
const addBtn = document.querySelector('.addBtn');
const todoContainer = document.querySelector('.todoContainer');
const mainDiv = document.querySelector('.main');
const deleteAllItem = document.querySelector('.deleteAll');
const { addEvent, prepareSaveBtn } = TodoListView();
const { getTodo, createTodo, deleteItem, deleteAll, editTodo } = CloudStorage();
const { get, deleteAlltodoItem, deletetodoItem, editTodoItem } = LocalStore();
todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        if (mainDiv.innerText === 'ADD') {
            event.preventDefault();
            createEvent();
        }
    }
});
export function controller() {
    return {
        deleteEvent: function (deleteBtn, delId) {
            return __awaiter(this, void 0, void 0, function* () {
                const dele = deleteBtn.parentElement;
                const text = dele.firstChild.innerText;
                if (select.value === 'CLOUD - STORAGE') {
                    const deleteResult = yield deleteItem(delId);
                    deleteResult && (deleteResult.status === 204 && todoContainer.removeChild(dele));
                }
                else if (select.value === 'LOCAL - STORAGE') {
                    const todolist = get();
                    for (let i = 0; i < todolist.length; i++) {
                        if (todolist[i].name === text) {
                            deletetodoItem(i, todolist);
                            todoContainer.removeChild(dele);
                        }
                    }
                }
            });
        },
        editEvent: function (editBtn, editId) {
            const editBn = editBtn.parentNode;
            const edittext = editBn.firstChild.innerText;
            todoInput.value = edittext;
            todoContainer.removeChild(editBn);
            mainDiv.removeChild(addBtn);
            const save = prepareSaveBtn(edittext, editId);
            save.className = 'saveBtn';
            append(mainDiv, save);
        },
        saveEvent: function (saveBtn, oldText, savId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (todoInput.value === '') {
                    alert('ENTER YOUR TASK...');
                }
                else {
                    const text = todoInput.value;
                    if (select.value === 'CLOUD - STORAGE') {
                        const editResponse = yield editTodo(text, false, savId);
                        editResponse && (editResponse.status === 204 && addEvent(new DataStructure(text, false, savId)));
                    }
                    else {
                        const todolist = get();
                        for (let i = 0; i < todolist.length; i++) {
                            if (todolist[i].name === oldText) {
                                editTodoItem(i, new DataStructure(text), todolist);
                                addEvent(new DataStructure(text));
                            }
                        }
                    }
                    mainDiv.removeChild(saveBtn);
                    mainDiv.appendChild(addBtn);
                    todoInput.value = '';
                }
            });
        },
        checkEvent: function (checkBox, id) {
            return __awaiter(this, void 0, void 0, function* () {
                const checkText = checkBox.parentElement.firstChild;
                const Text = checkText.innerText;
                if (select.value === 'CLOUD - STORAGE') {
                    checkBox.checked ? id && checkEventCloud(checkText, 'line-through', id, Text, true)
                        : id && checkEventCloud(checkText, 'none', id, Text);
                }
                else {
                    const todolist = get();
                    checkBox.checked ? checkEventLocal(checkText, 'line-through', true, Text, todolist)
                        : checkEventLocal(checkText, 'none', false, Text, todolist);
                }
            });
        },
    };
}
function createEvent() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!todoInput.value) {
            alert('ENTER YOUR TASK...');
        }
        else {
            if (select.value === 'CLOUD - STORAGE') {
                const response = yield ((_a = (yield createTodo(todoInput.value))) === null || _a === void 0 ? void 0 : _a.json());
                addEvent(response);
                todoInput.value = '';
            }
            else if (select.value === 'LOCAL - STORAGE') {
                const todolist = get();
                todolist.push(new DataStructure(todoInput.value));
                setTodo(todolist);
                addEvent(new DataStructure(todoInput.value));
                todoInput.value = '';
            }
        }
    });
}
function deleteAllTask() {
    if (todoContainer.firstChild) {
        const confirmation = confirm('ALL YOUR TASKS WILL BE DELETED...');
        if (confirmation === true) {
            select.value === 'CLOUD - STORAGE' ? deleteAll() : deleteAlltodoItem();
            todoContainer.innerHTML = '';
        }
    }
    else {
        alert('NO... ITEMS... TO... DELETE');
    }
}
function refreshEvent() {
    return __awaiter(this, void 0, void 0, function* () {
        alert('CLOUD-STORAGE IS YOUR DEFAULT STORAGE');
        const arrTodo = yield getTodo(URL);
        arrTodo.map((result) => addEvent(result));
    });
}
select.addEventListener('change', () => __awaiter(void 0, void 0, void 0, function* () {
    select.value === 'CLOUD - STORAGE' ? selectMethod(getTodo(URL)) : selectMethod(get());
}));
addBtn.addEventListener('click', createEvent);
deleteAllItem.addEventListener('click', deleteAllTask);
refreshEvent();
export { todoContainer };
