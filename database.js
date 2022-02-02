const mongoose = require('mongoose');
const { database } = require('./config')

const main = async () => {
    try {
        await mongoose.connect(database.url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log("db connected")
    } catch (e) {
        console.log(e)
    }
}

module.exports = main;