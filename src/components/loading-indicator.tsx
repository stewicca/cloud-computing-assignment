"use client"

import { useAppSelector } from "@/hooks"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"

export function LoadingIndicator() {
    const { isLoading, error } = useAppSelector((state) => state.ui)

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-2">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm text-muted-foreground">Processing...</span>
            </div>
        )
    }

    return null
}
