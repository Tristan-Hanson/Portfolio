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

router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const foundUser = await User.findOne({ where: { name } });

        if (!foundUser) {
            return res.status(400).alert({ message: "Incorrect username" });
        }

        const isValid = await bcrypt.compare(password, foundUser.password);

        if (!isValid) {
            return res.status(400).alert({ message: "Wrong password" });
        }

        req.session.save(() =>{
            req.session.user = foundUser;
            req.session.isLoggedIn = true;
            res.redirect('/')
        })

        // Manually save session before rendering
        /*
        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Error saving session", error: err });
            }
            res.render('profile', {
                session: req.session,
                user: req.session.user
            });
        });
        */
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error logging in", error: err });
    }
});


router.post('/logout', (req, res) =>{
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).send('Failed to log out');
        }
        res.render('homepage');
      });
})

module.exports = router;