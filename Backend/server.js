import 'dotenv/config';


import app from "./src/app.js";
import connectToDB from "./src/confiq/database.js";
connectToDB();

app.listen(3000, ()=>{
    console.log("Server is listening to 3000")
})