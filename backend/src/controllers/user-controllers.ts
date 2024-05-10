import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { hash, compare } from "bcrypt"; // used to encrypt the password before storing it into the database -- use to encrpt any string
import { createToken } from "../utils/tokenManager.js";
import { COOKIE_NAME } from "../utils/constant.js";
export const getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // get all user from db
    try {
        const users = await User.find(); // find all record in the data base in this modal
        return res.status(200).json({ message: "OK", users });
    } catch (error) {
        console.log(error);

        return res.status(401).json({ message: "ERROR", cause: error.message });
    }
};

export const userSignUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // get all user from db
    try {
        // user signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            const hasedPassword = await hash(password, 10);
            const user = new User({ name, email, password: hasedPassword });
            user.save(); // save the record in the db

            // create token and store cookie
            res.clearCookie(COOKIE_NAME, {   // ot will clear the cookie of the response of the user
                httpOnly: true,
                domain: "localhost",
                signed: true,
                path: "/"
            });

            const token = createToken((user._id).toString(), user.email, "7d");
            const expires = new Date();  //(Date.now() + 7*24*60*60*1000).getTime()/1000)
            expires.setDate(expires.getDate() + 7);
            res.cookie(COOKIE_NAME, token, {
                path: "/",
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true, // will again encrpt the cookieunder the signed format, with a secret key and store it on browser side
            }).send(token);

            return res.status(201).json({ message: "OK", name: user.name, email: user.email });
        }
        return res.status(409).json({ message: "CONFLICT", cause: "Email already exists." });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignIn = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).send("User does not exist");
        }
        const isValidPass = await compare(password, user.password);
        if (!isValidPass) {
            return res.status(403).send('Invalid Password');
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });// will again encrpt the cookieunder the signed format, with a secret key and store it on browser side
        return res.status(201).json({ message: "Login Successful", name: user.name, email: user.email })
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "ERROR", cause: error.message });
    }
}

export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(res.locals.jwtData.email);
        if (!user) {
            return res.status(401).send("User not registered");
        }
        
        if(user._id.toString()!==res.locals.jwtData.id){
            return res.status(401).send("Not Authorized")
        }
     return res.status(200 ).json({ message: "Login Successful", name: user.name, email: user.email })
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "ERROR", cause: error.message });
}
}