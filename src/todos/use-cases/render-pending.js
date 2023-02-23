import todoStore, { Filters } from "../../store/todo.store";

let element;

/**
 * 
 * @param {String} elementId 
 */

export const renderPending =(elementId)=>{

    if (!element){
        element = document.querySelector(elementId);
    }
    if(!element) throw new Error(`Elemento: ${elementId}, no encontrado...`);

    //Renderiza la cantidad de TODO pendientes
    element.innerHTML = todoStore.getTodo(Filters.Pending).length;
};