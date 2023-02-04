import {Schema, model} from 'mongoose';

export interface ICity{
    _id:string;
    name:string;
    picture_ids: string[];
    responsible_ids: string[];

}

export const CitySchema = new Schema<ICity>({
    name:                   {type: String, required: true, unique: true},
    picture_ids:            { type:[{id: String}], default : [] , required: true },
    responsible_ids:        { type:[{id: String}], default : [] , required: true },
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const CityModel = model<ICity>('city', CitySchema);