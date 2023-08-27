import { connect } from "mongoose";

export const conn = async () => {
    try{
        await connect(`mongodb://127.0.0.1:27017/forum`);
        console.log(`Connected to Database`);
    }catch(err){
        console.error(`Error: ${err}`);
    }
};