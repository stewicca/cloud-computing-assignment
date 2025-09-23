import { authService } from "@/apis";
import createActionWithMeta from "@/redux/actions/createActionWithMeta";

export const registerAction = createActionWithMeta(
    "auth/register",
    async (payload: { email: string, password: string, displayName?: string }, thunkAPI) => {
        const response = await authService.register(payload);

        if (response.error) {
            return thunkAPI.rejectWithValue(response);
        }

        return response;
    }, { conditionKey: "isSubmitting", metaType: "submitting" }
);

export const loginAction = createActionWithMeta(
    "auth/login",
    async (payload: { email: string, password: string }, thunkAPI) => {
        const response = await authService.login(payload);

        if (response.error) {
            return thunkAPI.rejectWithValue(response);
        }

        return response;
    }, { conditionKey: "isSubmitting", metaType: "submitting" }
);

export const logoutAction = createActionWithMeta(
    "auth/logout",
    async (payload, thunkAPI) => {
        const response = await authService.logout();

        if (response.error) {
            return thunkAPI.rejectWithValue(response);
        }

        return response;
    }, { conditionKey: "isSubmitting", metaType: "logout" }
);
