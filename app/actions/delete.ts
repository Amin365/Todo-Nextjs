"use server"

import { revalidatePath } from "next/cache";
import { deleteTodo as deleteTodoFromDb } from "../lib/todos"

export async function DeleteTodo(id: string) {
    if (!id) {
        console.error('id is required');
        return;
    }
    const success = await deleteTodoFromDb(id);
    if (!success) {
        console.error('failed to delete todo');
        return;
    }

    revalidatePath('/')
}


