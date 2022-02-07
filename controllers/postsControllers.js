const PostsModel = require('../models/Post')

class PostControllers {

    async getUserPosts(id) {
        try {
            const posts = await PostsModel.find({ownerId: id})
            return posts
        } catch (e) {
            throw new error("there was an error finding posts of user " + id, e)
        }
    }

    async getPostById(id) {
        try {
            const post = await PostsModel.findById(id)
            return post 
        } catch (e) {
            throw new error("there was and erro finding the post with id: " + id, e)
        }
    }

    async getPostBySlug(slug) {
        try {
            const post = await PostsModel.find({slug: slug})
            return post
        } catch (e) {
            throw new error("", e)
        }
    }

    async searchPost(search) {
        try {

            const posts = await UserModel.find({ $or: [
                { title: { $regex: `.*${search}.*` } },
                { slug: { $regex: `.*${search}.*` } },
                { data: { content: { $regex: `.*${search}.*` } } },
            ]})
            return posts
        } catch (e) {
            throw new error("", e)
        }
    }

    async createPost(data) {
        try {
            const post = new UserModel({
                ...data
            })
            const createdPost = await post.save()
            return createdPost

        } catch (e) {
            throw new error("", e)
        }
    }

    async updatePost({id , data}) {
        try {

            const updatedData = await PostsModel.findOneAndUpdate(
                {_id: id}, 
                {$set: {...data}}
            )
            console.log("*** post updated ***", updatedData)
            return updatedData

        } catch (e) {
            throw new error("", e)
        }
    }

    async deletePost(id) {
        try {
            const deletePost = await PostsModel.deleteOne({_id: id})
            return deletePost
        } catch (e) {
            throw new error("", e)
        }
    }
}

const postController = new PostControllers()
module.export = postController
