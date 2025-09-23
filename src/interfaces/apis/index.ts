export interface Response<T> {
    error: boolean;
    message: string;
    data: T;
}

export interface Todo {
    title: string;
    description?: string;
}
