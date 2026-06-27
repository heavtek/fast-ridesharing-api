import { Request,Response } from "express";
import {createProfile} from "../services/authService.js"
import { AuthRequest } from "../middleware/authMiddleware.js";
export const syncProfile =async(req:AuthRequest,res:Response)=>{
    
try {
    const {name,phone}=req.body
    const user= await createProfile(
req.user!.uid,
    name,
    phone,
    req.user!.email!

    )
    res.status(201).json({
        success:true,
        data:user
    })
} catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
}
}
