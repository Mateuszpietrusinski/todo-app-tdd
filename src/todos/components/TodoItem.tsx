import {ITodoItem} from "../shared/types.ts";

interface TodoItemProps {
    todo: ITodoItem,
    onChange: (id: number) => void,
    onRemove: (id: number) => void
}
export default function TodoItem({todo, onChange, onRemove}: TodoItemProps) {
    return (
        <li data-testid="todo-item">
            <input data-testid="todo-item-completed" type="checkbox" checked={todo.completed} onChange={() => onChange(todo.id)}/>
            <span data-testid="todo-item-text" style={todo.completed ? {textDecoration: 'line-through'} : {}}>{todo.value}</span>
            <button data-testid="todo-item-remove" onClick={() => onRemove(todo.id)}>Remove</button>
        </li>
    )
}