const router = require('express').Router();
const { Post, User } = require('../models'); // Updated reference to "Post" model
const withAuth = require('../utils/auth');


//Go to homepage and pulls through all active posts
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({ // Updated reference to "Post" model
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true })); // Updated variable name

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts, // Updated variable name
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//Pulls up one post by id
router.get('/posts/:id', async (req, res) => { // Updated route path
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true }); // Updated variable name

    res.render('posts', { // Updated template name
      ...post,
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
      include: [{ model: Post }], // Updated reference to "Post" model
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
