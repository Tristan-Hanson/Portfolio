const router = require('express').Router();
const homepage = require('./homepage-routes');
const gallery = require('./gallery-routes');
const contact = require('./contact-routes');
const project = require('./project-routes');

router.use('/', homepage);
router.use('/gallery', gallery);
router.use('/contact', contact);
router.use('/project', project)

module.exports = router;