import { mongoose } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

/* eslint-disable no-unused-vars */

// -> /api/v1/auth/sign-up --> POST BODY --> {name, email, password} --> CREATES A NEW USER
export const signUp = async (req, res,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const { name, email, password } = req.body;
        // check if user already exists
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword,
        }],{
            session,
        });

        const token = jwt.sign({
            userId:newUsers[0]._id
        },
        JWT_SECRET,{
            expiresIn: JWT_EXPIRES_IN
        })





        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: {
                token,
                user: newUsers[0],
            },
        });

    }catch (error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

// -> /api/v1/auth/sign-in --> POST BODY --> {email, password} --> VALIDATE AND CHECK-IN USER
export const signIn = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        // console.log('Full user object:', JSON.stringify(user));
        //
        // console.log('User found:', user);
        // console.log('Password from request:', password);
        // console.log('Password from database:', user.password);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({userId: user._id,}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: "User Sign in successfully",
            data: {
                token,
                user,
            }
        })
    }catch (error) {
        next(error);
    }
}


export const signOut = async (req, res,next) => {}
