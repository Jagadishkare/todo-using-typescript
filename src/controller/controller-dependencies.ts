import { todoContainer} from './controller.js';
import { IObjectType } from '../utils/types.js';
import { LocalStore } from '../model/local-storage.js';
import { CloudStorage } from '../model/cloud-storage.js';
import { DataStructure } from '../utils/data-structure.js';
import { TodoListView } from '../view/view.js';

function checkEventLocal(checkText : HTMLSpanElement, display : string , status : boolean, Text : string, todolist : Array<IObjectType> ) {
    checkText.style.textDecoration = display;
    for (let i = 0; i < todolist.length; i++) {
      if (todolist[i].name === Text) {
        LocalStore().editTodoItem(i, new DataStructure(todolist[i].name, status), todolist);
      }
    }
  }
  
async function selectMethod(method : Promise<IObjectType> | Function) {
    const array : Object = await method;
    todoContainer.innerHTML = '';
    (array as Array<IObjectType>).map((obj) => {
        TodoListView().addEvent(obj);
    });
  }
  
async function checkEventCloud(checkText : HTMLSpanElement, display : string, id : number , Text : string, status? : boolean) {
    checkText.style.textDecoration = display;
    await CloudStorage().editTodo( Text, status, id);
  }

export {checkEventCloud , checkEventLocal , selectMethod}