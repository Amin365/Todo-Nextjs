export type Todo={
    _id:String;
    title:String;
    completed:boolean;
    createdAt:String;
    updatedAt:String
       priority?: 'low' | 'medium' | 'high';


}

export type CreateTodoInput={
    title:String;
    priority?: 'low' | 'medium' | 'high';
        completed?:boolean;
}


export type UpdatedTodoInpu={
    title?:String;
    completed?:boolean
       priority?: 'low' | 'medium' | 'high';
}