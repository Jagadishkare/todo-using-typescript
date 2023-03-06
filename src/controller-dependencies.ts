import { todoContainer} from "./controller.js";
import { objectType } from "./types.js";
import { LocalStore } from "./local-storage.js";
import { CloudStorage } from "./cloud-storage.js";
import { DataStructure } from "./data-structure.js";
import { TodoListView } from "./view.js";

function checkEventLocal(checkText : HTMLSpanElement, display : string , status : boolean, Text : string, todolist : Array<objectType> ) {
    checkText.style.textDecoration = display;
    for (let i = 0; i < todolist.length; i++) {
      if (todolist[i].name === Text) {
        LocalStore().editTodoItem(i, new DataStructure(todolist[i].name, status), todolist);
      }
    }
  }
  
async function selectMethod(method : Promise<objectType> | Function) {
    const array : unknown = await method;
    todoContainer.innerHTML = "";
    (array as Array<objectType>).map((obj) => {
        TodoListView().addEvent(obj);
    });
  }
  
async function checkEventCloud(checkText : HTMLSpanElement, display : string, id : string , Text : string, status? : boolean) {
    checkText.style.textDecoration = display;
    await CloudStorage().editTodo(id, Text, status);
  }

export {checkEventCloud , checkEventLocal , selectMethod}