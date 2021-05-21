const {Schema, model} = require("mongoose");

const EsquemaPost = Schema({
    title: String,
    author: String,
    post_date: {
        type: Date,
        default: Date.now
    },
    post_data: String
});

module.exports = model('posts', EsquemaPost);