import {Router} from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { IUser, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';
const router = Router();

router.get('/', asyncHandler( async (req, res) => {
        const users = await UserModel.find();
        res.status(200).json({ users });
    }
))

router.post("/login", asyncHandler(
  async (req, res) => {
    const {email, password} = req.body;
    await bcrypt.hash(password, 10);
    const user = await UserModel.findOne({email:email});
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

router.get('/:id/isAdmin',   asyncHandler(
    async (req, res) => {
        const user = await UserModel.findById(req.params.id);
        if(user){
            res.send(user.isAdmin);
        }
        else res.send(HTTP_BAD_REQUEST);
    })
)
const generateTokenResponse = (user : IUser) => {
    const token = jwt.sign({
      id: user.id, email:user.email, isAdmin: user.isAdmin
    },"pass123",{
      expiresIn:"30d"
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: token
    };
  }


  export default router;