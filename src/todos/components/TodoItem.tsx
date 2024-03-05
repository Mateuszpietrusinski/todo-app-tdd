import {ITodoItem} from "../shared/types.ts";

interface TodoItemProps {
    todo: ITodoItem,
    onChange: (id: number) => void,
    onRemove: (id: number) => void
}

export default function TodoItem({todo, onChange, onRemove}: TodoItemProps) {
    return (
        <li data-testid="todo-item" className="mt-4 border-b-2 py-2 flex justify-between items-center">
            <div className="inline-flex items-center">
                <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="checkbox-1"
                    data-ripple-dark="true"
                >
                    <input
                        data-testid="todo-item-completed" type="checkbox" checked={todo.completed}
                        onChange={() => onChange(todo.id)}
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                    />
                    <div
                        className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </label>
            </div>
            <span data-testid="todo-item-text"
                  style={todo.completed ? {textDecoration: 'line-through'} : {}}>{todo.value}</span>
            <button data-testid="todo-item-remove"
                    className="ml-1 select-none rounded-lg bg-gray-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={() => onRemove(todo.id)}>Remove
            </button>
        </li>
    )
}