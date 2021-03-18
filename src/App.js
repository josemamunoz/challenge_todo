import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bulma/css/bulma.css"

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);


  useEffect(() => {

    fetch("https://assets.breatheco.de/apis/fake/todos/user/nuevousuario", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/nuevousuario", {
      method: "PUT",
      body: JSON.stringify(
        todos.map((label) => {
          return { label: label, done: false };
        })
      ),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

  }, [todos]);

  function clearAll() {

  }

  function handleNewTodoChange(e) {
    e.preventDefault();
    setNewTodo(e.target.value);
  }


  function handleNewTodo(e) {

    e.preventDefault();
    if (newTodo === "")
      return
    setTodos([...todos, { id: Date.now(), text: newTodo },]);
    //setTodos(todos.concat(newTodo)); //otra forma de obtener los todos

    setNewTodo("");
    e.target.reset();

  }

  //funcion que elimina las tareas
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }


  return (
    <div className="container is-fluid">

      {/* titulo y contador del numero de tareas */}

      <div className="level-item has-text-centered">
        <div className="titulo">
          <p className="title">To do</p>
          <p className="heading">Count: {todos.length}</p>
        </div>
      </div>

       {/* tabs para cambiar de pagina */}

        <div className="tabs is-medium is-centered">
          <ul>
            <li class="is-active"><a>All</a></li>
            <li><a>Active</a></li>
            <li><a>Completed</a></li>
          </ul>
        </div>

        {/* input para agregar tareas*/}

        <div className="container1">
          <div className="field is-grouped">
            <form onSubmit={handleNewTodo}>
              <input type="text" className="input is-normal"
                placeholder={
                  todos.length === 0
                    ? "No task, rest day!!"
                    : "Add a task"
                }
                onChange={handleNewTodoChange}
              >

              </input> 
            </form>
            <button type="button" className="button is-info" onClick={clearAll}>Add</button>
        </div>
        
        {/* lista de tareas*/}

        <ul className="list-group" >
          {todos.map((todo) => (
            <li className="lista" key={todo.id}>
              <label className="checkbox">
                <input type="checkbox"/>
              </label>
                    {todo.text}
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={() => removeTodo(todo.id)}
                    >
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </li>
                ))}
              </ul>
        <button type="button" className="button is-danger" onClick={clearAll}><i className="far fa-trash-alt"></i> Delete all</button>
          </div>
        </div>
  );
}


export default App;
