import { todoService } from "@/apis";
import { Todo } from "@/interfaces";
import createActionWithMeta from "./createActionWithMeta";

export const addTodoAction = createActionWithMeta(
    "todo/add",
    async (payload: Todo, thunkAPI) => {
        const response = await todoService.add(payload);

        if (response.error) {
            return thunkAPI.rejectWithValue(response);
        }

        return response;
    }, { conditionKey: "isSubmitting", metaType: "submitting" }
);

export const getAllTodo = createActionWithMeta(
    "todo/getAll",
    async (payload, thunkAPI) => {
        const response = await todoService.getAll();

        if (response.error) {
            return thunkAPI.rejectWithValue(response);
        }

        return response;
    }, { conditionKey: "isFetching", metaType: "fetching" }
);

export const getOneTodo = createActionWithMeta(
    "todo/getOne",
    async (payload: string, thunkAPI) => {
        const response = await todoService.getOne(payload);

        if (response.error) {
            return thunkAPI.rejectWithValue(response);
        }

        return response;
    }, { conditionKey: "isFetching", metaType: "fetching" }
);

export const updateTodo = createActionWithMeta(
    "todo/update",
    async (payload: Partial<Todo> & { id: string }, thunkAPI) => {
        const { id, ...rest } = payload;

        const response = await todoService.update(id, rest);

        if (response.error) {
            return thunkAPI.rejectWithValue(response);
        }

        return response;
    }, { conditionKey: "isSubmitting", metaType: "submitting" }
);

export const removeTodo = createActionWithMeta(
    "todo/remove",
    async (payload: string, thunkAPI) => {
        const response = await todoService.remove(payload);

        if (response.error) {
            return thunkAPI.rejectWithValue(response);
        }

        return response;
    }, { conditionKey: "isSubmitting", metaType: "submitting" }
);
