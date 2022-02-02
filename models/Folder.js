const { Schema, model } = require('mongoose');

const FolderSchema = new Schema({
    title: { type: String, required: true },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }]
})

module.exports = model('Folders', FolderSchema)