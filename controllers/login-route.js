const router = require('express').Router()

router.get('/', async(req, res) =>{
    try{
        res.render('login')
    }catch(err){
        res.status(404).json({message: 'Error getting login page', err})
    }
})

module.exports = router;