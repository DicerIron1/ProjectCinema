/*import asyncHandler from "express-async-handler";
import {IFile,FileModel} from "../models/file.model";
import {HTTP_BAD_REQUEST} from "../constants/http_status";
import router from "./user.router";
import {ProjektModel} from "../models/projekt.model";
import fs from "fs";
const storage = require('../middleware/storage');
const path = require('path');

router.put("/:name/upload",storage, asyncHandler(
    async (req:any, res) => {
        const client = new Client();
        const { name, user_id } = req.body;
        const imagePath = 'http://localhost:8100/src/projectFiles/' + req.file.filename;
        const filepath = path.join(__dirname, '../projectFiles') + '/' + req.params.name + '/' + imagePath.substring(imagePath.lastIndexOf("/"), imagePath.length);
        var buffer = fs.readFileSync(filepath);
        const creatFile = await client.createFile('/' +req.file.filename,  buffer);
        console.log(creatFile);
        await creatFile.move('/'+ req.params.name + "/Input/" + req.file.filename);
        /* Leave this part in case Upload is to be used
        / get folder
        const folder: Folder = await client.getFolder('/'+ req.params.name);
        console.log(folder)
        // get subfolders
        const subfolders: Folder[] = await folder.getSubFolders();
        console.log(subfolders)
        if (folder){
            var buffer = fs.readFileSync(filepath);
            console.log(buffer)

            const file:File = await client.createFile(req.file.filename,  buffer);
            await file.move('/'+ req.params.name + "/" + req.file.filename);
            if(file)
                console.log(file)
        }
        //await uc.execute();
        /*if (uc.getStatus() === CommandStatus.success) {
           console.log(uploadResult.messages);
           console.log(uc.getBytesUploaded());
       } else {
           console.log(uploadResult.errors);
       }
       uc.execute();

        // check the processing status as long as the command is running
        while (uc.isFinished() !== true) {
            // wait one second
            await (async () => { return new Promise(resolve => setTimeout(resolve, 1000)) })();
            console.log(uc.getPercentCompleted() + "%");
        }
        const uploadResult: CommandResultMetaData = uc.getResultMetaData();

        if (uc.getStatus() === CommandStatus.success) {
            console.log(uploadResult.messages);
            console.log(uc.getBytesUploaded());
        } else {
            console.log(uploadResult.errors);
        }*/
/*        const file: IFile = {
            name,
            user_id,
            imagePath,
        };
        const project = await ProjektModel.findOne({name : req.params.name });
        if (project && project.files){
                const files = [ ...project.files];
                files.push(file);
                const updatedFile = await ProjektModel.updateOne({name:req.params.name}, { $set: {files: files}})
                if(updatedFile.modifiedCount === 1){
                    res.send(file);
                }
        }
        else{
            res.status(HTTP_BAD_REQUEST).send("Project cannot be updated");
        }
    }
))
router.delete('/:name/delete/:imageName', asyncHandler(
    async (req, res) => {
        const project =  await ProjektModel.findOne({name : req.params.name });
        if(project && project.files){
            let fileType:string = "";
            // const files = [ ...project.files];
            project.files.forEach((e,index,arr) =>{
                if(e.name === req.params.imageName) {
                    const filepath = path.join(__dirname, '../projectFiles/' + req.params.name) + '/' + e.imagePath.substring(e.imagePath.lastIndexOf("/"), e.imagePath.length);
                    fs.unlink(filepath, (err: any) => {
                        if (err) {
                            console.error(err);
                        }
                    })
                }
                if(e.name === req.params.imageName){
                    fileType = e.imagePath.substring(e.imagePath.lastIndexOf("."),e.imagePath.length);
                    arr.length = index + 1;
                }
            })
            const client = new Client();
            const file = await client.getFile("/"+ req.params.name +"/Input/" + req.params.imageName + fileType);
            if(file){
                await file.delete();
            }
            await ProjektModel.updateOne({name:req.params.name}, {$pull: {files:{ name:req.params.imageName}}});
        }
        const newProject =  await ProjektModel.findOne({name : req.params.name });
        res.send(newProject);
    }
))

router.get('/', asyncHandler( async (req, res) => {
    const files = await FileModel.find();
    res.status(200).json({ files });
    }
))
router.post('/download', function(req,res,next){
    const filepath = path.join(__dirname,'../projectFiles') +'/'+ req.body.filename + req.body.filetype ;
    res.sendFile(filepath);
});


export default router;*/