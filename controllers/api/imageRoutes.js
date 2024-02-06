const router = require('express').Router();
const { myconfig } = require('../../config/config');
const { Post, User, Image } = require('../../models');
const withAuth = require('../../utils/auth');

//Pulls up one image by id //REWORK CODE!
router.get('/image/:id', withAuth, async (req, res) => { 
    try {
      const imageData = await Image.findByPk(req.params.id, {
        include: [
          {
            model: Post,
            attributes: ['title'],
          },
        ],
      });
  
      const image = imageData.get({ plain: true }); 
  
      res.render('image', { 
        ...image,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //Create a new img //REWORK CODE!
  router.post('/', withAuth, async (req, res) => {
    try {
      const newImage = await Image.create({
        `https://res.cloudinary.com/${myconfig.cloud_name}/image/upload/w_260,h_200,c_crop,g_north/${public_id}.jpg`,
      });
  
      res.status(200).json(newImage);
    } catch (err) {
      res.status(400).json(err);
    }
  });