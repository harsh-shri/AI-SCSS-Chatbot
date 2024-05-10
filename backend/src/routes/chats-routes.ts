import { Router } from "express";
import {generateChatCompletion} from '../controllers/chats-controller.js';
import { verifyToken } from "../utils/tokenManager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
// Protected Api - only the authenticated user will be able to use it.
const chatRoutes = Router();
chatRoutes.post("/new",validate(chatCompletionValidator),verifyToken, generateChatCompletion); // Create a new Chat Completion
// chatRoutes.get("/chats",retreiveChats)
export default chatRoutes;
