import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'; 
/**
 * @name POST registerUserController
 * @description Register new user
 * @access PUBLIC
 */

import userModel from "../models/user.model.js";
import tokenBlacklistModel from "../models/blacklist.model.js";

export const registerUserController = async (req,res) =>{
    try{

        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                message: "Please provide username, email, and password"
            })
        }

        const isExistingUser = await userModel.findOne({$or: [{email} , {username}]})
        if(isExistingUser){
            return res.status(400).json({
                message: "User Already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({username,email,password: hashPassword});

        const token = jwt.sign({id: user._id , username: user.username}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.cookie("token", token);


        res.status(201).json({message: "User registered succesfully", token})
    }catch(err){
        res.send(404).json({message: err})
    }
}

/**
 * @name POST loginUserController
 * @description Login user
 * @access PUBLIC
 */

export const loginUserController = async (req,res) => {
    const {email, password} = req.body;

    const loginuser = await userModel.findOne({email});
    if(!loginuser){
        return res.status(404).json({message: "Email doesn't exist"})
    }

    const isPasswordCorrect = await bcrypt.compare(password,loginuser.password);
    if(!isPasswordCorrect){
        return res.status(200).json({message: "Wrong Password"});
    }

    const token = jwt.sign({id: loginuser._id , username: loginuser.username}, process.env.JWT_SECRET, {expiresIn: "1d"})
    res.cookie("token", token);
    res.status(200).json({message: "Log In succesful",user: {
        id: loginuser._id,
        username: loginuser.username,
        email: loginuser.email
    }})
}

/**
 * @name GET logoutUserController
 * @description logout user by clearing token and adding into blacklist
 * @access PUBLIC
 */

export const logoutUserController = async (req,res) => {
    console.log(req.cookies)
    const token = req.cookies.token;
    if(token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name GET getMeController
 * @description get user details if exists
 * @access PRIVATE
 */

export const getMeController = async (req,res) =>{
    const user = await userModel.findById(req.user.id);
    console.log(user);
    res.status(200).json({
        message: "User details succesfully fetced",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}