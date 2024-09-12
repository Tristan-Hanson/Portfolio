const router = require('express').Router();
const homepage = require('./homepage-routes');
const gallery = require('./gallery-routes');
const contact = require('./contact-routes');
const project = require('./project-routes');
const user = require('./user-routes');
const login = require('./login-route')

router.use('/', homepage);
router.use('/gallery', gallery);
router.use('/contact', contact);
router.use('/project', project);
router.use('/user', user)
router.use('/login', login)

module.exports = router;