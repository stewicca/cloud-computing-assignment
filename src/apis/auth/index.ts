import { Response } from "@/interfaces";
import { auth } from "../../../firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, User } from "firebase/auth";

export const authService = {
    register: async ({ email, password, displayName }: { email: string, password: string, displayName?: string }): Promise<Response<User | null>> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            if (displayName) {
                await updateProfile(userCredential.user, { displayName });
            }

            return {
                error: false,
                message: "User registered successfully",
                data: userCredential.user,
            };
        } catch (err: any) {
            return {
                error: true,
                message: err.message,
                data: null,
            };
        }
    },

    login: async ({ email, password }: { email: string, password: string }): Promise<Response<User | null>> => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            return {
                error: false,
                message: "User logged in",
                data: userCredential.user,
            };
        } catch (err: any) {
            return {
                error: true,
                message: err.message,
                data: null,
            };
        }
    },

    logout: async (): Promise<Response<null>> => {
        try {
            await signOut(auth);
            return {
                error: false,
                message: "User logged out",
                data: null,
            };
        } catch (err: any) {
            return {
                error: true,
                message: err.message,
                data: null,
            };
        }
    },

    listenAuthState: (callback: (user: User | null) => void) => {
        return onAuthStateChanged(auth, callback);
    },
};
