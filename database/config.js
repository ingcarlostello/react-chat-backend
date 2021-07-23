const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        // connect to DB this is a asynchronous method(a promise)
        await mongoose.connect(process.env.DB_STRING_CONNECTION, {
            // values to avoid a few warinings
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Could not connect to the DB ');
    }
};

module.exports={
    dbConnection
}