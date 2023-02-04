/*import {Router} from 'express';
import asyncHandler from "express-async-handler";
import {HTTP_BAD_REQUEST} from "../constants/http_status";

import path from "path";
import {UserModel} from "../models/user.model";

import {IHistory, IProjekt, ProjektModel} from "../models/projekt.model";

const router = Router();
const fs = require('fs')
const archiver = require('archiver');

export enum ShareType {
    user = 0,
    group = 1,
    publicLink = 3,
    email = 4,
}

router.get('/', asyncHandler( async (req, res) => {
        const projects = await ProjektModel.find();
        res.status(200).json({ projects });
    }
))
router.get('/user/:userId', asyncHandler( async (req, res) => {
        const projects = await ProjektModel.find();
        let projectUserId : IProjekt[] = [];
        for( let i =0; i <projects.length ; i++){
            if (projects[i].user_ids.includes(req.params.userId)){
                projectUserId.push(projects[i])
            }
        }
    res.status(200).json({ projectUserId });
    }
))
router.get('/:name/',asyncHandler(
    async (req, res) => {
        const project = await ProjektModel.findOne({name : req.params.name });
        if(project){
            res.send(project);
        }
        else {
            res.send(HTTP_BAD_REQUEST);
        }
    })
)
router.delete('/delete/:name', asyncHandler( async (req, res) => {
        const project =  await ProjektModel.findOne({name : req.params.name });
        if(project && project.files){
            project.files.forEach(e =>{
                const filepath = path.join(__dirname,'../projectFiles/'+req.params.name) +'/'+ e.imagePath.substring(e.imagePath.lastIndexOf("/"),e.imagePath.length);
                fs.unlink(filepath, (err:Error) => {
                    if (err) {
                        console.error(err);
                    }
                })
            })
        }
        if(project && project.history){
            project.history.forEach(e =>{
                const filepath = path.join(__dirname, '../projectHistory/') + e.name.replace(/:/g, '-') + ".zip" ;
                console.log(filepath)
                fs.unlink(filepath, (err:Error) => {
                    if (err) {
                        console.error(err);
                    }
                })
            })
        }
        const client = new Client();
        const folder: Folder|null = await client.getFolder(req.params.name);
        if (folder){
            await client.deleteUserGroup(req.params.name);
            await folder.delete();
        }
        const deletedProjects = await ProjektModel.deleteOne({name:req.params.name});

        res.send(deletedProjects);
    }
))
router.post('/create', asyncHandler(async (req, res) => {
    const {name, user_ids} = req.body;
    const admin = await UserModel.findById(user_ids[0])
    const oldProject = await ProjektModel.findOne({name});
    if (oldProject){
        res.status(HTTP_BAD_REQUEST).send("File with the same name already exists");
    }
    else {
        const client = new Client();
        const projektFolder: Folder = await client.createFolder(name);
        const inputFolder: Folder = await client.createFolder(name+"/Input");
        const workDirfolder: Folder = await client.createFolder(name+"/WorkDir");
        const group: UserGroup = await  client.createUserGroup(name);
        await client.addUserToMemberUserGroup(admin!.name, name);
        // @ts-ignore
        const createShare: ICreateShare = { fileSystemElement: projektFolder, shareType: ShareType.group ,shareWith:group, permissions: SharePermission.all};
        console.log(createShare);
        const share: Share = await client.createShare(createShare);

        const newProject : IProjekt = {
            name,
            user_ids,
        };
        const dbProject = await ProjektModel.create(newProject);
        res.send(dbProject)
    }
}));
router.put('/stage/:projectName',  asyncHandler(
    async (req, res) => {
    // leave this Part in Case Download is here again
        const client = new Client();
    const sourceFolder: Folder | null = await client.getFolder(req.params.projectName + "/WorkDir" );
    console.log(await client.getFiles(req.params.projectName + "/WorkDir"));
    console.log(sourceFolder)
    const options: DownloadFolderCommandOptions =
        {
            sourceFolder: sourceFolder!,
            getTargetFileNameBeforeDownload:
                (fileNames: SourceTargetFileNames): string => { return "./stages/" + fileNames.targetFileName }
        };
    const command: DownloadFolderCommand = new DownloadFolderCommand(client, options);
    await command.execute();
    const uploadResult: CommandResultMetaData = command.getResultMetaData();
        while (command.isFinished() !== true) {
            console.log(command.getPercentCompleted() + " %");
            // wait a second
            await (async () => { return new Promise(resolve => setTimeout(resolve, 1000)) })();
        }
     if (command.getStatus() === CommandStatus.success) {
        console.log(uploadResult.messages);
        console.log(command.getBytesDownloaded());
    } else {
        console.log(uploadResult.errors);
    }
         // THe right solution
        const { name } = req.body;
        const date_ob = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '');
        const zipName = req.params.projectName + "-" + date_ob.replace(/:/g, '-') + '.zip'
        const output = fs.createWriteStream(path.join(__dirname, '../projectHistory/') + zipName );
        const project = await ProjektModel.findOne({name: req.params.projectName});

        if (project && project.history){
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });
        output.on('close', function() {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });
        archive.pipe(output);
        archive.directory(path.join(__dirname, '../projectFiles/' + req.params.projectName + '/'), "Input");
        archive.finalize();


        const newStage :IHistory = {
            name: req.params.projectName + '-' + date_ob.replace(/:/g, '-'),
            stagerName : name,
            time: date_ob,
        }
            const history = [ ...project.history];
            history.push(newStage);
            const updatedFile = await ProjektModel.updateOne({name:req.params.projectName}, { $set: {history: history}})
            if(updatedFile.modifiedCount === 1){
                res.send(history);
            }
        }
        else{
            res.status(HTTP_BAD_REQUEST).send("Project cannot be updated");
        }


    })
);

router.delete('/stage/:name/delete/:stageName', asyncHandler( async (req, res) => {
        const project =  await ProjektModel.findOne({name : req.params.name });
        if(project && project.history){
            project.history.forEach(e =>{
                const stagePath = path.join(__dirname, '../projectHistory/') + req.params.stageName + '.zip';
                fs.unlink(stagePath, (err:Error) => {
                    if (err) {
                        console.error(err);
                    }
                })
            })
            await ProjektModel.updateOne({name:req.params.name}, {$pull: {history:{ name:req.params.stageName}}});
            const newProject =await ProjektModel.findOne({name : req.params.name });
            if(newProject && newProject.history){
                res.send(newProject.history);
            }
        }else{
            res.send(HTTP_BAD_REQUEST).send('Error while deleting stage')
        }

    }
))

router.get('/stage/:stageName/download', function(req,res,next){
    const filepath = path.join(__dirname,'../projectHistory') +'/'+ req.params.stageName + ".zip" ;

    /*res.set('Content-Type','application/octet-stream');
    res.set('Content-Disposition',`attachment; filename=${file_after_download}`);
    res.set('Content-Length',data.length);
    res.send(data);*/
  /*  res.sendFile(filepath);
});



export default router;*/