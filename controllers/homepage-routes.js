const express = require('express');
const router = express.Router();

router.get('/', async(req, res) =>{
    try{
    res.render('homepage', {
        session: req.session,
        user: req.session.user
    })
    }catch(err){
        res.status(500).json({message: 'Unable to get homepage'})
    }
})

module.exports = router;