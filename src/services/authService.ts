import admin from "firebase-admin"
import { db } from "../config/firebase.js"

export const createProfile=async(uid:string,name:string,email:string,
    phone:string
)=>{

    const userRef=db.collection("users").doc(uid);

    const userDoc=await  userRef.get();

    if(userDoc.exists){
        return userDoc.data();
    }

const user={
    uid,
    email,phone,name,
    role:"PASSENGER",
    createdAt:admin.firestore.FieldValue.serverTimestamp(),
};

await userRef.set(user);
  return user;

}