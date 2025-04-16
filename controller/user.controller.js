import User from "../models/user.model.js";

export const getUsers = async (req,res,next) => {
    try {
        const users = await User.find();
        // console.log('Users found:', users);
        res.status(200).json({status:"success",data:users});
    }catch (error) {
        next(error);
    }
}

export const getUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        // console.log('Full user object:', JSON.stringify(user));
        if (!user) {
           const error = new Error('User not found');
           error.status = 404;
           throw error;
        }
        res.status(200).json({status:"success",data:user});
    }catch (error) {
        next(error);
    }
}