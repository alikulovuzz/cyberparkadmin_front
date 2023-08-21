const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config()

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    MONGODB_TEST_DATABASE,
    NODE_ENV
  } = process.env;
console.log("DB_HOST")
console.log(DB_HOST)

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});