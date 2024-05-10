import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constant.js";
import { log } from "console";

export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }); // there is key required inside the hashing alogorithm -- so secret key is require to sign/encrypt a token - here we are using JWT_SECRET form .env file
    return token
}
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.signedCookies[`${COOKIE_NAME}`];
    if(!token || token.trim()===""){
        return res.status(401).json({message: "token not found"});
    }
    return new Promise<void>((resolve, reject) => {
        return jwt.verify(token || "", process.env.JWT_SECRET, (err, sucess) => // 
        {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: 'token expired' });
            }
            else {
                resolve();
                res.locals.jwtData = sucess /* form this middleware we can set some local variable from the response and then we can use them from the next middleware -
                 this is possible with the express, because we are setting the local variable form thos function and that we can use it inside nect middleware as well -- 
                 all the data should be inside the success */

                 return next(); // now we want to return to the next middleware

            }
        })
    })
}