/*import {Schema, model} from 'mongoose';

export interface IFile{
    name:string;
    imagePath:string;
    user_id: string;
}

export const FileSchema = new Schema<IFile>({
    name:       { type: String, required: true, unique: true},
    imagePath:  { type: String, required: true },
    user_id:    { type: String, required: true },
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});


export const FileModel = model<IFile>('file', FileSchema);*/