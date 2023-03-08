import { IObjectType } from '../utils/types.js';
import { DataStructure } from '../utils/data-structure.js';

const URL = 'https://mk-todo-web-api.azurewebsites.net/api/JagadishTodoItems';
const deleteURL = 'https://mk-todo-web-api.azurewebsites.net/JagadishTodoItems/deleteAll';

function CloudStorage() {
    return{
       
        getTodo  : async (apiURL : string) : Promise<IObjectType> => {
            const response = await fetch( apiURL, { method : 'GET'})
            return await response.json()
        },
       
        createTodo : function (todoName : string){
                return setItem(URL, {
                    method : 'POST',
                    body : JSON.stringify(new DataStructure(todoName)),
                })
        },

        editTodo :async function( changeName : string , status? : boolean, todoId? : number ) {
            return await setItem(`${URL}/${todoId}` , {
                method : 'PUT',
                body : JSON.stringify( new DataStructure( changeName, status , todoId))
            })
        },

        deleteItem : async function(todoId? : number) {
            return await setItem(`${URL}/${todoId}`, { method : 'DELETE' });
        },

        deleteAll : function(){
            setItem(deleteURL, { method : 'DELETE' });
        },

    }
}

async function setItem(api : string, options : object)  {
    const header = new Headers();
    header.append('content-type', 'application/json');
    try{
        const response = await fetch(api , {
            ...options,
            headers : header,
        });
        return response
    }catch(error){
        alert('SOMETHING WENT WRONG...')
    }
}

export {CloudStorage, URL}