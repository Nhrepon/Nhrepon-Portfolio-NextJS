import mongoose from "mongoose";

export async function connectDatabase() {
    try {
        const url = process.env.DATABASE_URL!;
        await mongoose.connect(url);
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("Database connected successfully")
        });
        connection.on("error", (err)=>{
            console.log("Database connection failed " + err)
            process.exit();
        });
        
    } catch (error: any) {
        console.log("Something went wrong in database connection")
        console.log(error)
    }
}

export async function disconnectDatabase() {
    await mongoose.disconnect()
    process.exit();
}






// // Database connection
// const mongoose = require("mongoose");
// // const url = "mongodb://localhost:27017/NeuralQuotes";
// // const option = { user: "", pass: "", autoIndex: true };

// const url="mongodb+srv://Repon:<password>@cluster0.nhslprh.mongodb.net/NeuralQuotes";
// const option={user:"Repon", pass:"Repon7248", autoIndex:true};

// mongoose.connect(url, option).then((res) => {
//     console.log("Database connected successful ... ");
// }).catch((error) => {
//     console.log(error);
// });
