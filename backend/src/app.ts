import  express  from "express";
import {config} from 'dotenv';  // use dotenv to read environment variables into our application; 
import morgan from 'morgan'    // it will give the log description what type of request was made , what was the response and status code
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

config();  // this will search for a .env and help running mongodb database safely
const app = express();

//middlewares
app.use(cors({origin:'http://localhost:5173', credentials: true}));   // enable CORS (Cross Origin Resource Sharing) so that requests can be made across different domains -- we need to provide the credentials because we are sharing the security attributes like http only cookies
app.use(express.json()) // to read the data  sent byclient in post request in JSON format -- // parse incoming requests with JSON payloads
app.use(cookieParser(process.env.COOKIE_SECRET)) // used to pass the cookie form backend to frontend
app.use(morgan("dev"));   // log every HTTP request on console with color (only in development)
app.use("/api/v1", appRouter)

export default app;