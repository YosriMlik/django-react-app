'use client'

import styles from './page.module.css';
import Navbar from './components/navbar';
import { useEffect, useState } from 'react';

// Define the shape of a todo object
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/todos/');
        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      const data: Todo = await res.json();
      setTodos(prevTodos => [...prevTodos, data]);
      setNewTodo({ title: '', description: '' });
      document.querySelector<HTMLDialogElement>("#addTodoDialog")?.close();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mt-5">
        <h1 className='is-size-1 mb-5'>Hello World</h1>
        <button onClick={() => document.querySelector<HTMLDialogElement>("#addTodoDialog")?.showModal()} className='button is-primary is-light mb-5'>
          + Add Todo
        </button>
        <dialog id="addTodoDialog" style={{ border: 'none', background: 'transparent' }}>
          <div className="message is-primary">
            <div className="message-header">
              Add Todo
              <button className="delete" onClick={() => document.querySelector<HTMLDialogElement>("#addTodoDialog")?.close()}></button>
            </div>
            <div className="message-body">
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label>Title:</label>
                  <input
                    className='input'
                    type="text"
                    name="title"
                    value={newTodo.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <input
                    className='input'
                    type="text"
                    name="description"
                    value={newTodo.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="button is-info mt-5">Add Todo</button>
              </form>
            </div>
          </div>
        </dialog>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>{todo.completed ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
