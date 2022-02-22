const { Schema, model } = require('mongoose')
const Posts = require('./Post')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    publicAddress: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: Posts
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    profileImg: String
})

module.exports = model('Users', UserSchema)