import { Request,Response,NextFunction } from "express";
import admin from "firebase-admin"

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const authMiddleware =async(req:AuthRequest,res:Response,next:NextFunction)=>{

try {
  
    const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

const token = authHeader.split(" ")[1];

const decoded=await  admin.auth().verifyIdToken(token);

req.user=decoded;

next();

} catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
}


}