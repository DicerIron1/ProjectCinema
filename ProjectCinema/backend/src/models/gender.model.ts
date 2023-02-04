import {Schema, model} from 'mongoose';

export interface IGender{
    _id:string;
    name:string;
}

export const GenderSchema = new Schema<IGender>({
    name:                   {type: String, required: true, unique: true},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const GenderModel = model<IGender>('gender', GenderSchema);