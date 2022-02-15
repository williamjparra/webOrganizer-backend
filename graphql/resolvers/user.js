const userController = require('../../controllers/usersControllers')
const { generateToken, validateToken } = require('../../utils/jwtUtils')

module.exports = {
    Mutation: {
        async login(_, address, context) {
            console.log(address)
            if(!address) throw new Error('address is needed to login')

            try {
                const user = await userController.getUserByPublicAddress(address)
                return {...user}

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