import {Router} from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { IUser, UserModel } from '../models/user.model';
import {HTTP_BAD_REQUEST, HTTP_SUCCESS_REQUEST} from '../constants/http_status';
import bcrypt from 'bcryptjs';
const router = Router();


router.get('/', asyncHandler( async (req, res) => {
        const users = await UserModel.find();
        res.status(HTTP_SUCCESS_REQUEST).send( users );
    }
))

router.post("/login", asyncHandler(
  async (req, res) => {

    const {name, password} = req.body;
    await bcrypt.hash(password, 10);
    const user = await UserModel.findOne({name:name.toLowerCase()});
     if(user && user.verified) {
         const checkPassword = await bcrypt.compare(password,user.password)
         if(checkPassword){
             res.status(HTTP_SUCCESS_REQUEST).send(generateTokenResponse(user));
         }else {
             res.status(HTTP_BAD_REQUEST).send("Wrong Password");
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
            res.status(HTTP_BAD_REQUEST).send('User already exist, please login!');
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
      id: user.id, name:user.name, isAdmin: user.isAdmin, isEventer: user.isEventer, verified:user.verified,
    },"pass123",{
      expiresIn:"30d"
    });
    return {
      id: user.id,
      name: user.name,
      isEventer: user.isEventer,
      token: token
    };
  }
router.get('/:id/isAdmin',async (req, res) => {
        const user = await UserModel.findById(req.params.id)
        if(user){
            res.status(HTTP_SUCCESS_REQUEST).send(user.isAdmin);
        }
        else res.send(HTTP_BAD_REQUEST);
    }
)
async function verifyToken (token:string)  {
    try {
        const decoded = jwt.verify(token,"pass123" );//process.env.JWT_SECRET);
        if(!decoded){
            throw new Error("invalid Token");
        }
        const currentTime = Math.floor(Date.now() / 1000);
        // @ts-ignore
        const userId = decoded.id;
        const user = await UserModel.findById(userId);
        // @ts-ignore
        if (decoded.exp < currentTime) {
            throw new Error('Token expired');
        }
        // @ts-ignore
        if (user && (user.name !== decoded.name || user.isEventer !== decoded.isEventer ||  user.isAdmin !== decoded.isAdmin)) {
            throw new Error("Data inside the token doesn't match the data in the database");
        }
        return true;
    } catch (err) {
        throw err;
    }
}
router.get('/verifyAccess',async (req, res) => {
    const token = req.headers['authorization'];
    if(token){
        try{
            const verified = await verifyToken(token);
            res.status(HTTP_SUCCESS_REQUEST).send(verified);
        }
        catch (err) {
            res.status(HTTP_BAD_REQUEST).send(err);
        }
    }
    else{
        res.status(HTTP_BAD_REQUEST).send("no Token was sent");
    }
})



  export default router;