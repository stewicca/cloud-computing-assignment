"use client";

import { useEffect } from "react";
import { authService } from "@/apis";
import { useAppDispatch } from "@/hooks";
import { setUser } from "@/redux/slices/authSlice";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = authService.listenAuthState(user => {
            dispatch(setUser(user));
        })

        return () => unsubscribe();
    }, [dispatch]);

    return <>{children}</>;
}
