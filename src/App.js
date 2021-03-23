import "./App.css";

import React, { useState, useEffect } from "react";

function App() {

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [allitems, setAllitems] = useState("all");
  const [activeItems, setActiveItems] = useState("");
  const [completedItems, setCompletedItems] = useState("");
  const [changeItems, setChangeItems] = useState([]);

  
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

      {/* titulo y contador del numero de tareas */}

      <div className="header">
        <div className="titulo">
          <h1 className="title">Todo List</h1>
        </div>
      </div>

       {/* tabs para cambiar de pagina */}

        <nav className="tabs">
          <ul className="tabsLista">
            <li>
              <button className={"all " + allitems} onClick={()=> showAll()}>All</button>
              <span className={todos.length> 0 ? "notificationAll" : "count0"}>
                {todos.length}
              </span>
            </li>
            <li><button className={"active " + activeItems} onClick={()=> showActive()}>Active</button><span className={todos.length - countTodos() > 0 ? "notificationActive" : "count0"}>{todos.length - countTodos()}</span></li>
            <li><button className={"completed " + completedItems} onClick={()=> showCompleted()}>Completed</button><span className={countTodos() > 0 ? "notificationCompleted" : "count0"}>{countTodos()}</span></li>
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
                <label className="containerCheck">
                  <input type="checkbox" onChange={(e) =>(
                    (todos[todos.indexOf(todo)].completed = e.target.checked)
                    ) } checked={todo.completed ? true : false}></input>
                  <span className="checkmark"></span>
                </label>
                <text className={"itemdelista"}>{todo.tarea}</text>
                <button type="button" className="close" aria-label="Close" onClick={() => removeTodo(todo.id)}>
                <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#BDBDBD"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
                </button>
              </li>
            ))}
          </ul>
          <div className="botonDelete">
          <button type="button" className="buttonDanger" onClick={clearAll}>
          <svg className="deleteAllIcon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
            Delete all</button>
        </div>
        </> 
          
          : 
          activeItems === "active" ? 
          <>
          <div className="grupo1">
            <div className="leftside">
              <form className="formulario1" onSubmit={handleNewTodo} id="formulario1">
                <input type="text" className="inputNormal" placeholder={"Add details"} onChange={handleNewTodoChange}></input> 
              </form>
            </div>
            <div className="rightside">
              <button type="submit" className="button1" form="formulario1">Add</button>
            </div>
            
        </div>
          <ul className="listGroup" >
          {todos.map((todo) => (
            <li className={"lista"+(todo.completed ? "-completed" : "-active")} key={todo.id} onChange={changeState} style={{display: todo.completed ? "none" : "flex" }}>
              <label className="containerCheck">
                <input type="checkbox" onChange={(e) =>(
                  (todos[todos.indexOf(todo)].completed = e.target.checked)
                  ) } checked={todo.completed ? true : false}></input>
                <span class="checkmark"></span>
              </label>
              <text className={"itemdelista"}>{todo.tarea}</text>
            </li>
          ))}
        </ul>
        </>
          :
          <>
          <div className="grupo1">
            <div className="leftside">
              <form className="formulario1" onSubmit={handleNewTodo} id="formulario1">
                <input type="text" className="inputNormal" placeholder={"Add details"} onChange={handleNewTodoChange}></input> 
              </form>
            </div>
            <div className="rightside">
              <button type="submit" className="button1" form="formulario1">Add</button>
            </div>
            
        </div>
          <ul className="listGroup" >
          {todos.map((todo) => (
            <li className={"lista"+(todo.completed ? "-completed" : "-active")} key={todo.id} onChange={changeState}>
              <label className="containerCheck">
                <input type="checkbox" onChange={(e) =>(
                  (todos[todos.indexOf(todo)].completed = e.target.checked)
                  ) } checked={todo.completed ? true : false}></input>
                <span class="checkmark"></span>
              </label>
              <text className={"itemdelista"}>{todo.tarea}</text>
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
