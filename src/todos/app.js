import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos,renderPending } from './use-cases';


const elementIDS = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    clearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    pendingCount: '#pending-count',
};


/**
 * @param {String} elementId 
 */

export const App = (elementId) => {

    //Renderiza todos los TODO en nuestro Store
    const displayTodos = () => {
        const todos = todoStore.getTodo(todoStore.getCurrentFilter());
        renderTodos(elementIDS.TodoList, todos);
        countPending();
    };


    const countPending = () => {
        renderPending(elementIDS.pendingCount);
     };

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


    //Referencias HTML
    const newDescriptionInput = document.querySelector(elementIDS.NewTodoInput);
    const todoListUL = document.querySelector(elementIDS.TodoList);
    const btnclearCompleted = document.querySelector(elementIDS.clearCompleted);
    const filtersUL = document.querySelectorAll(elementIDS.TodoFilters);


    //Obtiene la tecla precionada 
    newDescriptionInput.addEventListener('keyup', (e) => {

        if (e.keyCode !== 13)
            return;

        if (e.target.value.trim().lenght === 0)
            return;

        todoStore.addTodo(e.target.value);
        displayTodos();
        e.target.value = '';
    });

    //Obtiene la descripción del TODO con el Click
    todoListUL.addEventListener('click', (e) => {
        const element = e.target.closest(' [data-id] ');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (e) => {
        const elementDestroy = e.target.className === 'destroy';
        const element = e.target.closest(' [data-id] ');

        if (!element || !elementDestroy) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    btnclearCompleted.addEventListener('click', (e) => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersUL.forEach(e => {

        e.addEventListener('click', (e) => {
            filtersUL.forEach(el => el.classList.remove('selected'));
            e.target.classList.add('selected');

            switch (e.target.text) {
                case 'Todos':
                    todoStore.setSelectedFilter(Filters.All)
                    break;
                case 'Pendientes':
                    todoStore.setSelectedFilter(Filters.Pending);
                    break;

                case 'Completados':
                    todoStore.setSelectedFilter(Filters.Completed);
                    break;
            };

            displayTodos();
        });

    });
};