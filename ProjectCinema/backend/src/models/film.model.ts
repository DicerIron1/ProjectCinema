import {Schema, model} from 'mongoose';

export interface IFilm{
    _id:string;
    name:string;
    picture_ids: string[];
    actors_ids: string[];
    cinema_id: string;
    description: string;
    gender_id: string;
    language_id: string;
    sub_language_id: string;
    trailer_url:string;
    extra_information:string;
}

export const FilmSchema = new Schema<IFilm>({
    name:                   {type: String, required: true},
    picture_ids:            {type:[{id: String}], default : [] , required: true },
    actors_ids:             {type:[{id: String}], default : [] , required: false },
    cinema_id:              {type: String, required: true},
    description:            {type: String, required: true},
    gender_id:              {type: String, required: true},
    language_id:            {type: String, required: true},
    sub_language_id:        {type: String, required: false},
    trailer_url:            {type: String, required: false},
    extra_information:      {type: String, required: false},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const FilmModel = model<IFilm>('film', FilmSchema);