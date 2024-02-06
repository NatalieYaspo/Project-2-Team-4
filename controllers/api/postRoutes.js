const router = require('express').Router();
const { Post, User, Image } = require('../../models');
const withAuth = require('../../utils/auth');
const { myconfig } = require('../../config/config');

//Pulls up one post by id
router.get('/posts/:id', withAuth, async (req, res) => { 
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User, Image,
          attributes: ['name', 'email', 'url'],
        },
      ],
    });

    const post = postData.get({ plain: true }); 

    res.render('posts', { 
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // const newImage = await Post.create({
    //   ...req.body,
    //   user_id: req.session.user_id,
    // });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }

  // try {
  //   const newImage = await Post.create({
  //     ...req.body,
  //     user_id: req.session.user_id,
  //   });

  //   res.status(200).json(newImage);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});

// UPDATE a post //NEED TO MAKE WORK
// router.put('/:id', withAuth, async (req, res) => {
//   try {
//     const updatedPostData = await Post.update(
//       {
//         ...req.body,
//         // title: req.body.title,
//         // content: req.body.content,
//       }, 
//       {
//       where: {
//         id: req.params.post_id,
//       },
//     });
//     if (!updatedPostData[0]) {
//       res.status(404).json({ message: 'No postwith this id!' });
//       return;
//     }
//     res.status(200).json(updatedPostData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  console.log('req params', req.params.id);
  try {
    const postData = await Post.destroy({
      where: {
        post_id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;