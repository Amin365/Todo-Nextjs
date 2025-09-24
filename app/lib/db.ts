
import {MongoClient,Db,Collection} from 'mongodb';

const url = process.env.mongodb_url

if(!url){
    throw new Error("MongoDB URL is not defined in environment variables");
}

let client:MongoClient;
let db:Db;

export async function connecttoDatabase(){
    if(!client){
        client = new MongoClient(url as string);
        await client.connect();
        db = client.db("Todo_app");
    }
    return {client,db};
}

export async function getCollection():Promise<Collection>{
    if(!db){
        const{db: database} = await connecttoDatabase();
        return database.collection("todos");
    }
    return db.collection("todos");
}
