const sequelize = require('../config/connection.js');
const { User, Posts, Comments } = require('../models');

const userSeedData = require('./userSeedData.json');
const postsSeedData = require('./postsSeedData.json');
const commentsSeedData = require('./commentsSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    //add user seed data to database; use hook to encrypt password
    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
    });

    //add post seed data to database; for each record assign a random user
    for (const post of postsSeedData) {
        const newPost = await Posts.create({
            ...post,
            //attach random user_id to each post
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    const allPosts = await Posts.findAll();

    //add comment seed data to database; for each record asign a random user and a random post
    for (const comment of commentsSeedData) {
        const newComment = await Comments.create({
            ...comment,
            //attach random user_id to each comment
            user_id: users[Math.floor(Math.random() * users.length)].id,
            //attach random post_id  to each comment
            post_id: allPosts[Math.floor(Math.random() * allPosts.length)].id
        });
    }

    process.exit(0);
};

seedDatabase();