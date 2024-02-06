const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure your cloud name, API key and API secret:

const myconfig = cloudinary.config({
  cloud_name: 'dzxgarj3z',
  api_key: '272446444283491',
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true
});

exports.myconfig = myconfig;