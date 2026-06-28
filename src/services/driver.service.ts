import { db } from "../config/firebase.js";
import admin from "firebase-admin";

export const becomeDriverService = async (uid: string, data: any) => {
  const driverRef = db.collection("drivers").doc(uid);
  const driverDoc = await driverRef.get();

  if (driverDoc.exists) {
    throw new Error("Driver already exists");
  }

  await driverRef.set({
    uid,
    vehicle: {
      model: data.vehicleModel,
      plateNumber: data.plateNumber,
    },
    licenseNumber: data.licenseNumber,
    isOnline: false,
    isAvailable: false,
    currentRideId: null,
    location: {
      lat: 0,
      lng: 0,
    },
    rating: 0,
    totalTrips: 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await db.collection("users").doc(uid).update({
    role: "DRIVER",
  });

  return { message: "Driver registered successfully" };
};
export const toggleDriverStatusService = async (uid: string, isOnline: boolean) => {
  await db.collection("drivers").doc(uid).update({
    isOnline,
    isAvailable: isOnline,
  });

  return { message: "Status updated" };
};
export const updateLocationService = async (
  uid: string,
  lat: number,
  lng: number
) => {
  await db.collection("drivers").doc(uid).update({
    location: { lat, lng },
  });

  return { message: "Location updated" };
};