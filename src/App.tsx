import './App.css'
import {useState} from "react";
import {ITodoItem} from "./todos/shared/types.ts";
import {storageProvider} from "./utils/storage/storage.provider.ts";
import TodoItem from "./todos/components/TodoItem.tsx";

function App() {
    const storageTodos = storageProvider.getItem('todos');
    const [todos, setTodos] = useState<ITodoItem[]>(storageTodos !== null ? JSON.parse(storageTodos) : [])

    const handleTodoCompletionChange = (id: number) => {
        const todosCopy = [...todos];
        const todoIdx = todosCopy.findIndex(todo => todo.id === id)
        todosCopy[todoIdx].completed = !todosCopy[todoIdx].completed
        storageProvider.setItem('todos', JSON.stringify(todosCopy))
        setTodos(todosCopy)
    }

    const handleTodoRemove = (id: number) => {
        const todosCopy = todos.filter(todo => todo.id !== id)
        storageProvider.setItem('todos', JSON.stringify(todosCopy))
        setTodos(todosCopy)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const input = e.currentTarget.elements[0] as HTMLInputElement
        const newTodo = {id: todos.length + 1, value: input.value, completed: false}
        storageProvider.setItem('todos', JSON.stringify([newTodo, ...todos]))
        setTodos([newTodo, ...todos])
    }

    return (
        <div className="d-flex">
            <form onSubmit={handleSubmit}>
                <input type="text" data-testid="todo-input"/>
                <button data-testid="add-todo">Add</button>
            </form>
            <ul data-testid="list">
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onChange={handleTodoCompletionChange}
                              onRemove={handleTodoRemove}/>
                ))}
            </ul>
        </div>

    )
}

export default App
