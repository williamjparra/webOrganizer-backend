const userController = require('../../controllers/usersControllers')
const { generateToken, validateToken } = require('../../utils/jwtUtils')

module.exports = {
    Mutation: {
        async login(_, {publicAddress}, context) {
            console.log(context)
            console.log(publicAddress)
            if(!publicAddress) throw new Error('address is needed to login')

            try {
                const user = await userController.getUserByPublicAddress(publicAddress)
                if(user) return {...user}
                throw new Error(`user with address: ${publicAddress} not found`)
            } catch (e) {
                throw new Error(e)
            }
        },
        async createUser(_, user, {req, res}) {
            console.log(user)
            try {
                const userCreated = await userController.createUser(user.input)
                return userCreated
            } catch (e) {
                throw new Error(e)
            }
        },
        async updateUserData(_, user, {req, res}) {
            console.log(user) 
            try {
                const updatedUser = await userController.updateUser({
                    id: user._id,
                    data: user.input
                })
                return { ...updatedUser._doc, ...user.input, id: updatedUser._doc._id }
            } catch (e) {
                throw new Error(e)
            }
        },
        async deleteUser(_, id, {req, res}) {
            console.log(id._id)
            try {
                const deleted = await userController.deleteUser(id._id)
                if(deleted.deletedCount < 1) {
                    return new Error(`can' delete user with id: ${id._id}`)
                }
                return {
                    id: id._id
                }
            } catch (e) {
                throw new Error(e)
            }
        }
    },
    Query: {
        async getUsers(_, data, context) {
            console.log(context.req.cookies)
            try {
                context.res.cookie("testCookie", "esto es el valor", {maxAge: 3500})
                return await userController.getAllUsers()
            } catch(e) {
                throw new Error(e)
            }
        },
        async getUserById(_, data, {req, res}) {
            console.log(data) 
            try {
                const user = await userController.getUserById(data._id)
                console.log(user)
                return user
            } catch (e) {
                throw new Error(e)
            }
        },
        async getUserByUserName(_, data, {req, res}) {
            try {
                const user = await userController.getUserByUsername(data.userName)
                return user
            } catch (e) {
                throw new Error(e)
            }
        },
        async searchUsers(_, data, {req, res}) {
            try {
                const users = await userController.searchUser(data.text)
                return users
            } catch (e) {
                throw new Error(e)
            }
        }
    }
}