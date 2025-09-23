import { Response } from "@/interfaces";
import { Middleware } from "@reduxjs/toolkit";
import { error, loading, success } from "@/redux/slices/uiSlice";

type AsyncActionMeta = {
    type?: "fetching" | "submitting";
};

type AsyncAction = {
    type: string;
    meta?: AsyncActionMeta;
    payload: Response<unknown>;
};

const asyncActionMiddleware: Middleware = ({ dispatch }) => next => action => {
    if (typeof action !== "object" || action === null || !("type" in action)) {
        return next(action);
    }

    const { type, meta, payload } = action as AsyncAction;
    const actionType = meta?.type || "fetching";

    switch (true) {
        case type.endsWith("/pending"):
            dispatch(loading({ type: actionType }));
            break;
        case type.endsWith("/fulfilled"):
            dispatch(success());
            break;
        case type.endsWith("/rejected"):
            dispatch(error(payload.message));
            break;
    }

    return next(action);
};

export default asyncActionMiddleware;
