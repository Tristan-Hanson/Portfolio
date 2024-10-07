const router = require('express').Router()
const Project = require('../models/project')

/*router.get('/', async(req, res) =>{
    try{
        res.render('profile',{
            session: req.session,
            user: req.session.user
        })
    }catch(err){
        res.status(404).json({message: 'Error getting profile page', err})
    }
})
*/
router.get('/', async(req, res) =>{
    try{
        const allProjects = await Project.findAll({});
        const projects = allProjects.map((project) =>
            project.get({plain: true})
        )

        if(!projects){
            return res.status(404).json({ error: 'Projects not found'})
        }

        res.render('profile', {
            project: projects,
            session: req.session,
            user: req.session.user
        })
    }catch(err){
        res.status(500).json({message: 'Unable to get profile'})
    }
})


module.exports = router;