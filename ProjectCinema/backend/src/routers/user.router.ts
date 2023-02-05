import {Router} from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { IUser, UserModel } from '../models/user.model';
import {HTTP_BAD_REQUEST, HTTP_SUCCESS_REQUEST} from '../constants/http_status';
import bcrypt from 'bcryptjs';
const router = Router();

router.get('/', asyncHandler( async (req, res) => {
        const users = await UserModel.find();
        res.status(200).json({ users });
    }
))

router.post("/login", asyncHandler(
  async (req, res) => {
    const {name, password} = req.body;
    await bcrypt.hash(password, 10);
    const user = await UserModel.findOne({name:name});
     if(user) {
         const checkPassword = await bcrypt.compare(password,user.password)
         if(checkPassword){
             res.send(generateTokenResponse(user));
         }
     }
     else{
       res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
     }
  }
))

router.post('/register', async (req, res) => {
    try {
        const {name, password, isEventer} = req.body;
        const user = await UserModel.findOne({name});
        if (user) {
            res.status(HTTP_BAD_REQUEST)
                .send('User already exist, please login!');
        }
        else{
            const encryptedPassword = await bcrypt.hash(password, 10);
            const newUser:IUser = {
                name: name.toLowerCase(),
                password: encryptedPassword,
                isEventer:isEventer,
                isAdmin: false,
            }
            const dbUser = await UserModel.create(newUser);
            res.status(HTTP_SUCCESS_REQUEST).send(generateTokenResponse(dbUser));
        }
    } catch (error) {
        res.status(HTTP_BAD_REQUEST).send(error);
    }
})

const generateTokenResponse = (user : IUser) => {
    const token = jwt.sign({
      id: user._id, name:user.name, isAdmin: user.isAdmin, isEventer: user.isEventer,
    },"pass123",{
      expiresIn:"30d"
    });

    return {
      id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: token
    };
  }


  export default router;