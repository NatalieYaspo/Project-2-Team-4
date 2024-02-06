const router = require('express').Router();
const { Post, User, Image } = require('../models'); 
const withAuth = require('../utils/auth');


//Go to homepage and pulls through all active posts
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true })); 

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts, 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//Pulls up one post by id
router.get('/posts/:id', withAuth, async (req, res) => { 
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });
    
    const imageData = await Image.findOne({
      where: {
        image_id: req.params.id
      }
    });

    console.log('console log 1')

    const post = postData.get({ plain: true }); 
    const image = imageData.get({ plain: true });
    console.log('console log 2');
    console.log(post);
    res.render('posts', { 
      ...post,
      url: image.url,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    // console.log(req.session);
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }], 
    });
    // console.log(userData);
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
