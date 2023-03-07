import { TodoListView, append } from '../view/view.js';
import { DataStructure } from '../utils/data-structure.js';
import { CloudStorage, URL } from '../model/cloud-storage.js';
import { LocalStore , setTodo} from '../model/local-storage.js';
import { objectType } from '../utils/types.js';
import { checkEventCloud , checkEventLocal, selectMethod } from './controller-dependencies.js';

const todoInput = document.querySelector('.todoInput') as HTMLInputElement;
const select = document.querySelector('.select') as HTMLSelectElement;
const addBtn = document.querySelector('.addBtn') as HTMLButtonElement;
const todoContainer = document.querySelector('.todoContainer') as HTMLDivElement;
const mainDiv = document.querySelector('.main') as HTMLDivElement;
const deleteAllItem = document.querySelector('.deleteAll') as HTMLButtonElement;

const { addEvent, prepareSaveBtn } = TodoListView();
const { getTodo, createTodo, deleteItem, deleteAll, editTodo } = CloudStorage();
const {get, deleteAlltodoItem, deletetodoItem, editTodoItem} = LocalStore();


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
    deleteEvent: async function (deleteBtn : HTMLElement , delId : string) {
      const dele = deleteBtn.parentElement as HTMLElement;  
      const text = ( dele.firstChild as HTMLElement).innerText;
      if (select.value === 'CLOUD - STORAGE') {
        const deleteResult = await deleteItem(delId);
        deleteResult && (deleteResult.status === 204 && todoContainer.removeChild(dele));
      } else if (select.value === 'LOCAL - STORAGE') {
        const todolist = get();
        for (let i = 0; i < todolist.length; i++) {
          if (todolist[i].name === text) {
            deletetodoItem(i, todolist);
            todoContainer.removeChild(dele);
          }
        }
      }
    },

    editEvent: function (editBtn : HTMLButtonElement, editId : string) {
      const editBn  = editBtn.parentNode as HTMLBodyElement
      const edittext = (editBn.firstChild as HTMLElement).innerText;
      todoInput.value = edittext;
      todoContainer.removeChild(editBn);
      mainDiv.removeChild(addBtn);
      const save = prepareSaveBtn(editId, edittext);
      save.className = 'saveBtn';
      append(mainDiv, save);
    },

    saveEvent: async function (saveBtn : HTMLButtonElement, oldText : string , savId : string) {
      if (todoInput.value === '') {
        alert('ENTER YOUR TASK...');
      } else {
        const text = todoInput.value;
        if (select.value === 'CLOUD - STORAGE') {
          const editResponse = await editTodo(savId, text);
          editResponse && (editResponse.status === 204 && addEvent(new DataStructure(text,false, savId)))  
        } else {
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
    },

    checkEvent: async function (checkBox : HTMLElement  , id : string) {
      const checkText = (checkBox.parentElement as HTMLElement).firstChild;
      const Text = (checkText as HTMLElement).innerText;
      if (select.value === 'CLOUD - STORAGE') {
        (checkBox as HTMLInputElement).checked ? checkEventCloud(checkText as HTMLSpanElement, 'line-through', id, Text, true)
        : checkEventCloud(checkText as HTMLSpanElement, 'none', id, Text);
      } else {
        const todolist = get();
        (checkBox as HTMLInputElement).checked ? checkEventLocal(checkText as HTMLSpanElement, 'line-through', true, Text, todolist)
        : checkEventLocal(checkText as HTMLSpanElement, 'none', false, Text, todolist);
      }
    },

  };
}

async function createEvent() {
  let text = todoInput.value;
  if (!text) {
    alert('ENTER YOUR TASK...');
  } else {
    if (select.value === 'CLOUD - STORAGE') {
      const response = await (await createTodo(text))?.json();
      addEvent(response);
      text = '';
    } else if (select.value === 'LOCAL - STORAGE') {
      const todolist = get();
      todolist.push(new DataStructure(text));
      setTodo(todolist);
      addEvent(new DataStructure(text));
      text = '';
    }
  }
}

function deleteAllTask() {
  if (todoContainer.firstChild) {
    const confirmation = confirm('ALL YOUR TASKS WILL BE DELETED...');
    if (confirmation === true) {
      select.value === 'CLOUD - STORAGE' ? deleteAll() : deleteAlltodoItem()
      todoContainer.innerHTML = '';
    }
  } else {
    alert('NO... ITEMS... TO... DELETE');
  }
}

async function refreshEvent() {
  alert('CLOUD-STORAGE IS YOUR DEFAULT STORAGE');
  const arrTodo : unknown =  await getTodo(URL);
   (arrTodo as Array<objectType>).map((result : objectType) => addEvent(result));
}

select.addEventListener('change', async () => {
   select.value === 'CLOUD - STORAGE' ? selectMethod(getTodo(URL)) : selectMethod(get());
  });

addBtn.addEventListener('click', createEvent);
deleteAllItem.addEventListener('click',  deleteAllTask);
refreshEvent();

export { todoContainer};
