import { Router } from "express";
import { getAllUser, userSignUp, userSignIn, verifyUser } from "../controllers/user-controllers.js";
import { signupValidator, validate,signinValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/tokenManager.js";
const userRoute = Router();

userRoute.get("/", getAllUser)
userRoute.post( "/signup" ,validate(signupValidator), userSignUp)
userRoute.post('/signin',validate(signinValidator), userSignIn)
userRoute.get('/auth-status',verifyToken, verifyUser);  // to check if the token is valid or not
export default userRoute;
