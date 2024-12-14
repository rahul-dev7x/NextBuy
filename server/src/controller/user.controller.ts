import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs"
import sendEmail from "../config/sendEmail";
import verifyEmailTemplate from "../utills/verifyEmailTemplate";





const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please Provide Email,Name,Password",
                success: false,
                error: true
            })
        }
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exixts with this email", error: true, success: false });

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ email, name, password: hashedPassword });
        const save = await newUser.save();

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`


        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify Email from Next Buy",
            html: verifyEmailTemplate({ name, url: verifyEmailUrl })
        });

        return res.status(201).json({
            message: "User register successfully",
            error: false,
            success: true,
            data: save
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "There Is something Error", error: true, success: false })
    }
}


const verifyEmailController = async (req: Request, res: Response) => {
    try {
        const { code } = req.body;
        const user = await UserModel.findOne({ _id: code });
        if (!user) {
            return res.status(400).json({ message: "Invalid User", error: true, success: false })
        }
        const updateUser = await UserModel.updateOne({ _id: code }, { verify_email: true });
        return res.json({
            message: "Verify email done",
            success: true,
            error: false
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error while vcerifying email", error: true, success: false })
    }
}



export { registerUser ,verifyEmailController};