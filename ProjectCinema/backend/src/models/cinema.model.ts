import {Schema, model} from 'mongoose';

export interface ICinema{
    _id:string;
    name:string;
    description:string ;
    location:string;
    picture_ids: string[];
    responsible_ids: string[];
    film_ids: string[];
    city_id: string;
    email:string;
    number:string;
    facebook_page:string;

}

export const CinemaSchema = new Schema<ICinema>({
    name:                   {type: String, required: true, unique: true},
    description:            {type: String, required: true},
    location:               {type: String, required: true},
    picture_ids:            { type:[{id: String}], default : [] , required: true },
    responsible_ids:        { type:[{id: String}], default : [] , required: true },
    film_ids:               { type:[{id: String}], default : [] , required: false },
    city_id:                {type: String, required: true},
    email:                  {type: String, required: false},
    number:                 {type: String, required: false},
    facebook_page:          {type: String, required: false},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const CinemaModel = model<ICinema>('cinema', CinemaSchema);