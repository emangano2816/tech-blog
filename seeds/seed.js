const sequelize = require('../config/connection.js');
const { User, Posts, Comments } = require('../models');

const userSeedData = require('./userSeedData.json');
const postsSeedData = require('./postsSeedData.json');
const commentsSeedData = require('./commentsSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData);

    for (const post of postsSeedData) {
        const newPost = await Posts.create({
            ...post,
            //attach random user_id to each post
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    const allPosts = await Posts.findAll();

    for (const comment of commentsSeedData) {
        const newComment = await Comments.create({
            ...comment,
            //attach random user_id to each comment
            user_id: users[Math.floor(Math.random() * users.length)].id,
            //attach random post_id  to each comment
            post_id = allPosts[Math.floor(Math.random() * allPosts.length)].id
        });
    }

    process.exit(0);
};

seedDatabase();