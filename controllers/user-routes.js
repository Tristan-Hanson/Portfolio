const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')

router.get('/', async(req, res) =>{
    try{
        const allUsers = await User.findAll({})
        if (!allUsers){
            res.status(404).json({message: "no users found"})
        }

        res.status(200).json(allUsers)
    }catch(err){
        res.status(500).json({message: 'Error getting users', err})
    }
})

router.post('/', async(req, res) =>{
    try{
        const {name, password} = req.body

        if(!name || !password){
            res.status(400).json({error: 'Missing required fields'})
        }

        const hash = await bcrypt.hash(password, 13)
        const newUser = await User.create({name: name, password: hash})
        res.status(200).json({Message: 'Successfully created user', newUser}) 
    }catch(err){
        res.status(500).json({message: 'Error creating user', err})
    }
})

router.delete('/:id', async(req,res) =>{
    try{
        let deletedUser = await User.findByPk(req.params.id)

        if(!deletedUser){
            res.status(404).json({error: 'No user data found'})
        }

        await deletedUser.destroy()
        res.status(200).json({ message: `User has been deleted`})
    }catch(err){
        res.status(500).json({message:'Error creating user', err})
    }
})

module.exports = router;