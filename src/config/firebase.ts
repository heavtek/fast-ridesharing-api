import admin from "firebase-admin"
import { readFileSync } from "node:fs"


const serviceAccount=JSON.parse(  readFileSync("./firebase-service-account.json", "utf8"));

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});
export const db=admin.firestore();