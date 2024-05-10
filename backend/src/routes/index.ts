import {  Router  } from 'express';
import userRoute from './usre-routes.js';
import chatRoutes from './chats-routes.js';

const appRouter = Router();

appRouter.use("/user", userRoute); // domain/api/v1/user
appRouter.use("/chats", chatRoutes); // domain/api/v1/chats
export default appRouter;