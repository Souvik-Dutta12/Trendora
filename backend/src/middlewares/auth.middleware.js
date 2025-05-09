import { User } from "../models/user.model";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler( async (req, _, next)=>{
    try {
        const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            throw new ApiError(401, "You are not authorized to access this resource")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401, "You are not authorized to access this resource");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
}) 