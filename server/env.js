const { SECRET, MONGO_URI } = process.env;
module.exports = {
    jwtSecret: SECRET,
    mongoUri: MONGO_URI
}