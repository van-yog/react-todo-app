import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

const styles = {
  ul: {
    listStyle: "none",
    color: "blue",
    margin: "0",
    padding: "0",
  },
};

function TodoList(props) {
  console.log(props);
  console.log(props.todos);
  const { todos } = props;
  console.log("Деструктуризация {todos} = props ...", todos);
  return (
    <ul style={styles.ul}>
      {props.todos.map((todo, index) => (
        <TodoItem
          todo={todo}
          index={index}
          key={todo.id}
          onChange={props.onToggle}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onToggle: PropTypes.func.isRequired,
};

export default TodoList;
