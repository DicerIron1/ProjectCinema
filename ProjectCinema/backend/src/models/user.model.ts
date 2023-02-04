import {Schema, model} from 'mongoose';

export interface IUser{
    _id:string;
    name:string;
    password: string;
    isAdmin:boolean;
    isEventer: boolean;
    city_id: string;
}

export const UserSchema = new Schema<IUser>({
    name:                   {type: String, required: true, unique: true},
    password:               {type: String, required: true},
    isAdmin:                {type: Boolean, required: true, default:false},
    isEventer:              {type: Boolean, required: true, default:false },
    city_id:                {type: String, required: true},
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