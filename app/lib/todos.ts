

import {ObjectId} from "mongodb"
 import {CreateTodoInput,Todo,UpdatedTodoInpu} from "../types/todos"


import {getCollection} from "./db"

export async function fetchtodos():Promise<Todo[]>{
    try {
        const collection = await getCollection();
        const todos = await collection.find({}).toArray();
        return todos.map(todos=>({
            _id:todos._id.toString(),
            title:todos.title,
            completed:todos.completed,
            createdAt:todos.createdAt?.toISOString(),
            updatedAt:todos.updatedAt?.toISOString()
        }))
    }
    catch (error) {
        throw new Error("Failed to fetch todos")
        return []
    }
}
     

export async function FetchbyID(id: String): Promise<Todo | null> {
    try {
        const collection = await getCollection();
        const todo = await collection.findOne({ _id: new ObjectId(id as string) });
        if (!todo) return null;
        return {
            _id: todo._id.toString(),
            title: todo.title,
            completed: todo.completed,
            createdAt: todo.createdAt?.toISOString(),
            updatedAt: todo.updatedAt?.toISOString()
        };
    } catch (error) {
        return null;
    }
}


export async function CreateTodo(Todo:CreateTodoInput):Promise<string>{
    try {
        
        const collection =await getCollection()
        const result =await collection.insertOne(Todo)
        return result.insertedId.toString()
    } catch (error) {
        return ""
    }
}

export async function updateTodo(id:String,Todo:UpdatedTodoInpu):Promise<boolean>{
    try {
        const collection =await getCollection()
        const result =await collection.updateOne({_id:new ObjectId(id as string)},{$set:Todo})
        return result.modifiedCount > 0
    } catch (error) {
        return false
    }
}

export async function deleteTodo(id:string):Promise<boolean>{
    try {
        
        const collection =await getCollection()
        const result =await collection.deleteOne({_id:new ObjectId(id as string)})
        return  result.deletedCount>0
    } catch (error) {
        return false
    }
}