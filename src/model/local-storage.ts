import { IObjectType } from '../utils/types.js';
const storage = localStorage;
export function LocalStore() {
    

    return{
        get : function ()  {
            return JSON.parse(`${storage.getItem('todo')}`) || [] 
        },

        deletetodoItem : function (index : number , list : Array<IObjectType>) {
            list.splice(index , 1);
           setTodo(list);
        },

        deleteAlltodoItem : function () {
           setTodo([]);
        },

        editTodoItem : function (index : number , editName : IObjectType , list : Array<IObjectType>) {
            list.splice(index , 1 , editName)
           setTodo(list);
        }
    }
}

export function setTodo (arr : Array<IObjectType>) {
         storage.setItem('todo' , JSON.stringify(arr))
}