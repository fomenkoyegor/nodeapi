const mongoose = require('mongoose');
const config = require('../../config');
const { MONGOURL } = config;


const mongoDB = mongoose.connect(
    MONGOURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}
);
mongoDB.then(() => {
    console.log('connected mongo');
}).catch((err) => {
    console.log('err', err);
});


module.exports = mongoDB;