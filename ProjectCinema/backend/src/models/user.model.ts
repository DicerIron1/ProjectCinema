import {Schema, model} from 'mongoose';

export interface IUser{
    _id?:string;
    name:string;
    password: string;
    isEventer: boolean;
    city_id?: string;
    isAdmin?:boolean;
    verified?:boolean;
}

export const UserSchema = new Schema<IUser>({
    name:                   {type: String, required: true, unique: true},
    password:               {type: String, required: true},
    isEventer:              {type: Boolean, required: true, default:false },
    isAdmin:                {type: Boolean, required: false, default:false},
    verified:               {type: Boolean, required: false, default:false },
    city_id:                {type: String, required: false},
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