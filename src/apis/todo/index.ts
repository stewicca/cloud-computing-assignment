import { db } from "../../../firebase.config";
import { Response, Todo } from "@/interfaces";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "@firebase/firestore";

export const todoService = {
    add: async (todo: Todo): Promise<Response<null>> => {
        await addDoc(collection(db, "todos"), todo);

        return {
            error: false,
            message: "Todo added",
            data: null,
        };
    },

    getAll: async (): Promise<Response<(Todo & { id: string })[]>> => {
        const snapshot = await getDocs(collection(db, "todos"));
        const todos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as (Todo & { id: string })[];

        return {
            error: false,
            message: "Todos fetched",
            data: todos,
        };
    },

    getOne: async (id: string): Promise<Response<Todo | null>> => {
        const docRef = doc(db, "todos", id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
            return {
                error: true,
                message: "Todo not found",
                data: null,
            };
        }

        return {
            error: false,
            message: "Todo fetched",
            data: snapshot.data() as Todo,
        };
    },

    update: async (id: string, updates: Partial<Todo>): Promise<Response<null>> => {
        const docRef = doc(db, "todos", id);
        await updateDoc(docRef, updates);

        return {
            error: false,
            message: "Todo updated",
            data: null,
        };
    },

    remove: async (id: string): Promise<Response<null>> => {
        const docRef = doc(db, "todos", id);
        await deleteDoc(docRef);

        return {
            error: false,
            message: "Todo deleted",
            data: null,
        };
    },
};
