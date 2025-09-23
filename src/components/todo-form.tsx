"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { addTodoAction, getAllTodo } from "@/redux/actions"
import { Loader2 } from "lucide-react"

export function TodoForm() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const dispatch = useAppDispatch()
    const { isSubmitting } = useAppSelector((state) => state.ui)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return

        await dispatch(addTodoAction({ title, description }))
        await dispatch(getAllTodo({}))
        setTitle("")
        setDescription("")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Todo</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Todo title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isSubmitting}
                    />
                    <Textarea
                        placeholder="Description (optional)..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isSubmitting}
                    />
                    <Button type="submit" disabled={isSubmitting || !title.trim()}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Todo
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
