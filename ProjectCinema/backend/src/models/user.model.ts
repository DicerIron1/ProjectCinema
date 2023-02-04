import {Schema, model} from 'mongoose';

export interface IUser{
    id:string;
    email:string;
    password: string;
    name:string;
    isAdmin:boolean;
}

export const UserSchema = new Schema<IUser>({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default:false},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const UserModel = model<IUser>('user', UserSchema);