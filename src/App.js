import React from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import Context from "./context";
import { useEffect } from "react";
import Loader from "./Components/Loader.js";
import Modal from "./Components/Modal/Modal.js";
import AddTodo from "./Components/AddTodo.js";

// Ленивая загрузка компонента AddTodo
// const AddTodo = React.lazy(
//   () =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(import("./Components/AddTodo.js"));
//       }, 2000);
//     })
// );

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // useEffect( callback, []) - эмуляция componentDidMount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 1000);
      });
  }, []);

  function toggleTodo(id) {
    setTodos(
      todos.map((todos) => {
        if (todos.id === id) {
          todos.completed = !todos.completed;
        }
        return todos;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(todos.concat([{ title, id: Date.now(), completed: false }]));
  }

  return (
    <Context.Provider value={{ removeTodo: removeTodo }}>
      <div className="wrapper">
        <h2>React tutorial</h2>
        <Modal />

        {/* // Ленивая загрузка компонента AddTodo */}
        {/* <React.Suspense fallback={<p>Ждите плиз...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense> */}

        <AddTodo onCreate={addTodo} />

        {loading && <Loader />}

        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
