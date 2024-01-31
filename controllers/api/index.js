const router = require('express').Router();
const userRoutes = require('./userRoutes'); //CHANGE TO NAME OF ROUTES
const blogPostRoutes = require('./blogPostRoutes'); //CHANGE TO NAME OF ROUTES

router.use('/users', userRoutes); //CHANGE TO NAME OF ROUTES
router.use('/blogPosts', blogPostRoutes); //CHANGE TO NAME OF ROUTES

module.exports = router;