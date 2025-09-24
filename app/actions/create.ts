
'use server'

import { revalidatePath } from "next/cache"
import { CreateTodo } from "../lib/todos"
import { redirect } from "next/navigation"

export async function CreateTodoAction(formData:FormData){
    const title = formData.get('title') as string 
    const priority = formData.get('priority') as 'low' | 'medium' | 'high' || 'low'
    if(!title||title.trim().length===0){
        console.error('Title Required')
        return
    }
    if(title.length>100){
        console.error("Title is Too Long")
        return
    }

    const todoID= await CreateTodo({title: title.trim(), priority}, priority)
    if(!todoID){
        console.error('failed to create todo')
        return

    }

    revalidatePath('/')
    redirect('/')



}