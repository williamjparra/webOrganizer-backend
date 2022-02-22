const { Schema, model } = require('mongoose');
const Posts = require('./Post')

const FolderSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    title: { type: String, required: true, unique: true },
    description: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: Posts
    }]
})

module.exports = model('Folders', FolderSchema)