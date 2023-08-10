import { connect } from "mongoose";

export const conn = async () => {
    try{
        await connect(`mongodb://mongodb:27017/forum`);
        console.log(`Connected to Database`);
    }catch(err){
        console.error(`Error: ${err}`);
    }
};