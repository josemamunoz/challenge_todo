import "./App.css";

import React, { useState, useEffect } from "react";

function App() {

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [allitems, setAllitems] = useState("all");
  const [activeItems, setActiveItems] = useState("");
  const [completedItems, setCompletedItems] = useState("");
  const [changeItems, setChangeItems] = useState([]);

  //Iconos:
  const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>;
  const removeIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13H5v-2h14v2z"/></svg>;


  
  function clearAll(e) {
    e.preventDefault();
    setTodos([]);
  };

  //función que recibe la tarea desde el input

  function handleNewTodoChange(e) {
    e.preventDefault();
    setNewTodo(e.target.value);
  };

 //función que guarda la tarea en un array del state 

  function handleNewTodo(e) {
    e.preventDefault();
    if (newTodo === "")
      return
        setTodos([...todos, { id: Date.now(), tarea: newTodo, completed: false}]);
        setNewTodo("");
        e.target.reset();
        saveLocalTodos(todos);

  };

  //funcion que escucha los cambios, sólo para actualizar el estado con usestate

  function changeState(){
    setChangeItems([])
  };

  //funcion que elimina las tareas de a una por vez

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //función que guarda las tareas en localStorage

  function saveLocalTodos(todo){

    let todos;

    if(localStorage.getItem("todos") === null){
      todos = [];
    }else {
      todos = JSON.parse(localStorage.getItem("todos", todo));
    }

    localStorage.setItem("todos", JSON.stringify(todo));

  };

  //Estas tres funciones solo cambian el state de los botones de navegación. Se puede mejorar esta parte modificando solo el css

  function showAll(){
    setAllitems("all"); 
    setActiveItems(""); 
    setCompletedItems("")
  };
  function showActive(){
    setAllitems(""); 
    setActiveItems("active"); 
    setCompletedItems("")
  };
  function showCompleted(){
    setAllitems(""); 
    setActiveItems(""); 
    setCompletedItems("completed")
  };

  function countTodos(){
    let completedTask = 0;
    for (let todo in todos){
      if(todos[todo].completed === true){
        completedTask = completedTask +1;
      }
    }
    return completedTask;
  }

  //una vez se abre la aplicación revisa si hay algo en localStorage, si hay tareas las guarda en el state, sino, establece los todos = []

  useEffect(() => {

    let data = localStorage.getItem("todos");
    if (data != null){
      setTodos(JSON.parse(data))
    } else{
      setTodos([])
    }
  }, []);

  //Este useeffect está atento a los cambios que se generen y los guarda en el loalStorage

  useEffect(() => {

    localStorage.setItem("todos", JSON.stringify(todos));
  }, [changeItems]);

  
  //esta función está atenta a los todos que se ingresan, pero no a los cambios (por eso necesitamos los 2 useeffect)

  useEffect(() => {

    saveLocalTodos(todos)
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos])


  return (
    <>
    <div className="container">
        <div className="title">
          <h1>Todo List</h1>
        </div>

        <nav className="tabs">
          <ul className="tabsLista">
            <li className="list-tab-element">
              <button className={"all " + allitems} onClick={()=> showAll()}>All</button>
              <span className={todos.length> 0 ? "notificationAll" : "count0"}>
                {todos.length}
              </span>
            </li>
            <li className="list-tab-element">
              <button className={"active " + activeItems} onClick={()=> showActive()}>Active</button>
              <span className={todos.length - countTodos() > 0 ? "notificationActive" : "count0"}>{todos.length - countTodos()}</span></li>
            <li className="list-tab-element">
              <button className={"completed " + completedItems} onClick={()=> showCompleted()}>Completed</button>
              <span className={countTodos() > 0 ? "notificationCompleted" : "count0"}>{countTodos()}</span></li>
          </ul>
        </nav>

        {/* input para agregar tareas*/}

        <div className="container1">
          
        
        {/* lista de tareas*/}
        {
        completedItems === "completed" ?
        <>
          <ul className="listGroup" >
            {todos.map((todo) => (
              <li className={"lista"+(todo.completed ? "-completed" : "-active")} key={todo.id} onChange={changeState} style={{display: todo.completed ? "flex" : "none" }}>
                  <text className={"itemdelista"}>{todo.tarea}</text>
                  <label className="containerCheck">
                    <input type="checkbox" onChange={(e) =>(
                      (todos[todos.indexOf(todo)].completed = e.target.checked)
                      ) } checked={todo.completed ? true : false}></input>
                    <span className="checkmark"></span>
                  </label>
                  <button type="button" className="close" aria-label="Close" onClick={() => removeTodo(todo.id)}>
                  <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#BDBDBD"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
                  </button>
              </li>
            ))}
          </ul>
          <div className="buttonDelete">
          <button type="button" className="buttonDanger" onClick={clearAll}>
          <svg className="deleteAllIcon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
            Delete all</button>
        </div>
        </> 
          
          : 
          activeItems === "active" ? 
          <>
            <div className="containerform">
                <form className="formulario1" onSubmit={handleNewTodo}>
                  <input type="text" className="inputnormal" placeholder={"Add details"} onChange={handleNewTodoChange}></input> 
                  <button type="submit" className="buttonAdd" form="formulario1">{addIcon}</button>
                </form>
            </div>
            <ul className="listGroup" >
            {todos.map((todo) => (
              <li className={"lista"+(todo.completed ? "-completed" : "-active")} key={todo.id} onChange={changeState} style={{display: todo.completed ? "none" : "flex" }}>
                <text className={"itemdelista"}>{todo.tarea}</text>
                <label className="containerCheck">
                    <input type="checkbox" onChange={(e) =>(
                      (todos[todos.indexOf(todo)].completed = e.target.checked)
                      ) } checked={todo.completed ? true : false}></input>
                    <span class="checkmark"></span>
                  </label>
              </li>
            ))}
          </ul>
        </>
          :
          <>
          <div className="containerform">
              <form className="formulario1" onSubmit={handleNewTodo}>
                <input type="text" className="inputNormal" placeholder={"Add details"} onChange={handleNewTodoChange}></input> 
                <button type="submit" className="buttonAdd" form="formulario1">{addIcon}</button>
              </form>
        </div>
          <ul className="listGroup" >
          {todos.map((todo) => (
            <li className={"lista"+(todo.completed ? "-completed" : "-active")} key={todo.id} onChange={changeState}>
              <text className={"itemdelista"}>{todo.tarea}</text>
              <label className="containerCheck">
                  <input type="checkbox" onChange={(e) =>(
                    (todos[todos.indexOf(todo)].completed = e.target.checked)
                    ) } checked={todo.completed ? true : false}></input>
                  <span class="checkmark"></span>
                </label>
            </li>
          ))}
        </ul>
         </>

        }
        
          </div>
          
          
        </div>
        <div className="footer">
            <div className="credits">
              created by <a target="_blank" rel="noreferrer" href="https://devchallenges.io/portfolio/josemamunoz" className="linksexternos">josemamunoz</a> - <a target="_blank" rel="noreferrer" href="https://devchallenges.io/" className="linksexternos">devchallenges.io</a>
            </div>
          </div>
        </>
  );
}


export default App;
