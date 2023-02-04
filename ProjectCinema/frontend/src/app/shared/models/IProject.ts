import {IFile} from "./IFile";

export class IProject {
  name:string;
  user_ids:string[];
  files?:IFile[];
  history?: IHistory[];
  description?: string;
}

export class IHistory{
  name: string;
  stagerName: string;
  time: string;
}
