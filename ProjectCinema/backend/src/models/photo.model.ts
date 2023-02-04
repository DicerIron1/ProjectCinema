import {Schema, model} from 'mongoose';

export interface IPhoto{
    _id:string;
    name:string;
    path: string;
}

export const PhotoSchema = new Schema<IPhoto>({
    name:                   {type: String, required: true},
    path:                   {type: String, required: true,  unique: true},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const PhotoModel = model<IPhoto>('photo', PhotoSchema);