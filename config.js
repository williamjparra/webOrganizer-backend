require("dotenv").config()

module.export = {
    database: {
        url: process.env.DB_URI
    },
    jwt: {
        secret: process.env.SECRET
    },
    server: {
        port: process.env.PORT
    }
}