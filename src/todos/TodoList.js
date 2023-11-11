import { useGetTodosQuery , useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation} from '../api/apiSlice';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
const TodoList = () => {
    const [newTodo, setNewTodo] = useState([]);

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({title : newTodo, completed: false});
        setNewTodo('')
    }
    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    let content;
    if(isLoading) content = <p>Loading...</p>;
    if(isSuccess) content = data.map((todo) => {
        return (
            <article key={todo.id}>
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
        )
    });
    if(isError) content = <p>{error}</p>;
    

    return (
        <main>
            <h1>List Todos</h1>
            {newItemSection}
            {content}
        </main>
    )
}

export default TodoList;