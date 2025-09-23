import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoadingType = "fetching" | "submitting";

type UiState = {
    isFetching: boolean;
    isSubmitting: boolean;
    isLoading: boolean;
    isRetrying: boolean;
    error: string | null;
};

const initialState: UiState = {
    isFetching: false,
    isSubmitting: false,
    isLoading: false,
    isRetrying: false,
    error: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        loading: (state, action: PayloadAction<{ type: LoadingType }>) => {
            const { type } = action.payload;
            if (type === "fetching") state.isFetching = true;
            if (type === "submitting") state.isSubmitting = true;
            state.isLoading = true;
        },
        success: (state) => {
            state.isFetching = false;
            state.isSubmitting = false;
            state.isLoading = false;
            state.error = null;
        },
        error: (state, action: PayloadAction<string | null>) => {
            state.isFetching = false;
            state.isSubmitting = false;
            state.isLoading = false;
            state.error = action.payload || null;
            state.isRetrying = false;
        },
        retrying: (state) => {
            state.isRetrying = true;
        },
    },
});

export const { loading, success, error, retrying } = uiSlice.actions;
export default uiSlice.reducer;
