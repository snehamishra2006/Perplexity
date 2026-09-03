import mongoose from "mongoose"

function connectToDb(){
   return mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to db");
    })
}

export default connectToDb