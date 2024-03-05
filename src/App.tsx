import './App.css'
import {useRef, useState} from "react";
import {ITodoItem} from "./todos/shared/types.ts";
import {storageProvider} from "./utils/storage/storage.provider.ts";
import TodoItem from "./todos/components/TodoItem.tsx";

function App() {
    const storageTodos = storageProvider.getItem('todos');
    const [todos, setTodos] = useState<ITodoItem[]>(storageTodos !== null ? JSON.parse(storageTodos) : [])
    const form = useRef<HTMLFormElement>(null)

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
        const newTodo = {id: Math.random(), value: input.value, completed: false}
        storageProvider.setItem('todos', JSON.stringify([newTodo, ...todos]))
        form.current?.reset();
        setTodos([newTodo, ...todos])
    }

    return (
        <div className="container mx-auto">
            <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md w-96">
                <div className="p-6">
                    <h2 className="text-left text-2xl font-bold  text-blue-950">
                        To-Do list app
                    </h2>
                </div>
                <div className="p-6 pt-0">
                    <div className=" sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="flex" ref={form}>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input
                                    className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                    type="text"
                                    name="todo"
                                    id="todo"
                                    data-testid="todo-input"
                                    required
                                />
                                <label
                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Your To-Do!
                                </label>
                            </div>
                            <button data-testid="add-todo"
                                    className="ml-1 select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                Add
                            </button>
                        </form>
                        <ul data-testid="list">
                            {todos.map(todo => (
                                <TodoItem key={todo.id} todo={todo} onChange={handleTodoCompletionChange}
                                          onRemove={handleTodoRemove}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default App
