import { React, useState } from 'react';
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';
import './App.css';

function App() {
  let [todos, setTodos] = useState([]);
  const [todoShow, setTodoShow] = useState('all');
  const [toggleAllComplete, setToggleAllComplete] = useState(true);
  const addTodo = (todo) => {
    setTodos([todo, ...todos])
  };
  const handleDelete = (id)=>{
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const updateTodoToShow = (s) => {
    setTodoShow(s);
  };
  const removeAllTodosThatAreComplete = () => {
    setTodos(todos.filter((todo) => !todo.complete));
  };
  const toggleComplete =(id) => {
    setTodos(
    todos.map((todo) => {
      if (todo.id === id){
        return{
          ...todo,
          complete: !todo.complete,
        }
      } else {
        return todo;
      }
    })
  );
};
  if(todoShow === "active"){
    todos = todos.filter((todo)=> !todo.complete);
  } else if (todoShow === "complete"){
    todos = todos.filter((todo) => todo.complete)
  }
  return (
   <div className='container'>
    <TodoForm onSubmit = {addTodo} />
    {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} 
        onDelete={() => handleDelete(todo.id)}
        toggleComplete={() => toggleComplete(todo.id)} />
      ))
    }
    <div>
      <button 
        className='update-btn btn-all btn'
        onClick={() => updateTodoToShow("all")}
      >All</button>
      <button
        className='update-btn btn active-btn' 
        onClick={()=> updateTodoToShow("active")}>Active</button>
      <button 
        className='update-btn btn-comp btn' 
        onClick={()=> updateTodoToShow("complete")}
      >Complete</button>
    </div>
      {todos.some((todo) => todo.complete) ? (
            <button className='all-btn btn-remove btn' onClick={removeAllTodosThatAreComplete}>
              Remove all complete todos
            </button>
      ): null}
    <button 
      className='all-btn btn' onClick={() => {
        setTodos(
          todos.map((todo) => ({
              ...todo,
              complete: toggleAllComplete,
            }))
        );
        setToggleAllComplete(!toggleAllComplete);
      }}
    >
      Toggle all complete: {`${toggleAllComplete}`}</button>
   </div>
  );
}

export default App;
