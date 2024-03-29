import {Schema, model} from 'mongoose';


export interface ISession{
    id:string;
    type: string ;
    occasion_id: string;
    description: string ;
    startingAt: Date;
    endingAt: Date;
    published: boolean;
}

const Type = ['film','theatre','event']
export const SessionSchema = new Schema<ISession>({
    type:                   {type: String, enum: Type, required: true},
    occasion_id:            {type: String, required: true},
    description:            {type: String, required: true},
    startingAt:             {type: Date,default: Date.now, required:true},
    endingAt:               {type: Date,default: Date.now, required:false},
    published:              {type: Boolean,default: false, required:false},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const SessionModel = model<ISession>('session', SessionSchema);