import { Todo } from "@/interfaces";
import { getAllTodo, getOneTodo } from "@/redux/actions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
    todo: Todo & {id?: string} | null;
    todos: (Todo & {id: string})[] | null;
}

const initialState: TodoState = {
    todo: null,
    todos: null,
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodo: (state, action: PayloadAction<Todo & {id?: string}>) => {
            state.todo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTodo.fulfilled, (state, action) => {
            state.todos = action.payload.data;
        });
        builder.addCase(getOneTodo.fulfilled, (state, action) => {
            state.todo = action.payload.data;
        });
    },
});

export const { setTodo } = todoSlice.actions;
export default todoSlice.reducer;
