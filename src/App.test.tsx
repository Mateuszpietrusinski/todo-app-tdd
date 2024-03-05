import {describe, test, expect, vi, afterEach} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.tsx";
import {storageProvider} from "./utils/storage/storage.provider.ts";

describe('todos container integration tests', () => {
    afterEach(() => {
        vi.clearAllMocks()
        cleanup()
    })
    test('should add new item on top of the list', async () => {
        // Arrange
        render(<App/>)

        // Act
        const newTodo = 'new todo'
        const user = userEvent.setup()

        await user.type(screen.getByTestId('todo-input'), newTodo)
        await user.click(screen.getByTestId('add-todo'))
        const todoItem = screen.getByTestId('todo-item');
        const todoItemText = screen.getByTestId('todo-item-text');

        // Assert
        expect(todoItem).toBeDefined()
        expect(todoItemText.textContent).toEqual(newTodo)
    });

    test('todos should persist after browser closing', async () => {
        // Arrange
        vi.spyOn(storageProvider, 'getItem').mockImplementationOnce(() => JSON.stringify([{
            id: 1,
            value: 'First todo',
            completed: false
        }]))
        // Act
        render(<App/>)

        // Assert
        expect(screen.getByTestId('todo-item')).toBeDefined()
        expect(screen.getByTestId('todo-item-text').textContent).toBe('First todo')
    })

    test('should remove item from the list by clicking remove', async () => {
        vi.spyOn(storageProvider, 'getItem').mockImplementationOnce(() => JSON.stringify([{
            id: 1,
            value: 'First todo',
            completed: false
        }]))
        render(<App/>)
        const user = userEvent.setup()
        await user.click(screen.getByTestId('todo-item-remove'));

        expect(screen.getByTestId('list').firstChild).toBeNull()
    })

    test('should render list of all the todos', async () => {
        vi.spyOn(storageProvider, 'getItem').mockImplementationOnce(() => JSON.stringify([{
            id: 1,
            value: 'First todo',
            completed: false
        }, {
            id: 2,
            value: 'Second todo',
            completed: true
        }]))
        render(<App/>)

        expect(screen.getByTestId('list')).toBeDefined()
        expect(screen.getByTestId('list').children.length).toBe(2)
    })
})