/*import {Schema, model} from 'mongoose';
import {IFile} from "./file.model";
import {IUser} from "./user.model";

export interface IProjekt{
    name: string;
    user_ids: any;
    files?: IFile[];
    history?: IHistory[];
}
export interface IHistory{
    name: string;
    stagerName: string;
    time: string;
}

export const ProjektSchema = new Schema<IProjekt>({
    name: { type: String, required: true, unique: true },
    user_ids: { type:Array, default : [] , required: true },
    files: { type: [{
                    name:       { type: String, required: true },
                    imagePath:  { type: String, required: true },
                    user_id:    { type: String, required: true },
            }], default : [] , required: false ,},
    history: { type: [{
            name:           { type: String, required: true },
            stagerName:     { type: String, required: true },
            time:           { type: String, required: true },
        }], default : [] , required: false ,},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});


export const ProjektModel = model<IProjekt>('project', ProjektSchema);*/