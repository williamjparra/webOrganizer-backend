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
                console.log("**** **** ****", userCreated)
                return userCreated
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
        }
    }
}