import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";


const protect = asyncHandler( async (req, res, next) => {
    // console.log('hitted protect middleware'); 

    const token = req.headers.authorization;

    // console.log('token : ', token);
  
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log('invalid token found');
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }
    } else {
        console.log('token not found');
        res.status(401);
        throw new Error('Not authorized, no token'); 
    }
})


export { protect }