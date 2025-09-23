"use client";

import { useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import {Loader2} from "lucide-react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [loading, user, router]);

    if (loading) return (
        <div className="flex items-center justify-center py-2">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
    );

    return <>{children}</>;
}
