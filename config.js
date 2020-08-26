// Set Node.js to Developer Environment
process.env.NODE_ENV = 'development';


// Set necessary credentials
const HEROKU_DATABASE_CREDENTIALS = 'mysql://bc25d43d478ccf:7ad084d9@us-cdbr-east-02.cleardb.com/heroku_a083118dc17be74?reconnect=true';

const LOCAL_DATABASE_CREDENTIALS = {
    host: 'localhost',
    user: 'myusername', // put your DB username here
    password: 'mypassword', // put your DB password here
    database: 'CS361_grocery', // put your DB name here
    multipleStatements: true,
};

module.exports = {
    LOCAL_DATABASE_CREDENTIALS : LOCAL_DATABASE_CREDENTIALS,
};