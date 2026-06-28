import admin from "firebase-admin"
import { db } from "../config/firebase.js"

export const createProfile = async (
  uid: string,
  name: string,
  phone: string,
  gender: string
) => {
  const userRef = db.collection("users").doc(uid);

  const userDoc = await userRef.get();

  if (userDoc.exists) {
    return userDoc.data();
  }

  const user = {
    uid,
    name,
    phone,
    gender,
    role: "PASSENGER",
    walletBalance: 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await userRef.set(user);

  return user;
};