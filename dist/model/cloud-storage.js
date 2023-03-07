var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DataStructure } from '../utils/data-structure.js';
const URL = 'https://mk-todo-web-api.azurewebsites.net/api/JagadishTodoItems';
const deleteURL = 'https://mk-todo-web-api.azurewebsites.net/JagadishTodoItems/deleteAll';
function CloudStorage() {
    return {
        getTodo: (apiURL) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(apiURL, { method: 'GET' });
            return yield response.json();
        }),
        createTodo: function (todoName) {
            return setItem(URL, {
                method: 'POST',
                body: JSON.stringify(new DataStructure(todoName)),
            });
        },
        editTodo: function (todoId, changeName, status = false) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield setItem(`${URL}/${todoId}`, {
                    method: 'PUT',
                    body: JSON.stringify(new DataStructure(changeName, status, todoId))
                });
            });
        },
        deleteItem: function (todoId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield setItem(`${URL}/${todoId}`, { method: 'DELETE' });
            });
        },
        deleteAll: function () {
            setItem(deleteURL, { method: 'DELETE' });
        },
    };
}
function setItem(api, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const header = new Headers();
        header.append('content-type', 'application/json');
        try {
            const response = yield fetch(api, Object.assign(Object.assign({}, options), { headers: header }));
            return response;
        }
        catch (error) {
            alert('SOMETHING WENT WRONG...');
        }
    });
}
export { CloudStorage, URL };
