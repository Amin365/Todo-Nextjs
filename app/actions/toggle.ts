"use server"


import { revalidatePath } from "next/cache";
import { FetchbyID, updateTodo } from "../lib/todos";



export async function ToggleTodo(id:String){
    const todo = await FetchbyID(id)
    if(!todo){
        return
    }

    const success= await updateTodo(id,{completed:!todo.completed})
    if(!success){
        console.error('failed to update todo')
        return 


    }  

    revalidatePath('/')
}

