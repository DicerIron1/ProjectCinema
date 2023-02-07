import {Schema, model} from 'mongoose';

export interface IActor{
    id:string;
    name:string;
    description:string ;
    picture_ids: string[];
    film_ids: string[];

}

export const ActorSchema = new Schema<IActor>({
    name:                   {type: String, required: true, unique: true},
    description:            {type: String, required: true},
    picture_ids:            { type:[{id: String}], default : [] , required: true },
    film_ids:               { type:[{id: String}], default : [] , required: false },
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const ActorModel = model<IActor>('actor', ActorSchema);