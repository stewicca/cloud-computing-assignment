"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/hooks"
import { logoutAction } from "@/redux/actions"
import { useRouter } from "next/navigation"

export function Navbar() {
    const { user } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleLogout = () => {
        dispatch(logoutAction({}));
        router.push("/login")
    }

    if (!user) return null

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Todo App</h1>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email!.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <div className="flex items-center justify-start gap-2 p-2">
                            <div className="flex flex-col space-y-1 leading-none">
                                {user.displayName && <p className="font-medium">{user.displayName}</p>}
                                <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}
