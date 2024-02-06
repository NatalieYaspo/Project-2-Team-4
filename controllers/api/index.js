const router = require('express').Router();
const userRoutes = require('./userRoutes'); 
const postRoutes = require('./postRoutes'); 
const signuploadformRoutes = require('./signuploadformRoutes'); 
const imageRoutes = require('./imageRoutes'); 

router.use('/images', imageRoutes);
router.use('/users', userRoutes); 
router.use('/posts', postRoutes); 
router.use('/signuploadform', signuploadformRoutes); 


module.exports = router;