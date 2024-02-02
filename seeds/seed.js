const sequelize = require('../config/connection');
const { User, Post } = require('../models'); // Names of the models

const userData = require('./userData.json'); // Corrected thename with user data
const postData = require('./postData.json'); // Corrected the name with post data

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData, { // Corrected from postData to Post
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();