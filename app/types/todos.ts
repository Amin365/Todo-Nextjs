export type Todo={
    _id:String;
    title:String;
    completed:boolean;
    createdAt:String;
    updatedAt:String


}

export type CreateTodoInput={
    title:String;
        completed?:boolean;
}


export type UpdatedTodoInpu={
    title?:String;
    completed?:boolean
}