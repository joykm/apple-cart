// Set Node.js to Developer Environment
process.env.NODE_ENV = 'development';

// Set necessary credentials
const HEROKU_DATABASE_CREDENTIALS = 'mysql://ba1daa5faf2c8b:3357f20d@us-cdbr-east-02.cleardb.com/heroku_88e32aa4439844b?reconnect=true‘&multipleStatements=true’';

const LOCAL_DATABASE_CREDENTIALS = {
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'ba1daa5faf2c8b', // put your DB username here
    password: '3357f20', // put your DB password here
    database: 'heroku_88e32aa4439844b', // put your DB name here
    multipleStatements: true,
};

module.exports = {
    LOCAL_DATABASE_CREDENTIALS : LOCAL_DATABASE_CREDENTIALS,
};