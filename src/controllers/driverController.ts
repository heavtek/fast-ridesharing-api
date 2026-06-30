import { Request, Response } from "express";
import { becomeDriverService,toggleDriverStatusService,updateLocationService,requestRideService,findDriversService,acceptRideService
  ,startTripService
} from "../services/driver.service.js";

export const becomeDriver = async (req: any, res: Response) => {
  try {
    const uid = req.user.uid;

    const result = await becomeDriverService(uid, req.body);

    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
export const toggleDriverStatus = async (req: any, res: Response) => {
  const uid = req.user.uid;
  const { isOnline } = req.body;

  const result = await toggleDriverStatusService(uid, isOnline);

  res.json(result);
};
export const updateLocation = async (req: any, res: Response) => {
  const uid = req.user.uid;
  const { lat, lng } = req.body;

  const result = await updateLocationService(uid, lat, lng);

  res.json(result);
};
export const requestRide = async (req: any, res: Response) => {
  const uid = req.user.uid;

  const ride = await requestRideService(uid, req.body);

  res.json(ride);
};
export const findDrivers = async (_req: any, res: Response) => {
  const drivers = await findDriversService();

  res.json(drivers);
};
export const acceptRide = async (req: any, res: Response) => {
  const driverId = req.user.uid;
  const { rideId } = req.body;

  const result = await acceptRideService(driverId, rideId);

  res.json(result);
};
export const startTrip=async(req:any,res:Response)=>{

const driverId=req.user.uid;

const {rideId}=req.body;

const result=await startTripService(driverId,rideId);

res.json(result);

}
