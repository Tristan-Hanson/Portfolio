const router = require('express').Router();
const Project = require('../models/project');
const multer = require('multer');
const {PutObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3');
const s3Project = require('../s3Project');
const crypto = require('crypto');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

upload.single('image')

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

router.get('/', async(req, res) =>{
    try{
        const allProjects = await Project.findAll({})
        res.status(200).json(allProjects)
    }catch(err){
        res.status(500).json({message: 'Error getting projects', err})
    }
});

router.post('/', upload.single('image'), async(req, res) =>{
    const file = req.file;
    const {origionalName, buffer, mimetype} = file;
    const {title, description} = req.body;

    const imageName = randomImageName();

    const params ={
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
        Body: buffer,
        ContentType: mimetype,
    };

    try{
        const command = new PutObjectCommand(params)
        await s3Project.send(command)
        const fileUrl = `https://${params.Bucket}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${params.Key}`;

        const newProject = await Project.create({
            title: title,
            description: description,
            image: fileUrl
        });

        res.status(200).json(newProject);
    }catch(err){
        console.error(err)
        res.status(500).json({message: 'error creating project', err})
    }
})

router.delete('/:id', async(req,res) =>{
    try{
        let project = await Project.findByPk(req.params.id)

        if(!project){
            return res.status(400).json({ error: 'Project not found'})
        }

        await project.destroy()
        res.status(200).json({message: 'Project deleted successfully'})
    }catch(err){
        res.status(500).json({message: "error deleting project", err})
    }
})

router.put('/:id', async(req, res) =>{
    try{
        let {title, description} = req.body;
        let project = await Project.findByPk(req.params.id)

        if(!project){
            res.status(404).json({ message:'Project Not found', error})
        }

        project.title = title || project.title;
        project.description = description || project.description
        
        await project.save()
        res.status(200).json({ message: 'Project updated successfully', project})
    }catch(err){
        res.status(500).json({ message: 'Error Updating Project', err})
    }
})

module.exports = router;