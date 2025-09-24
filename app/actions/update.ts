
'use server'

import { revalidatePath } from "next/cache"
import { FetchbyID, updateTodo } from "../lib/todos"
import { redirect } from "next/navigation"


export async function UpdateTodoAction(formData:FormData){
    const id=formData.get('id') as string
    const title =formData.get('title') as string

    if(!id){
        console.error("ID is required")
        return
    }

    if(!title||title.trim().length===0){
        console.error("Title is required")
        return
    }

    const existingTodo=FetchbyID(id)

    if(!existingTodo){
        console.error('Todo not Found')
        return

    }

    if(title.length>100){
        console.error('Title is too long')
        return
    }

    const sucess=await updateTodo(id,{title:title.trim()})

    if(!sucess){
        console.error('Failed to Update Todo')
        return

    }

    revalidatePath('/')
    redirect('/')



}

