import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { configureIpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message } = req.body
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not registered" });

        // grab chats of user
        // send all chats with the new one to openAI api
        // get latest response
        const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];
        chats.push({ content: message, role: "user" }); // storing new chats to static array -- to show on the page in the same session. (this array is just for the memory purpose)

        // now to store new chats to DB 
        user.chats.push({ content: message, role: 'user' });
        const config = configureIpenAI()
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: chats
        })
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
// export const retreiveChats = async(
//     req: Request,
//     res: Response,
//     next: NextFunction
// )=>{

// }