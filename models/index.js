const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

//define a user as having many posts; creating foreign key in the 'posts' table
User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

Posts.belongsTo(User, {
    foreignKey: 'user_id',
});

//define a user as having many comments; creating foreign key in 'comments' table
User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
});


//define a post as having many comments; creating foreign key in 'comments' table
Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(Posts, {
    foreignKey: 'post_id',
});

module.exports = { User, Posts, Comments };


