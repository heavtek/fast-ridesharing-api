import express from "express"

import { db } from "./config/firebase.js";
import dotenv from "dotenv";
async function testFireBase() {
    const collections=await db.listCollections();
    console.log("firebase connected")
    console.log(collections);
    
}
testFireBase();
dotenv.config();
const app=express();

app.use(express.json());

const PORT=5000;

app.listen(PORT,()=>{
    console.log(`server start running at port ${PORT}`)
});