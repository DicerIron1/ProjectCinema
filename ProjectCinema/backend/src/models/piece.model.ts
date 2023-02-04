import {Schema, model} from 'mongoose';

export interface IPiece{
    _id:string;
    name:string;
    picture_ids: string[];
    actors_ids: string[];
    theatre_id: string;
    description: string;
    gender_id: string;
    language_id: string;
    trailer_url:string;
    extra_information:string;
}

export const PieceSchema = new Schema<IPiece>({
    name:                   {type: String, required: true},
    picture_ids:            {type:[{id: String}], default : [] , required: true },
    actors_ids:             {type:[{id: String}], default : [] , required: false },
    theatre_id:              {type: String, required: true},
    description:            {type: String, required: true},
    gender_id:              {type: String, required: true},
    language_id:            {type: String, required: true},
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

export const PieceModel = model<IPiece>('piece', PieceSchema);