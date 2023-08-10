import { User } from "../models/user.controllers.js";
import * as bcrypt from "bcrypt";

export const userControllers = {
    create: async (req, res) => {
        const {name, lastname, username, password} = req.body;
        try{
            const hash = await bcrypt.hash(password, 10);
            const newUser = {
                name,
                lastname,
                username,
                password: hash
            };
            await User.create(newUser);
            res.status(201).json({
                ok: true,
                data: newUser
            });
        }catch (error){
            throw new Error;
        };
    }
};