import {connect, disconnect} from 'mongoose'

async function connectToDatabase(){
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch(error){
        console.log(error);    
        throw new Error("Failed to connect to the database");
    }
}    //function from which we want to connect to mongodb database

async function dissconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);        
        throw new Error("Failed to close connection to the database")
    }
}

export {connectToDatabase, dissconnectFromDatabase};
