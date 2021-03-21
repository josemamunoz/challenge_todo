import "./App.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function App() {

  

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [allitems, setAllitems] = useState("");
  const [activeItems, setActiveItems] = useState("");
  const [completedItems, setCompletedItems] = useState("");
 /*  const [checkedItems, setCheckeditems] = useState([]); */

  useEffect(() => {
    
    consultarTodos()

  }, [todos])

  function clearAll() {
    setTodos([])
  }

  function consultarTodos(){
    console.log(todos)
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
  }
  /* function hamdleCheck(e){
    
  } */
  /* function handleChecked(e, todos){
    if(e.target.checked === false){
      setCheckeditems([...checkedItems, {tarea: todos.todo.tarea, completed: e.target.checked}])
      console.log("checked = true")

    } else{
      setCheckeditems([...checkedItems, {tarea: todos.todo.tarea, completed: e.target.checked}])
      console.log("checked = false")
    }
  } */

  //funcion que elimina las tareas
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
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
            <li><button className={"tabsItems " + allitems} onClick={()=> (setAllitems("active"), setActiveItems(""), setCompletedItems(""))}>All</button></li>
            <li><button className={"tabsItems " + activeItems} onClick={()=> (setAllitems(""), setActiveItems("active"), setCompletedItems(""))}>Active</button></li>
            <li><button className={"tabsItems " + completedItems} onClick={()=> (setAllitems(""), setActiveItems(""), setCompletedItems("active"))}>Completed</button></li>
          </ul>
        </nav>

        {/* input para agregar tareas*/}

        <div className="container1">
          <div className="grupo1">
            <div className="leftside">
              <form className="formulario1" onSubmit={handleNewTodo}>
                <input type="text" className="inputNormal"
                  placeholder={
                    todos.length === 0
                      ? "No task yet!!"
                      : "Add details"
                  }
                  onChange={handleNewTodoChange}
                >
                </input> 
              </form>
            </div>
            <div className="rightside">
              <button type="button" className="button1" onClick={handleNewTodo}>Add</button>
            </div>
            
        </div>
        
        {/* lista de tareas*/}

        <ul className="listGroup" >
          {todos.map((todo) => (
            <li className="lista" key={todo.id}>
              <label className="containerCheck">
                <input type="checkbox" onChange={(e) =>(
                  /* handleChecked(e), */ 
                  /* console.log(e.target.checked),
                  console.log(todos.indexOf(todo)), 
                  console.log("este es el el estado: "+todo.completed), 
                  e.target.checked === true ? */
                  /* setCheckeditems([...checkedItems, {tarea: todo.tarea, completed: e.target.checked}]) */
                  /* (todos.todo[todos.indexOf(todo)].completed = e.target.checked) */
                  /* console.log("cuando es true: "+todos[todos.indexOf(todo)].completed) */
                  (todos[todos.indexOf(todo)].completed = e.target.checked),
                  consultarTodos()
                  /* : console.log("esto es cuando es falso: " + todo) */
                  /* (todos.todo[todos.indexOf(todo)].completed = e.target.checked) */
                  ) /* console.log(e.target.checked) */}></input>
                <span class="checkmark"></span>
              </label>
              <text className="itemdelista">{todo.tarea}</text>
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
          </div>
        </div>
  );
}


export default App;
