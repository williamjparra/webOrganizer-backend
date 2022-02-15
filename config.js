require('dotenv').config()

module.exports = {
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