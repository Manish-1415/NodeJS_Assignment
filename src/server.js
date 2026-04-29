import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({path : "./.env"});

import connectServerWithDB from "./DB/connectDB.js";


const port = process.env.PORT || 8080;


connectServerWithDB()
.then( () => {
    app.listen(port, () => console.log(`Server is Listening on Port : ${port}`));
} )
.catch( (error) => {
    console.log(error);
} )
