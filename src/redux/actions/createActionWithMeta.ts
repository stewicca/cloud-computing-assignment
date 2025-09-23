import { RootState } from "@/redux/store";
import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";

type CreateActionWithMetaOptions = {
    conditionKey?: keyof RootState["ui"]; // safer typing
    metaType?: string;
};

const createActionWithMeta = <Returned, ThunkArg>(
    typePrefix: string,
    asyncFunction: AsyncThunkPayloadCreator<Returned, ThunkArg, { state: RootState }>,
    { conditionKey, metaType }: CreateActionWithMetaOptions = {}
) =>
    createAsyncThunk<Returned, ThunkArg, { state: RootState }>(
        typePrefix,
        asyncFunction,
        {
            condition: (_, { getState }) => {
                if (!conditionKey) return true;
                const { ui } = getState();
                return !ui[conditionKey]; // now type-safe
            },
            getPendingMeta: () => (metaType ? { type: metaType } : {}),
        }
    );

export default createActionWithMeta;
