import React from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import Context from "./context";

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, completed: false, title: "Купить хлеб" },
    { id: 2, completed: true, title: "Купить масло" },
    { id: 3, completed: false, title: "Купить батон" },
  ]);

  // let todos = [
  //   { id: 1, completed: false, title: "Купить хлеб" },
  //   { id: 2, completed: false, title: "Купить масло" },
  //   { id: 3, completed: false, title: "Купить батон" },
  // ];

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

  return (
    <Context.Provider value={{ removeTodo: removeTodo }}>
      <div className="wrapper">
        <h2>React tutorial</h2>
        <TodoList todos={todos} onToggle={toggleTodo} />
      </div>
    </Context.Provider>
  );
}

export default App;
