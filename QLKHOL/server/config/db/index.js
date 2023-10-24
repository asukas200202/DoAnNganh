const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://bjnbjn:bjnbjn123@cluster0.qwndr34.mongodb.net/KHOL',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("connect successfully")
    } catch(error) {
        console.log("connect failer", error)
    }
}

module.exports = {connect};