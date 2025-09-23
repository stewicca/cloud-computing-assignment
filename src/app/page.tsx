import { TodoForm, TodoList, ProtectedRoute, LoadingIndicator, Navbar } from "@/components";

export default function HomePage() {
    return (
        <ProtectedRoute>
            <Navbar />
            <div className="container mx-auto py-8 px-4 max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">Todo App</h1>
                </div>

                <div className="space-y-6">
                    <LoadingIndicator />
                    <TodoForm />
                    <TodoList />
                </div>
            </div>
        </ProtectedRoute>
    )
}
