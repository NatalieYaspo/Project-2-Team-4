const sequelize = require('../config/connection');
const { User, BlogPost } = require('../models'); //CHANGE TO NAMES OF MODELS

const userData = require('./userData.json');//CHANGE TO NAMES OF MODELS
const blogData = require('./blogPosts.json');//CHANGE TO NAMES OF MODELS

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await BlogPost.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();