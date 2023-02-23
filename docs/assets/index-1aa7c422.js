(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function l(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(o){if(o.ep)return;o.ep=!0;const d=l(o);fetch(o.href,d)}})();const w=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
\r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Creado por <a href="http://todomvc.com">Cristóbal Bravo</a></p>\r
</footer>`;let y;const S=new Uint8Array(16);function L(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(S)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function C(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:E};function A(e,t,l){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const i=e.random||(e.rng||L)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){l=l||0;for(let o=0;o<16;++o)t[l+o]=i[o];return t}return C(i)}class P{constructor(t){this.id=A(),this.descripcion=t,this.done=!1,this.createAt=new Date}}const a={All:"all",Completed:"Completed",Pending:"Pending"};let s={todos:[],filter:a.All};const U=()=>{v(),console.log("InitStore")},v=()=>{localStorage.getItem("state")&&(s=JSON.parse(localStorage.getItem("state")))},h=()=>{localStorage.setItem("state",JSON.stringify(s))},I=(e=a.All)=>{switch(e){case a.All:return[...s.todos];case a.Completed:return s.todos.filter(t=>t.done);case a.Pending:return s.todos.filter(t=>!t.done);default:throw new Error(`Opcion ${e} no es valida`)}},k=e=>{if(!e)throw new Error("La descripción es requerrida");s.todos.push(new P(e)),h()},x=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),h()},O=e=>{s.todos=s.todos.filter(t=>t.id!==e),h()},q=()=>{s.todos=s.todos.filter(e=>!e.done),h()},D=(e=a.All)=>{s.filter=e,h()},F=()=>s.filter,c={setSelectedFilter:D,getCurrentFilter:F,deleteCompleted:q,deleteTodo:O,toggleTodo:x,initStore:U,loadStore:v,addTodo:k,getTodo:I},M=e=>{if(!e)throw new Error("Un TODO es requerrido");const t=`
        <div class="view">
            <input class="toggle" type="checkbox" ${e.done?"checked":""}>
            <label>${e.descripcion}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `,l=document.createElement("li");return l.innerHTML=t,l.setAttribute("data-id",e.id),e.done&&l.classList.add("completed"),l};let b;const N=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error(`Elemento: ${e}, no encontrado...`);b.innerHTML=c.getTodo(a.Pending).length};let g;const H=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`El elemento: ${e}, no se encontro`);g.innerHTML="",t.forEach(l=>{g.append(M(l))})},m={TodoList:".todo-list",NewTodoInput:"#new-todo-input",clearCompleted:".clear-completed",TodoFilters:".filtro",pendingCount:"#pending-count"},R=e=>{const t=()=>{const n=c.getTodo(c.getCurrentFilter());H(m.TodoList,n),l()},l=()=>{N(m.pendingCount)};(()=>{const n=document.createElement("div");n.innerHTML=w,document.querySelector(e).append(n),t()})();const i=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),d=document.querySelector(m.clearCompleted),u=document.querySelectorAll(m.TodoFilters);i.addEventListener("keyup",n=>{n.keyCode===13&&n.target.value.trim().lenght!==0&&(c.addTodo(n.target.value),t(),n.target.value="")}),o.addEventListener("click",n=>{const p=n.target.closest(" [data-id] ");c.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",n=>{const p=n.target.className==="destroy",f=n.target.closest(" [data-id] ");!f||!p||(c.deleteTodo(f.getAttribute("data-id")),t())}),d.addEventListener("click",n=>{c.deleteCompleted(),t()}),u.forEach(n=>{n.addEventListener("click",p=>{switch(u.forEach(f=>f.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"Todos":c.setSelectedFilter(a.All);break;case"Pendientes":c.setSelectedFilter(a.Pending);break;case"Completados":c.setSelectedFilter(a.Completed);break}t()})})};c.initStore();R("#app");
