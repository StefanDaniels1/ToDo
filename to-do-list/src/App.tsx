import { FormEvent, ChangeEvent, useState } from "react";
import './App.css';

interface Todo {
  id: number;
  text: string;
  complete: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      complete: false
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? {...todo, complete: !todo.complete} : todo
      )
    );
  };

  return (
    <div className="App">
      <h1>My To Do list</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo =>
          <li key={todo.id}>
            <input 
            type="checkbox"
            value={todo.text}
            checked={todo.complete}
            onChange={() => toggleComplete(todo.id)}
            />
            <span style={{
              textDecoration: todo.complete ? 'line-through' : 'none',
              color: todo.complete ? 'gray' : 'black'
            }}>
              {todo.text}
            </span>
          </li>
        )}
      </ul>
    </div>
  )


}
export default App;
