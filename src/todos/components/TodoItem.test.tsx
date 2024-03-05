import {describe, test, expect, afterEach, vi} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";
import TodoItem from "./TodoItem.tsx";

describe('Todo item tests', () => {
    afterEach(cleanup)
    test('should render todo item', () => {
        // Arrange
        const todo = {id: 1, value: 'First todo', completed: false}
        const onChange = vi.fn();
        const onRemove = vi.fn();

        // Act
        render(<TodoItem todo={todo} onChange={onChange} onRemove={onRemove}/>)

        // Assert
        expect(screen.getByTestId('todo-item')).toBeDefined()
        expect(screen.getByTestId('todo-item-text').textContent).toBe('First todo')
    })

    test('completed todo should have checked marked', () => {
        // Arrange
        const todo = {id: 1, value: 'First todo', completed: true}
        const onChange = vi.fn();
        const onRemove = vi.fn();

        // Act
       render(<TodoItem todo={todo} onChange={onChange} onRemove={onRemove} />)

        // Assert
        expect(screen.getByTestId('todo-item-completed').getAttribute('checked')).toBeDefined()
    })

    test('uncompleted todo should\'t have checked marked', () => {
        const todo = {id: 1, value: 'First todo', completed: false}
        const onChange = vi.fn();
        const onRemove = vi.fn();
        // Act
        render(<TodoItem todo={todo} onChange={onChange} onRemove={onRemove} />)

        // Assert
        expect(screen.getByTestId('todo-item-completed').getAttribute('checked')).toBeNull()
    })

    test('completed todo should be crossed', () => {
        const todo = {id: 1, value: 'First todo', completed: true}
        const onChange = vi.fn();
        const onRemove = vi.fn();
        // Act
        render(<TodoItem todo={todo} onChange={onChange} onRemove={onRemove} />)

        // Assert
        expect(screen.getByTestId('todo-item-text').style.textDecoration).toBe('line-through')
    })
})