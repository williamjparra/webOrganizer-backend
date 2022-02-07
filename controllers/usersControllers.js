const UsersModel = require('../models/Users')
const moment = require('moment')

class UsersControllers {
    limit = 10

    async getAllUsers() {
        try {
            const users = await UsersModel.find()
            return users
        } catch (e) {
            throw new Error("there was an error getting all users", e)
        }
    }

    async getUserById(id) {
        try {
            const user = await UsersModel.findById(id).populate('Post')
            return user
        } catch(e) {
            throw new Error("there was an error getting the user", e)
        }
    }

    async getUserByUsername(search) {
        try {
            const user = await UsersModel.find({userName: search})
            return user
        } catch(e) {
            throw new Error("there was an error getting the user", e)
        }
    }

    async searchUser(search) {
        try {

            const users = await UsersModel.find({$or: [
                {userName: {$regex: `.*${search}.*`}},
                {name: {$regex: `.*${search}.*`}},
                {lastName: {$regex: `.*${search}.*`}}
                ],
                $and: {
                    status: true
                }
            }).limit(this.limit)

            return users
        } catch(e) {
            throw new Error("there was an error getting the user", e)
        }
    }

    async createUser(data) {
        try {
            const defaultData = {
                email: "",
                name: "",
                lastName: "",
                userName: "",
                publicAddress: "",
                createdAt: moment().format(),
                updatedAt: moment().format(),
                status: true,
                posts: []
            }
            const userData = {
                ...defaultData,
                ...data
            }
            const user = new UsersModel({
                ...userData
            })
            const createdUser = await user.save()
            console.log("*** user ***", user)
            return user

        } catch (e) {
            throw new Error("there was an error creating User", e)
        }
    }

    async updateUser({id, data}) {
        try {
            
            const updatedData = await UsersModel.findOneAndUpdate(
                {_id: id},
                {$set: {...data}}
            )
            console.log(updatedData)
            return(updatedData)
        } catch (e) {
            throw new Error("there was an error updating User", e)
        }
    }

    async deleteUser(id) {
        try {
            const deletedUser = await UsersModel.deleteOne({_id: id})
            return deletedUser
        } catch (e) {
            throw new Error("there was an error deleting User", e)
        }
    }

}

const usersControllers = new UsersControllers()
module.export = usersControllers