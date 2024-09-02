const express = require('express');
const router = express.Router();
const Project = require('../models/project')

router.get('/', async(req, res) =>{
    try{
        const allProjects = await Project.findAll({});
        const projects = allProjects.map((project) =>
            project.get({plain: true})
        )

        if(!projects){
            return res.status(404).json({ error: 'Projects not found'})
        }

        res.render('gallery', {
            project: projects
        })
    }catch(err){
        res.status(500).json({message: 'Unable to get gallery'})
    }
})

module.exports = router;