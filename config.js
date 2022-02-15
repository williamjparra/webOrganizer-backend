require('dotenv').config()

module.export = {
    data: "data",
    database: {
        url: process.env.DB_URI
    },
    jwt: {
        secret: process.env.SECRET,
        exp: '1h'
    },
    server: {
        port: process.env.PORT
    }
}