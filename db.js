const mongoose = require("mongoose");
require("dotenv").config()
const connection = mongoose.connect(`mongodb+srv://shivansh:soni@cluster0.2sdbctt.mongodb.net/fullstack5?retryWrites=true&w=majority`)

module.exports = {
    connection
}