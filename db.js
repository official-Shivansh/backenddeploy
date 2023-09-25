const mongoose = require("mongoose");
require("dotenv").config()
const connection = mongoose.connect(`mongodb+srv://shivansh:soni@cluster0.kewn6jo.mongodb.net/fullstackmock1?retryWrites=true&w=majority`)

module.exports = {
    connection
}