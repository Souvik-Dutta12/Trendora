import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) =>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    }catch(err){
        throw new ApiError(500,"Something went wrong while generating refresh and acccess token")
    }
}
const registerUser = asyncHandler( async (req, res) =>{
    const {name, email, password, address, phone} = req.body;

    if( [name, email, password, phone].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(400, "User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        address,
        phone
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(400, "User not found");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
})

const loginUser = asyncHandler( async (req, res)=>{
    const {email, password} = req.body;

    if([email,password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne(email);

    if(!user){
        throw new ApiError(400, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid credentials");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const userData = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("refreshToken",refreshToken,options)
    .cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(200, {userData,accessToken,refreshToken}, "User logged in successfully")
    )

})
const refreshAccessToken = asyncHandler( async (req, res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401,"Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)


        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken},
                "Access token refreshed"
            )
        )
    
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})
const getUserProfile = asyncHandler( async (req,res)=>{
    const user = await User.findById(req.user._id).select("-password -refreshToken");

    if(!user){
        throw new ApiError(400, "User not found")
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User profile fetched successfully")
    )
})

const updateUserProfile = asyncHandler( async (req,res)=>{
    const {newName,newEmail,newPhone,newAddress} = req.body;

    if( !newName && !newEmail && !newPhone && !newAddress){
        throw new ApiError(400, "Atleast one field is required")
    }

    const user = await User.findById(req.user._id)

    if(newName) user.name = newName;
    if(newEmail) user.email = newEmail;
    if(newPhone) user.phone = newPhone;
    if(newAddress) user.address = newAddress;

    await user.save({validateBeforeSave: false})

    return res.status(200).json(
        new ApiResponse(200, user, "User profile updated succesfully")
    )
})

const deleteUserProfile = asyncHandler( async (req,res)=>{
    const user = await User.findByIdAndDelete(req.user._id).select("-password -refreshToken");
    if(!user){
        throw new ApiError(400,"User not found")
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User profile deleted sucessfully")
    )
})

const logoutUser = asyncHandler( async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1
            }
        },
        {new: true}
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out successfully")
    )
})

const changePassword = asyncHandler( async (req,res)=>{
    const {oldPassword, newPassword} = req.body;

    if(!oldPassword || !newPassword){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid Password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res.status(200).json(
        new ApiResponse(200, {}, "Password Changed Successfully")
    )
})

