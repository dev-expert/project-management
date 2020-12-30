const { SECRET, DATABASE_URI } = process.env;
module.exports = {
    jwtSecret: SECRET,
    mysqlUri: DATABASE_URI
}