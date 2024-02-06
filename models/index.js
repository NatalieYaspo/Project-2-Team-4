const User = require('./User');
const Post = require('./Post');
const Image = require('./Image');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Image, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Image.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Image };
