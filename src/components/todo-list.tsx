"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { getAllTodo, removeTodo, updateTodo } from "@/redux/actions"
import { Loader2, Trash2, Edit, Save, X } from "lucide-react"
import {Todo} from "@/interfaces";

export function TodoList() {
    const dispatch = useAppDispatch()
    const { todos } = useAppSelector((state) => state.todo)
    const { isFetching, isSubmitting } = useAppSelector((state) => state.ui)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editTitle, setEditTitle] = useState("")
    const [editDescription, setEditDescription] = useState("")

    useEffect(() => {
        dispatch(getAllTodo({}))
    }, [dispatch])

    const handleDelete = (id: string) => {
        dispatch(removeTodo(id))
        dispatch(getAllTodo({}))
    }

    const handleEdit = (todo: Todo & { id: string }) => {
        setEditingId(todo.id)
        setEditTitle(todo.title)
        setEditDescription(todo.description || "")
    }

    const handleSave = (id: string) => {
        dispatch(
            updateTodo({
                id,
                title: editTitle,
                description: editDescription,
            }),
        )
        dispatch(getAllTodo({}))
        setEditingId(null)
        setEditTitle("")
        setEditDescription("")
    }

    const handleCancel = () => {
        setEditingId(null)
        setEditTitle("")
        setEditDescription("")
    }

    if (isFetching && !todos) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Loading todos...
                </CardContent>
            </Card>
        )
    }

    if (!todos || todos.length === 0) {
        return (
            <Card>
                <CardContent className="text-center py-8 text-muted-foreground">No todos yet. Add one above!</CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {todos.map((todo) => (
                <Card key={todo.id}>
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                            {editingId === todo.id ? (
                                <div className="flex-1 space-y-2 mr-4">
                                    <Input
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        placeholder="Todo title"
                                        className="font-semibold"
                                    />
                                    <Textarea
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        placeholder="Description (optional)"
                                        rows={2}
                                    />
                                </div>
                            ) : (
                                <CardTitle className="text-lg">{todo.title}</CardTitle>
                            )}

                            <div className="flex gap-2">
                                {editingId === todo.id ? (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleSave(todo.id)}
                                            disabled={isSubmitting || !editTitle.trim()}
                                        >
                                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={handleCancel}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(todo)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(todo.id)} disabled={isSubmitting}>
                                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    {todo.description && editingId !== todo.id && (
                        <CardContent className="pt-0">
                            <p className="text-muted-foreground">{todo.description}</p>
                        </CardContent>
                    )}
                </Card>
            ))}
        </div>
    )
}
