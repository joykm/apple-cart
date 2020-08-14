// Set Node.js to Developer Environment
process.env.NODE_ENV = 'development'


// Set necessary credentials
const HEROKU_CREDENTIALS = "mysql://bc25d43d478ccf:7ad084d9@us-cdbr-east-02.cleardb.com/heroku_a083118dc17be74?reconnect=true"

//You could set your local DB credentials here as well. 
const LOCAL_DATABASE_CREDENTIALS = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'pass',
    database: 'project',
    multipleStatements: true

}


module.exports = {
    LOCAL_DATABASE_CREDENTIALS : LOCAL_DATABASE_CREDENTIALS
}