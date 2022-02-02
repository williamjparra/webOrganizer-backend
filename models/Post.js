const { Schema, model } = require('mongoose');

const DescriptionSchema = new Schema({
    rawHtml: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, required: true },
})

const PostSctructureSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    description: [
        {
            type: DescriptionSchema,
            required: true
        }
    ]
})

const PostSchema = new Schema({
    public: {
        type: Boolean,
        required: true,
        default: true
    },
    coverImg: String,
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    data: {
        type: PostSctructureSchema,
    }
})

module.exports = model('Posts', PostSchema)