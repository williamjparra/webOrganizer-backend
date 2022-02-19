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
                console.log(user)
                return {...user}

            } catch (e) {
                throw new Error(e)
            }
        },
        async createUser(_, user, {req, res}) {
            console.log(user)
            try {
                const userCreated = await userController.createUser(user)
                return userCreated
            } catch (e) {
                throw new Error(e)
            }
        } 
    },
    Query: {
        async getUsers() {
            try {
                return await userController.getAllUsers()
            } catch(e) {
                throw new Error(e)
            }
        }
    }
}