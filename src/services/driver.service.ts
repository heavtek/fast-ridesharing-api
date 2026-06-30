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
export const requestRideService = async (uid: string, data: any) => {
  const rideRef = db.collection("rides").doc();

  const ride = {
    rideId: rideRef.id,
    passengerId: uid,
    pickup: data.pickup,
    destination: data.destination,
    status: "REQUESTED",
    driverId: null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await rideRef.set(ride);

  return ride;
};
export const findDriversService = async () => {
  const snapshot = await db
    .collection("drivers")
    .where("isOnline", "==", true)
    .where("isAvailable", "==", true)
    .get();

  const drivers: any[] = [];

  snapshot.forEach((doc) => {
    drivers.push(doc.data());
  });

  return drivers;
};
export const acceptRideService = async (
  driverId: string,
  rideId: string
) => {
  const rideRef = db.collection("rides").doc(rideId);
  const rideDoc = await rideRef.get();

  if (!rideDoc.exists) {
    throw new Error("Ride not found");
  }

  const ride = rideDoc.data();

  if (ride?.status !== "REQUESTED") {
    throw new Error("Ride already taken");
  }

  await rideRef.update({
    driverId,
    status: "ACCEPTED",
  });

  await db.collection("drivers").doc(driverId).update({
    isAvailable: false,
    currentRideId: rideId,
  });

  return { message: "Ride accepted" };
};

//Start Trip
export const startTripService = async (
    driverId:string,
    rideId:string
)=>{
    const rideRef=db.collection("rides").doc(rideId);

    const rideDoc=await rideRef.get();

    if(!rideDoc.exists){
        throw new Error("Ride not found");
    }

    const ride=rideDoc.data();

    if(ride?.driverId!==driverId){
        throw new Error("Unauthorized");
    }

    if(ride?.status!=="ACCEPTED"){
        throw new Error("Ride cannot be started");
    }

    await rideRef.update({
        status:"ONGOING",
        startedAt:admin.firestore.FieldValue.serverTimestamp()
    });

    return{
        message:"Trip Started"
    }

}
export const finishTripService=async(

driverId:string,

rideId:string,

fare:number

)=>{

const rideRef=db.collection("rides").doc(rideId);

const rideDoc=await rideRef.get();

if(!rideDoc.exists){

throw new Error("Ride not found");

}

const ride=rideDoc.data();

if(ride?.driverId!==driverId){

throw new Error("Unauthorized");

}

await rideRef.update({

status:"COMPLETED",

fare,

completedAt:admin.firestore.FieldValue.serverTimestamp()

});

await db.collection("drivers").doc(driverId).update({

currentRideId:null,

isAvailable:true,

totalTrips:admin.firestore.FieldValue.increment(1)

});

return{

message:"Ride Completed"

};

}
