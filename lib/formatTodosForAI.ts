const formatTodosForAI = (board: Board, userId: string) => {
    const newTodos: [TypedColumn, Column][] = Array.from(board.columns.entries()).map(([category, categoryData]) => {
        const filteredTodos = categoryData.todos.filter(todo => todo.userId === userId);
        return [category, { ...categoryData, todos: filteredTodos }];
    });

    const flatArray: {
        todo: Todo[];
        inprogress: Todo[];
        done: Todo[];
    } = {
        todo: [],
        inprogress: [],
        done: [],
    };

    newTodos.forEach(([key, value]) => {
        flatArray[key] = value.todos;
    });

    const flatArrayCounted: {
        todo: number;
        inprogress: number;
        done: number;
    } = {
        todo: flatArray.todo.length,
        inprogress: flatArray.inprogress.length,
        done: flatArray.done.length,
    };

    return flatArrayCounted;
};

export default formatTodosForAI;
