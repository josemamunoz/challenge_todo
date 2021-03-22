import "./App.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function App() {

  

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [allitems, setAllitems] = useState("all");
  const [activeItems, setActiveItems] = useState("");
  const [completedItems, setCompletedItems] = useState("");
  const [changeItems, setChangeItems] = useState([]);

  useEffect(() => {
    
    getTodos()

  }, [changeItems])

  function clearAll() {
    setTodos([])
  }

  function handleNewTodoChange(e) {
    e.preventDefault();
    setNewTodo(e.target.value);
  }


  function handleNewTodo(e) {

    e.preventDefault();
    if (newTodo === "")
      return
    setTodos([...todos, { id: Date.now(), tarea: newTodo, completed: false}]);
    //setTodos(todos.concat(newTodo)); //otra forma de obtener los todos
    setNewTodo("");
    e.target.reset();
    saveLocalTodos(todos);
  }

  //funcion que muestra las tareas filtradas por: all, active o completed

  function changeState(){
    setChangeItems([])
  }

  //funcion que elimina las tareas
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
      todos = [];
      console.log(todo);
    }else {
      todos = JSON.parse(localStorage.getItem("todos"));
      console.log(todo);
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

  }

  function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
      todos = [];
    }else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
  /*   todos.push(todo); */
    localStorage.setItem("todos", JSON.stringify(todos));
    
    todos.forEach(function(todo){
      {completedItems === "completed" ?
        <>
          <ul className="listGroup" >
            {todos.map((todo) => (
              <li className={"lista"+(todo.completed ? "-completed" : "-active")} key={todo.id} onChange={changeState} style={{display: todo.completed ? "flex" : "none" }}>
                <label className="containerCheck">
                  <input type="checkbox" onChange={(e) =>(
                    (todos[todos.indexOf(todo)].completed = e.target.checked)
                    ) } ></input>
                  <span class="checkmark"></span>
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
          <ul className="listGroup" >
          {todos.map((todo) => (
            <li className={"lista"+(todo.completed ? "-completed" : "-active")} key={todo.id} onChange={changeState} style={{display: todo.completed ? "none" : "flex" }}>
              <label className="containerCheck">
                <input type="checkbox" onChange={(e) =>(
                  (todos[todos.indexOf(todo)].completed = e.target.checked)
                  ) }></input>
                <span class="checkmark"></span>
              </label>
              <text className={"itemdelista"}>{todo.tarea}</text>
            </li>
          ))}
        </ul>
          :
          <ul className="listGroup" >
          {todos.map((todo) => (
            <li className={"lista"+(todo.completed ? "-completed" : "-active")} key={todo.id} onChange={changeState}>
              <label className="containerCheck">
                <input type="checkbox" onChange={(e) =>(
                  (todos[todos.indexOf(todo)].completed = e.target.checked)
                  ) }></input>
                <span class="checkmark"></span>
              </label>
              <text className={"itemdelista"}>{todo.tarea}</text>
            </li>
          ))}
        </ul>
         

        }
    })
  }

  return (
    <div className="container">

      {/* titulo y contador del numero de tareas */}

      <div className="header">
        <div className="titulo">
          <h1 className="title">To do</h1>
        {/*   <p className="heading">Count: {todos.length}</p> */}
        </div>
      </div>

       {/* tabs para cambiar de pagina */}

        <nav className="tabs">
          <ul className="tabsLista">
            <li><button className={"all " + allitems} onClick={()=> (setAllitems("all"), setActiveItems(""), setCompletedItems(""))}>All</button></li>
            <li><button className={"active " + activeItems} onClick={()=> (setAllitems(""), setActiveItems("active"), setCompletedItems(""))}>Active</button></li>
            <li><button className={"completed " + completedItems} onClick={()=> (setAllitems(""), setActiveItems(""), setCompletedItems("completed"))}>Completed</button></li>
          </ul>
        </nav>

        {/* input para agregar tareas*/}

        <div className="container1">
          <div className="grupo1">
            <div className="leftside">
              <form className="formulario1" onSubmit={handleNewTodo}>
                <input type="text" className="inputNormal" placeholder={"Add details"} onChange={handleNewTodoChange}></input> 
              </form>
            </div>
            <div className="rightside">
              <button type="button" className="button1" onClick={handleNewTodo}>Add</button>
            </div>
            
        </div>
        
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
                  <span class="checkmark"></span>
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
          :
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
         

        }
        
          </div>
        </div>
  );
}


export default App;
