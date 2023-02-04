import {Schema, model} from 'mongoose';

export interface IEvent{
    _id:string;
    name:string;
    location:string;
    picture_ids: string[];
    description: string;
    city_id: string;
    trailer_url:string;
    extra_information:string;
}

export const EventSchema = new Schema<IEvent>({
    name:                   {type: String, required: true},
    picture_ids:            {type:[{id: String}], default : [] , required: true },
    location:               {type: String, required: true},
    city_id:                {type: String, required: true},
    description:            {type: String, required: true},
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

export const EventModel = model<IEvent>('event', EventSchema);