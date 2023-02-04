import { environment } from "src/environments/environment";

const BASE_URL = environment.production? '' : 'http://localhost:5000';


export const USER_URL = BASE_URL + '/api/users';
export const USER_Create_URL = BASE_URL + '/api/users/add';
export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const Projekt_URL = BASE_URL + '/api/projects';
export const Project_Create_URL = Projekt_URL + '/create' ;
export const Project_Delete_URL = Projekt_URL + '/delete' ;
export const Project_Download_URL = Projekt_URL + '/download';
export const Project_Stage_URL = Projekt_URL + '/stage';


export const Documents_URL = BASE_URL + '/api/documents';
export const Documents_UPLOAD_URL = Documents_URL + '/upload';
export const Documents_DOWNLOAD_URL = Documents_URL + '/download';
export const Documents_DELETE_URL = Documents_URL + '/delete';
