import { Todo } from "../todos/models/todo.model"


export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
};

let state = {
    todos: [
        //Se guardan todos los TODO
        // new Todo('Piedra del Alma'),
        // new Todo('Piedra del Infinito'),
        // new Todo('Piedra del Poder'),
        // new Todo('Piedra del Tiempo'),

    ],
    filter: Filters.All,
};


const initStore = () => {
    loadStore();
    console.log('InitStore');
};

//Se mantiene los cambios en el LocalStorage
const loadStore = () => {
    if (!localStorage.getItem('state')) return;
    state = JSON.parse(localStorage.getItem('state'));
};

const sessionLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
};

const getTodo = (filter = Filters.All) => {

    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);

        default:
            throw new Error(`Opcion ${filter} no es valida`);
    };
};


const addTodo = (descripcion) => {

    if (!descripcion) {
        throw new Error('La descripción es requerrida');
    }
    state.todos.push(new Todo(descripcion));

    sessionLocalStorage();
};

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });

    sessionLocalStorage();
};

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    sessionLocalStorage();
};

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    sessionLocalStorage();
};

const setSelectedFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    sessionLocalStorage();

};

const getCurrentFilter = () => {
    return state.filter;
};


export default {
    setSelectedFilter,
    getCurrentFilter,
    deleteCompleted,
    deleteTodo,
    toggleTodo,
    initStore,
    loadStore,
    addTodo,
    getTodo,
};